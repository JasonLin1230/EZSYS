<?php

/*
 * Author : zzk
 * Describe : 知识项.
 * Date : 2016/5/11
 */
namespace Kng\Controller;
use Think\Controller;
class KngController extends Controller {
		/*
		 * Author : ez
		 * Describe : 个人主页 -> 知识管理 -> 我的发布
		*/
		public function personal_kng_mine () {
			if (($id = check_login ()) < 0)
				$this -> redirect ('Login/index');
			$page = $_GET ['start'];
			if (! isset ($page))
				$page = 0;
			// else if ($page > 0)
			// 	$page;
			// dump ($page);
			$kng = M ('Kng');
			$count = $kng -> 
					where ("kng_owner_id = $id and not kng_flag&1") -> count ();
			$kng_list = $kng -> where ("kng_owner_id = $id and not kng_flag&1") -> 
				order ('kng_update_date desc') -> 
				limit ($page * 6, 6) -> 
				select ();
			$rtn ['record'] = $kng_list;
			$rtn ['total_cnt'] = $count;
			$this -> ajaxReturn ($rtn);
		}


		/*
		 * Author : ez
		 * Describe : 个人主页 -> 知识管理 -> 我的草稿
		*/
		public function personal_kng_script () {
			if (($usr_id = check_login ()) < 0)
				$this -> redirect ('Login/index');
			$page = $_GET ['start'];
			if (! isset ($page))
				$page = 0;

			$kng = M ('Kng');
			$count = $kng -> 
					where ("kng_owner_id = $usr_id and kng_flag&1") -> count ();
			/* kng_flag 记录此条目是否是草稿. */
			$kng_list = $kng -> where ("kng_owner_id=$usr_id and kng_flag&1") -> 
				order ('kng_update_date desc') -> 
				limit ($page * 6, 6) -> 
				select ();
			$rtn ['record'] = $kng_list;
			$rtn ['total_cnt'] = $count;
			$this -> ajaxReturn ($rtn);
		}

		

		/*
		 * Author : ez
		 * Describe : 添加知识项实体
		 */
		public function insert_kng () {
			if (($id = check_login ()) < 0)
				$this -> redirect ('Login/index');
			$sharing = $_POST['kng_sharing'];
			if ($sharing == 'true'){
				$share = 1;
			}else {
				$share = 0;
			}
			// if (isset($_GET['tag'])){
			// 	$data ['kng_cate_id'] = -1;
			// }
			/* 是否是草稿，用第一位标示, 1代表是，0代表不是 */
			$data ['kng_flag'] = isset ($_POST ['is_script']) ? 1 : 0;
			$data ['kng_name'] = $_POST ['kng_title'];
			$data ['kng_describe'] = $_POST ['kng_desc'];
			$data ['kng_share'] = $share;
			$data ['kng_owner_id'] = $id;
			$data ['kng_cate_id'] = $_POST['kng_cate'];
			$data ['kng_update_date'] = date("Y-m-d H:i:s");
			$kng = M ('Kng');

			$rtn = $new_id = $kng -> add ($data);
			if ($new_id > 0)
				$rtn = 1;
			else
				$rtn = -1;
			$this -> ajaxReturn ($rtn);
		}
		

		/*
		 * Author : ez
		 * Describe : 根据传入的kid删除知识项实体
		 */
		public function delete_kng () {
			$id = $_SESSION ['usr_id'];
			if (! isset ($id)) {
				$this -> redirec ('Login/index');
			}

			$kng_id = $_GET ['kid'];
			if ($kng_id == null) {
				$this -> ajaxReturn (-1);
			}

			$kng = M ('Kng');
			$result = $kng -> where ("kng_id=$kng_id") -> delete ();
			// Return the count of how many records were deleted.
			$this -> ajaxReturn ($result);
		}


		

		/*
		 * Author : ez
		 * Describe : 根据传入的kid获取知识项实体
		 */
		public function get_kng () {
			if (($usr_id = check_login ()) < 0)
				$this -> redirect ('Login/index');

			$kng_id = $_GET ['kid'];
			if ($kng_id == null) {
				return;
			}

			$data = M ('Kng') -> where ("kng_id=$kng_id and kng_owner_id=$usr_id")
				-> find ();
			$rtn ['title'] = $data['kng_name'];
			$rtn ['desc'] = $data['kng_describe'];
			$rtn ['share'] = $data['kng_share'];
			$this -> ajaxReturn ($rtn, 'json');
		}

		/*
		 * Author : ez
		 * Describe : 根据传入的kid绑定知识项数据到页面kngdisp
		 */
		public function show_kng () {
			if (($id = check_login ()) < 0) {
				$this -> redirect ('Login/index');
			}

			$kng_id = $_GET ['kid'];
			if ($kng_id == null) return;
			$data = M ('Kng') -> where ("kng_id=$kng_id and kng_owner_id=$id")
				-> find ();
			$this -> content = $data ['kng_describe'];
			$this -> display ('kngdisp');
		}

		/*
		 * Author : ez
		 * Describe : 点赞知识点
		 */
		public function like_kng () {
			$id = $_SESSION ['usr_id'];
			if (! isset ($id)) {
				$this -> redirect ('Login/index');
			}

			$kng_id = $_GET ['kid'];
			if (! isset ($kng_id)) return;

			$kng = M ('Kng'); 
			//  and kng_owner_id<>$id
			$res = $kng -> where ("kng_id=$kng_id")
				-> setInc ('kng_like', 1); 
			$this -> ajaxReturn ($res);
		}



        /*
         * Author : zzk
         * Describe : 发布草稿
         */
        public function push_draft(){
        	if (($id = check_login ()) < 0) {
				$this -> redirect ('Login/index');
			}

			$kng_id = $_GET ['kid'];
			if ($kng_id == null) return;
			$new_data['kng_flag'] = 0;  //将flag设为0：发布
			$new_data['kng_share'] = 0;  //将share设为0：不分享
			$new_data['kng_update_date'] = date("Y-m-d H:i:s");  //更改时间
			$result = M ('Kng') 
				-> where ("kng_id=$kng_id")
				-> save ($new_data);
			if($result==false){
				$rtn = 0;
			}else{
				$rtn = 1;
			}
			$this -> ajaxReturn($rtn); //发布知识  成功：1  失败：0
        }


        /*
         * Author : zzk
         * Describe : 分享知识
         */
        public function share_kng(){
        	if (($id = check_login ()) < 0) {
				$this -> redirect ('Login/index');
			}

			$kng_id = $_GET ['kid'];
			if ($kng_id == null) return;
			$new_data['kng_share'] = 1;  //将share 设为 1：分享
			$result = M ('Kng') 
				-> where ("kng_id=$kng_id")
				-> save ($new_data);
			if($result==false){
				$rtn = 0;
			}else{
				$rtn = 1;
			}
			$this -> ajaxReturn($rtn);//分享知识  成功：1  失败：0
        }
}
