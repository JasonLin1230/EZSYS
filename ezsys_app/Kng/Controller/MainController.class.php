<?php
/*
 * Author : ez
 * Date : 2016/5/23
 * Describe : Main Page Controller
 */

namespace Kng\Controller;
use Think\Controller;

class MainController extends Controller {

		/*
		 * Author : ez
		 * Describe : 母版页变量初始化
		*/
		private function personal () {
			$this -> usr_name = $_SESSION ['usr_name'];
			$this -> new_msg_num = new_message_count ();
		}

		/*
		 * Author : ez
		 * Describe : 主页
		 */
		public function main_page () {
			if (($id = check_login ()) < 0) {
				$this -> redirect ('Login/index');
			} else {
				$this -> personal ();
				// $page = $_GET ['start'];
				// Load first 4 item.
				$kng = M ('Kng');
				$data = $kng 
				-> table ('ezsys_kng kng,ezsys_usr usr,ezsys_cate cate')
				-> where ("kng.kng_share = 1 and kng.kng_flag = 0 and kng.kng_owner_id = usr.usr_id and kng.kng_cate_id = cate.cate_id") 
				-> field ('kng.kng_id kid,usr.usr_account acc,kng.kng_update_date dt,kng.kng_name name,kng.kng_describe dscr,kng.kng_like lk,kng.kng_cate_id ctid,cate.cate_name ctnm')
 				-> order ('kng_update_date desc')
 				-> limit (0, 4) 
 				-> select ();
				$this -> assign ('items', $data);
				$this -> display ('Main/index');
			}
		}

		public function more_items () {
			if (($id = check_login ()) < 0) {
				$this -> redirect ('Login/index');
			} else {
				$this -> personal ();
				$page = $_GET ['start'];
				if (! isset ($page))
					$page = 0;
				// Load first 4 item.
				$kng = M ('Kng');
				$data = $kng 
				-> table ('ezsys_kng kng,ezsys_usr usr,ezsys_cate cate')
				-> where ("kng.kng_share = 1 and kng.kng_flag = 0 and kng.kng_owner_id = usr.usr_id and kng.kng_cate_id = cate.cate_id") 
				-> field ('kng.kng_id kid,usr.usr_account acc,kng.kng_update_date dt,kng.kng_name name,kng.kng_describe dscr,kng.kng_like lk,kng.kng_cate_id ctid,cate.cate_name ctnm')
 				-> order ('kng_update_date desc')
 				-> limit ($page, 4)
 				-> select ();
				// $this -> display ('Main/index');
				$this -> ajaxReturn ($data);
			}
		}

}
