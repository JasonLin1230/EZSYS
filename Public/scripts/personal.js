/*
 * Author : ez
 * Describe : Personal page javascript
 * Date : 2016/5/10
*/

// global variables.
var current_page;

// 个人管理 -> 个人信息
function personal_info () {
	var _url = _get_entry_url ('user', 'get_personal_info');
	var obj = $.ajax ({url: _url, async: false});
	if (obj != null) {
		var pobj = obj.responseJSON;
		$('span.gender i').addClass (pobj.gender == '1' ? 
				'icon-male' : 'icon-female');
		$('span.name').html (pobj.name);
		$('span.account').html (pobj.account);
		$('span.email').html (pobj.email);
		$('span.phone').html (pobj.phone);
	}
	$('div.outer').css ('display', 'none')
		.filter ('.personal_outer').css ('display', 'block');
}
// 个人管理 -> 密码管理
function personal_code () {
	$('div.outer').css ('display', 'none')
		.filter ('.code-outer').css ('display', 'block');
}
// 知识管理 -> 我的发布
function personal_kng_mine (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Kng', 'personal_kng_mine');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Kng', 'personal_kng_mine', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var thead = $('#thead').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Kng/delete_kng?kid=';
				if (count == 0) {
					$('#notify_info').text ('您目前还没有发布任何知识呢:( 赶紧发布吧！');
				} else {
					$('#notify_info').html ('这是您目前分享的知识, 按时间排序, 当前在<b>第1页</b>');
				}
				// table_head
				_create_tb_head (thead, ['标题', '时间', '热度', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_kng_mine (s);
				})
				// table_body
				var rcd = _data.record;
				for (var i = 0; i < rcd_count; i ++) {
						tbody.append ('<tr>' + '<td class="name_td '+ (rcd [i].kng_share > 0 ? '' : 'script_color') +
							'"><a target="_blank" title="'+ rcd [i].kng_name +'" href="' + 
							_get_entry_url ('Kng', 'show_kng', [{opt:'kid', val:rcd [i].kng_id}]) + '">' +
							(rcd [i].kng_name.length > 15 ? (rcd [i].kng_name.substr (0, 15) + "...") : rcd [i].kng_name) +
							'</a></td><td><a title="发布时间">' + rcd [i].kng_update_date +
							'</a></td><td><a>' + rcd [i].kng_like + '</a>' + 
							'</td><td><img onclick="del_kng (\'' + _del_url + rcd [i].kng_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />' + (rcd [i].kng_share > 0 ?
							'</td></tr>' :
							'<img onclick="sharing_kng ('+
							rcd [i].kng_id +', this)" src="../../Public/images/share1.png" alt="分享" title="分享" /></td></tr>'));
				}
			}
		});
	$('div.outer').css ('display', 'none')
		.filter ('.kng_outer').css ('display', 'block');
	$('.eyebrow1').html ('知识');
}
function sharing_kng (_kid, _dom) {
	var url = _get_entry_url ('Kng', 'share_kng', 
			[{opt:'kid',val:_kid}]);
	$.get (url, function (_data) {
		if (_data > 0) {
			var _img = $(_dom);
			_img.parents ().find ('.name_td')
				.removeClass ('script_color');
			_img.remove ();
			alert ("感谢您的分享!");
		}	else
			alert ("未知原因，分享知识项失败。");
	});
}
// 知识管理 -> 编写最新
function personal_kng_new () {
	$('div.outer').css ('display', 'none')
		.filter ('.kng_new_outer').css ('display', 'block');
	$('#submit_btn').unbind ('click').click (insert_kng); // insert_kng
	$('#submit_script_btn').unbind ('click').click (insert_script); // insert_script;
}
// 知识管理 -> 我的草稿
function personal_script_mine () {
	var _url = 'http://' + window.location.host
		+ '/index.php/Kng/personal_kng_script'; // 目前搜索发布知识。
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var _del_url = '\'http://' + window.location.host +
					'/index.php/Kng/delete_kng?kid=';
				if (count == 0) {
					$('#notify_info').text ('您目前还没有发布任何知识呢:( 赶紧发布吧！');
				} else {
					$('#notify_info').html ('这是您目前分享的知识, 按时间排序, 当前在<b>第1页</b>');
				}
				for (var i = 0; i < rcd_count; i ++) {	
					var rcd = _data.record;
					tbody.append ('<tr>' + '<td class="name_td"><a title="'+ 
							rcd [i].kng_name +'" target="_blank" href="' + _get_entry_url ('Kng', 
								'show_kng', [{opt:'kid', val:rcd [i].kng_id}]) + '">' +
							(rcd [i].kng_name.length > 15 ? (rcd [i].kng_name.substr (0, 15) + '...') : rcd [i].kng_name) +
							'</a></td><td><a title="发布时间">' + rcd [i].kng_update_date +
							'</a></td><td><a>' + rcd [i].kng_like + '</a>' + 
							'</td><td><img onclick="del_kng (' + _del_url + rcd [i].kng_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />' +
							'<img onclick="pub_kng (' + rcd [i].kng_id + 
							');" src="../../Public/images/push1.png" alt="发布" title="发布" /></td></tr>');
				}
			}});
	$('.eyebrow1').html ('草稿');
	$('div.outer').css ('display', 'none')
		.filter ('.kng_outer').css ('display', 'block');
	// $('#submit_btn').unbind ('click').click (insert_kng); // insert_kng
	// $('#submit_script_btn').unbind ('click').click (insert_script);
}
function pub_kng (_kid) {
	var url = _get_entry_url ('Kng', 'push_draft', 
			[{opt:'kid',val:_kid}]);
	$.get (url, function (_data) {
		if (_data > 0) 
			alert ("成功发布，此条目作为私有知识项，可分享与他人。");
		else
			alert ("未知原因，发布知识项失败。");
	});
}
// 资源管理
function personal_src () {
	$('div.outer').css ('display', 'none')
		.filter ('.src_new_outer').css ('display', 'block');
}
// 资源管理 -> 私有资源
function personal_src_priv (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Src', 'personal_src_private');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Src', 'personal_src_private', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var thead = $('#thead').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Src/delete_src?sid=';
				var _down_url = 'http://' + window.location.host +
					'/index.php/Src/download_src?sid=';
				if (count == 0) {
					$('#notify_info').text (':( 赶紧发布吧！');
				} else {
					$('#notify_info').html ('当前在<b>第1页</b>');
				}
				// table_head
				_create_tb_head (thead, ['文件', '时间', '下载量', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_kng_mine (s);
				})
				// table_body
				for (var i = 0; i < rcd_count; i ++) {
					var rcd = _data.record;
					tbody.append ('<tr><td class="name_td"><a onclick="open_src ('+ rcd [i].src_id +');" title="'+ rcd [i].src_name +'">' +
							(rcd [i].src_name == '' ? '<i style="color:red;">无题</i>' : rcd [i].src_name) + 
							'</a></td><td><a title="发布时间">' + rcd [i].src_update_date +
							'</a></td><td><a>' + rcd [i].src_down_times + '</a>' + 
							'</td><td><img onclick="del_src (\'' + _del_url + rcd [i].src_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />'+
							'<a href="' + _down_url + rcd [i].src_id + '">'+
							'<img src="../../Public/images/download.png" alt="Download" title="下载" /></a></td></tr>');
				}
			}});
	$('div.outer').css ('display', 'none')
		.filter ('.src_outer').css ('display', 'block');
	$('.eyebrow1').html ('私有资源');
}
// 资源管理 -> 共享资源 
function personal_src_share (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Src', 'personal_src_share');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Src', 'personal_src_share', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var thead = $('#thead').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Src/delete_src?sid=';
				var _down_url = 'http://' + window.location.host +
					'/index.php/Src/download_src?sid=';
				if (count == 0) {
					$('#notify_info').text (':( 赶紧发布吧！');
				} else {
					$('#notify_info').html ('当前在<b>第1页</b>');
				}
				// table_head
				_create_tb_head (thead, ['文件', '时间', '下载量', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_kng_mine (s);
				})
				// table_body
				for (var i = 0; i < rcd_count; i ++) {
					var rcd = _data.record;
					tbody.append ('<tr>' + '<td class="name_td"><a title="'+ rcd [i].src_name +'" onclick="open_src ('+ rcd [i].src_id +');">' + (rcd [i].src_name == '' ? '<i style="color:red;">无题</i>' : rcd [i].src_name) + 
							'</span></a></td><td><a title="发布时间">' + rcd [i].src_update_date +
							'</a></td><td><a>' + rcd [i].src_down_times + '</a>' + 
							'</td><td><img onclick="del_src (\'' + _del_url + rcd [i].src_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" />'+
							'<a href="' + _down_url + rcd [i].src_id + '">'+
							'<img src="../../Public/images/download.png" alt="Download" title="下载" /></a></td></tr>');
				}
			}});
	$('div.outer').css ('display', 'none')
		.filter ('.src_outer').css ('display', 'block');
	$('.eyebrow1').html ('共享资源');
}

// 删除知识项业务
function del_kng (url) {
	if (true == confirm ('您确定要删除吗？此操作将删除其下所有的评论，回复.')) {
		$.get (url, function (data) {
			var status_code = data;
			if (data > 0)
				alert ('已经成功删除!');
			else
				alert ('删除失败！返回码' + status_code);
			// redirect
			// personal_kng_mine ();
		});
	}
}
// 发布知识业务.
function insert_kng () {
	var _url = 'http://' + window.location.host
		+ '/EZSYS/src/index.php/Kng/insert_kng';
	var title_input = $('#small-input');
	var share_input = $('#sharing');
	var cate_input = $('#cate option:selected');
	var desc_input = CKEDITOR.instances.textfield;
	if (title_input.val () == '' || desc_input.getData () == '') {
		alert ('请填写完整的知识表单!');
		return;
	}
	var _data = {
		'kng_title':title_input.val (),
		'kng_desc':desc_input.getData (),
		'kng_sharing':share_input.prop ('checked'),
		'kng_cate':cate_input.val ()
	};
	$.post (_url, _data, function (dt) {
		if (dt > 0) {
			title_input.val ('');
			desc_input.setData ('');
			alert ('发布成功!');
		}
		else alert ('发布失败!');
	});
}
// 保存知识业务
function insert_script () {
	var _url = 'http://' + window.location.host
		+ '/index.php/Kng/insert_kng?tag=0xff';
	var title_input = $('#small-input');
	var share_input = $('#sharing');
	var desc_input = CKEDITOR.instances.textfield;
	if (title_input.val () == '' || desc_input.getData () == '') {
		alert ('请填写完整的知识表单!');
		return;
	}
	var _data = {
		'kng_title':title_input.val (),
		'kng_desc':desc_input.getData (),
		'kng_sharing':share_input.prop ('checked'),
		'is_script':1
	};
	$.post (_url, _data, function (dt) {
		if (dt > 0) {
			title_input.val ('');
			desc_input.setData ('');
			alert ('保存成功!');
		}
		else alert ('保存失败!');
	});
}

// 删除文件业务
function del_src (url) {
	if (true == confirm ('您确定要删除吗？此操作将删除其下所有的评论，回复.')) {
		$.get (url, function (data) {
			var status_code = data;
			if (data > 0)
				alert ('已经成功删除!');
			else
				alert ('删除失败！返回码' + status_code);//-2本地文件丢失，-1下载失败
			// redirect
			// personal_kng_mine ();
		});
	}
}
// 下载文件业务
/*function down_src (url) {
	if (true == confirm ('您确定要下载吗？')) {
		$.get (url, function (data) {
			var status_code = data;
			if (data > 0)
				alert ('已经成功下载!');
			else
				alert ('下载失败！返回码' + status_code);
			// redirect
			// personal_kng_mine ();
		});
	}
}*/

// 消息管理 -> 已发消息
function personal_send_msg (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Message', 'person_msg_send');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Message', 'personal_msg_send', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var thead = $('#thead').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Message/delete_msg?mid=';
				if (count == 0)
					$('#notify_info').text ('您目前还没有发送任何消息呢:(');
				else
					$('#notify_info').html ('这是您目前发送的所有消息, 系统已按时间排序, 当前在<b>第1页</b>');
				// table_head
				_create_tb_head (thead, ['简讯', '时间', '接收者', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_send_msg (s);
				});
				// table_body
				var rcd = _data.record;
				for (var i = 0; i < rcd_count; i ++) {	
					tbody.append ('<tr>' + '<td class="name_td"><a onclick="open_msg (' + rcd [i].msg_id + ', 0);">' +
							(rcd [i].dscrib.length > 15 ? (rcd [i].dscrib.substr (0, 15) + "...") : rcd [i].dscrib) +
							'</a></td><td><a title="发布时间">' + rcd [i].date + '</a></td><td><a>' + 
							rcd [i].account + '</a></td><td><img onclick="del_msg (\'' + 
							_del_url + rcd [i].msg_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />' +
							'</td></tr>');
				}
			}});
	$('.eyebrow1').html ('已发消息');
	$('div.outer').css ('display', 'none')
		.filter ('.kng_outer').css ('display', 'block');
	// _bind_msg_facebox ();
	// $('#submit_btn').unbind ('click').click ();
}
// 删除消息
function del_msg (url) {
	if (true == confirm ('您确定要删除此消息吗？')) {
		$.get (url, function (data) {
			var status_code = data;
			if (data > 0)
				alert ('已经成功删除!');
			else
				alert ('删除失败！返回码' + status_code);
		});
	}
}
// 消息管理 -> 发送消息
function personal_msg_create () {
	$('div.outer').css ('display', 'none')
		.filter ('.msg_create_outer').css ('display', 'block');
}
// 消息管理 -> 已读消息
function personal_recv_msg (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Message', 'person_msg_recive');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Message', 'personal_msg_recive', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var thead = $('#thead').empty ();
				var tbody = $('#tbody').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Message/delete_msg?mid=';
				if (count == 0)
					$('#notify_info').text ('您目前还没有收到任何消息呢:(');
				else
					$('#notify_info').html ('这是您的历史消息, 系统已按时间排序, 当前在<b>第1页</b>');
				// table_head
				_create_tb_head (thead, ['简讯', '时间', '发送者', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_recv_msg (s);
				});
				for (var i = 0; i < rcd_count; i ++) {	
					var rcd = _data.record;
					tbody.append ('<tr><td class="name_td"><a onclick="open_msg (' + rcd [i].msg_id + ', 1);">' +
							(rcd [i].dscrib == '' ? '<i style="color:red;">无题</i>' : rcd [i].dscrib) + 
							'</a></td><td><a title="发布时间">' + rcd [i].date +
							'</a></td><td><a>' + rcd [i].account + '</a>' + 
							'</td><td><img onclick="del_msg (\'' + _del_url + rcd [i].msg_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />' +
							'</td></tr>');
				}
			}});
	$('.eyebrow1').html ('已读消息');
	$('div.outer').css ('display', 'none')
		.filter ('.kng_outer').css ('display', 'block');
	// $('#submit_btn').unbind ('click').click ();
}
// 消息管理 -> 未读消息
function personal_norecv_msg (_pg) {
	var _url;
	if (arguments.length < 1) {
		_url = _get_entry_url ('Message', 'person_msg_new');
		current_page = 0;
	} else {
		_url = _get_entry_url ('Message', 'personal_msg_new', 
				[{opt:'start', val:_pg}]);
		current_page = _pg;
	}
	var obj = $.ajax ({
			url: _url, 
			async: false,
			success: function (_data) {
				var count = _data.total_cnt;
				var rcd_count = _data.record.length;
				var tbody = $('#tbody').empty ();
				var thead = $('#thead').empty ();
				var tpager = $('div.pagination').empty ();
				var _del_url = 'http://' + window.location.host +
					'/index.php/Message/delete_msg?mid=';
				if (count == 0)
					$('#notify_info').text ('您目前还没有收到任何新消息呢:(');
				else
					$('#notify_info').html ('这是您收到的新消息, 系统已按时间排序, 当前在<b>第1页</b>');
				// table_head
				_create_tb_head (thead, ['简讯', '时间', '发送者', '操作']);
				// table_pager
				_create_pager (tpager, count, function () {
					var s = $(this).attr ('start');
					personal_norecv_msg (s);
				});
				for (var i = 0; i < rcd_count; i ++) {	
					var rcd = _data.record;
					tbody.append ('<tr><td class="name_td"><a onclick="open_msg ('+ rcd [i].msg_id +', 2);">' +
							(rcd [i].dscrib == '' ? '<i style="color:red;">无题</i>' : rcd [i].dscrib) + 
							'</a></td><td><a title="发布时间">' + rcd [i].date +
							'</a></td><td><a>' + rcd [i].account + '</a>' + 
							'</td><td><img onclick="del_msg (\'' + _del_url + rcd [i].msg_id +'\');" ' + 
							'src="../../Public/images/icons/cross.png" alt="Delete" title="删除" />' +
							'</td></tr>');
				}
			}});
	$('.eyebrow1').html ('未读消息');
	$('div.outer').css ('display', 'none')
		.filter ('.kng_outer').css ('display', 'block');
	// $('#submit_btn').unbind ('click').click ();
}
var can_send = false;
// 发送消息按钮
function send_msg () {
	var cont = $('#txt_msg').val ().trim ();
	var rcver = $('#txt_rcver').val ().trim ();
	var toadmin = $('#admin').prop ('checked');
	var _url;
	if (cont == '' || rcver == '') {
		alert ('您不能发送空消息!');
		return;
	}
	if (! can_send) return;
	if (toadmin == true) { // to administrator.
		_url = _get_entry_url ('Message', 'msg_send_utoa');
		$.post (_url, {'describe':cont}, function () {
			$('#txt_msg').val ('');
			$('#txt_rcver').val ('');
			document.getElementById ('admin').checked = false;
			alert ('成功发送!');
		});
	} else {
		_url = _get_entry_url ('Message', 'msg_send_utou');
		$.post (_url, {'describe':cont,'reciver':rcver}, 
			function () {
				$('#txt_msg').val ('');
				$('#txt_rcver').val ('');
				document.getElementById ('admin').checked = false;
				alert ('成功发送!');
			}
		);
	}
}
/*
 * Author : JasonLin
 * Describe : 更新未读消息数量
 * Date : 2018/5/29
*/
function refresh_norecv_msg (_pg) {
    var _url;
    if (arguments.length < 1) {
        _url = _get_entry_url ('Message', 'person_msg_new');
        current_page = 0;
    } else {
        _url = _get_entry_url ('Message', 'personal_msg_new',
            [{opt:'start', val:_pg}]);
        current_page = _pg;
    }
    var obj = $.ajax ({
        url: _url,
        async: false,
        success: function (_data) {
            var count = _data.total_cnt;
            $('#unread_msg').html (count+"条新消息");
        }});
}

$(document).ready (function () {

		$("#main-nav li ul").hide(); // Hide all sub menus
		$("#main-nav li a.current").parent().find("ul").slideToggle("slow"); // Slide down the current menu item's sub menu
		
		$("#main-nav li a.nav-top-item").click ( // When a top menu item is clicked...
			function () {
				$(this).parent().siblings().find("ul").slideUp("normal"); // Slide up all sub menus except the one clicked
				$(this).next().slideToggle("normal"); // Slide down the clicked sub menu
				$('#main-nav li a.nav-top-item.current').removeClass('current');
				$(this).addClass ("current"); // li
				return false;
			}
		);

		$("#main-nav li a.no-submenu").click( // When a menu item with no sub menu is clicked...
			function () {
				window.location.href=(this.href); // Just open the link instead of a sub menu
				return false;
			}
		); 

    // Sidebar Accordion Menu Hover Effect:
		$("#main-nav li .nav-top-item").hover(
			function () {
				$(this).stop().animate({ paddingRight: "25px" }, 200);
			}, 
			function () {
				$(this).stop().animate({ paddingRight: "15px" });
			}
		);

    //Minimize Content Box
		$(".content-box-header h3").css({ "cursor":"s-resize" }); // Give the h3 in Content Box Header a different cursor
		$(".closed-box .content-box-content").hide(); // Hide the content of the header if it has the class "closed"
		$(".closed-box .content-box-tabs").hide(); // Hide the tabs in the header if it has the class "closed"
		
		$(".content-box-header h3").click( // When the h3 is clicked...
			function () {
			  $(this).parent().next().toggle(); // Toggle the Content Box
			  $(this).parent().parent().toggleClass("closed-box"); // Toggle the class "closed-box" on the content box
			  $(this).parent().find(".content-box-tabs").toggle(); // Toggle the tabs
			}
		);

    // Check all checkboxes when the one in a table head is checked:
		$('.check-all').click(
			function(){
				$(this).parent().parent().parent().parent().find("input[type='checkbox']").attr('checked', $(this).is(':checked'));   
			}
		);
		// $(".wysiwyg").wysiwyg(); // Applies WYSIWYG editor to any textarea with the class "wysiwyg"
		// Content box tabs:
			// Hide the content divs
			$('.content-box .content-box-content div.tab-content').hide(); 
			// Add the class "current" to the default tab
			$('ul.content-box-tabs li a.default-tab').addClass('current'); 
			// Show the div with class "default-tab"
			$('.content-box-content div.default-tab').show(); 
			// When a tab is clicked...
			$('.content-box ul.content-box-tabs li a').click( 
				function() { 
					// Remove "current" class from all tabs
					$(this).parent().siblings().find("a").removeClass('current'); 
					// Add class "current" to clicked tab
					$(this).addClass('current'); 
					// Set variable "currentTab" to the value of href of clicked tab
					var currentTab = $(this).attr('href'); 
					// Hide all content divs
					$(currentTab).siblings().hide(); 
					// Show the content div with the 
					// id equal to the id of clicked tab
					$(currentTab).show(); 
					return false; 
				}
			);
	
	    //Close button:
			$(".close").click(
				function () {
					$(this).parent().fadeTo(400, 0, function () { // Links with the class "close" will close parent
						$(this).slideUp(400);
					});
					return false;
				}
			);
	    // Alternating table rows:
			$('tbody tr:even').addClass("alt-row"); // Add class "alt-row" to even table rows
	$('#txt_msg').bind ('propertychange input', function () {
		$('#char_len').html (300 - $(this).val ().length);
	});

	// 消息发送页面响应事件
	$('#txt_rcver').focusout (function () {
		var i = $(this).next ();
		var acc = $(this).val ().trim ();
		if (acc.length == 0) {
			i.css ('color', 'red').text ('* 必填!!!');
			can_send = false;
			return;
		}
		$.get (_get_entry_url ('Message', 'get_name_by_account', 
					[{opt:'reciver',val:acc}]), 
				function (_dt) {
					if (_dt == -1) {
						i.css ('color', 'red').text ('此用户不存在!');
						can_send = false;
					} else {
						i.css ('color', 'green').text ('真实姓名:' + _dt.usr_real_name);
						can_send = true;
					}
				});
	}).focusin (function () {
		$(this).next ().empty ();
	});

	var can_hover = true;
	$('div.item').hover (
		function () {
			if (can_hover) {
				$(this).children ('a.edit-button').css ('display', 'inline-block');
			}
		}, function () {
			if (can_hover) {
				$(this).children ('a.edit-button').css ('display', 'none');
			}
		}
	);
	
	// 手机号修改响应
	$('#edit-phone').click (
		function () {
			var par = $(this).parent ();
			var former = par.prev ().css ('display', 'none') // phone
				.text ();
			par.next ().css ('display', 'inline') // edit-input
				.children ('#txt_phone').val (former);
			par.css ('display', 'none'); // edit-button
			can_hover = false;
		}
	);

	// 手机号修改取消
	$('#btn_cancel_phone').click (
		function () {
			var par = $(this).parent (); // phone
			par.css ('display', 'none'). // edit-input
				prev ().css ('display', 'inline'). // edit-button
				prev ().css ('display', 'inline'); // span
			can_hover = true;
		}
	);
  // 真实姓名修改
	$('#edit-name').click (
		function () {
			var par = $(this).parent ();
			var former = par.prev ().css ('display', 'none') // name
				.text ();
			par.next ().css ('display', 'inline') // edit-input
				.children ('#txt_realname').val (former);
			par.css ('display', 'none'); // edit-button
			can_hover = false;
		}
	);
  // 真实姓名取消
	$('#btn_cancel_name').click (
		function () {
			var par = $(this).parent (); // phone
			par.css ('display', 'none'). // edit-input
				prev ().css ('display', 'inline'). // edit-button
				prev ().css ('display', 'inline'); // span
			can_hover = true;
		}
	);


	// 电子邮箱修改响应
	$('#edit-email').click (
		function () {
			var par = $(this).parent (); // edit-button 
			var former = par.prev ().css ('display', 'none') // span email
				.text ();
			par.next ().css ('display', 'inline'). // a edit-input
				children ('#txt_email').val (former); // input txt_email
			par.css ('display', 'none'); // a edit-button
			can_hover = false;
		}
	);

	// 电子邮箱修改取消
	$('#btn_cancel_email').click (
		function () {
			var par = $(this).parent (); // phone
			par.css ('display', 'none'). // edit-input
				prev ().css ('display', 'inline'). // edit-button
				prev ().css ('display', 'inline'); // span
			can_hover = true;
		}
	);
	// 性别修改响应
	$('#edit-gend').click (
		function () {
			var par = $(this).parent (); // edit-button 
			var former = par.prev ().css ('display', 'none').
				children ().hasClass ('icon-male') == true; // 是否有icon-male class.
			if (former) {
				par.next ().css ('display', 'inline'); // a edit-input
				// $('#txt_female').removeAttr ('checked');
				$('#txt_male').prop ('checked', true);
			} else {
				par.next ().css ('display', 'inline'); // a edit-input
				// $('#txt_male').removeAttr ('checked');
				$('#txt_female').prop ('checked', true);
			}
			par.css ('display', 'none'); // a edit-button
			can_hover = false;
		}
	);
	// 性别修改取消
	$('#btn_cancel_gender').click (
		function () {
			var par = $(this).parent (); // phone
			par.css ('display', 'none'). // edit-input
				prev ().css ('display', 'inline'). // edit-button
				prev ().css ('display', 'inline'); // span
			can_hover = true;
		}
	)
	// 用户信息修改入口函数.
	var edit_sub = function (data) {
		var _url = 'http://' + window.location.host
			+ '/index.php/user/edit_usr_info';
		$.post (_url, data,
			function () {
				var disp = $('span.gender i');
				if (data.new_gender) { // male
					if (! disp.hasClass ('icon-male'))
						disp.removeClass ('icon-female').addClass ('icon-male');
				} else { // female
					if (disp.hasClass ('icon-male'))
						disp.removeClass ('icon-male').addClass ('icon-female');
				}
				$("span.phone").text (data.new_phone_num);
				$("span.email").text (data.new_email);
				$('span.name').text (data.new_real_name);
				// master page
				$('#usr_name').text (data.new_real_name);
		});
	}
	// gender submit
	$('#btn_submit_gender').click (
		function () {
			var gender = $("#txt_male:checked").val () == '1';
			var phone = $('span.phone').text ();
			var email = $('span.email').text ();
			var rname = $('span.name').text ();
			var data = {
				'new_real_name':rname,
				'new_gender':gender,
				'new_phone_num':phone,
				'new_email':email	
			};
			edit_sub (data);
			// style
			var par = $('#btn_cancel_gender').parent (); // phone
			par.css ('display', 'none'). // edit-input
				prev ().css ('display', 'inline'). // edit-button
				prev ().css ('display', 'inline'); // span
			can_hover = true;
		}
	);
	// email submit
	$('#btn_submit_email').click (
		function () {
			var gender = $("span.gender i").hasClass ('icon-male');
			var phone = $('span.phone').text ();
			var email = $('#txt_email').val ();
			var rname = $('span.name').text ();
			var data = {
				'new_real_name':rname,
				'new_gender':gender,
				'new_phone_num':phone,
				'new_email':email	
			};
			edit_sub (data);
			// style
			var par = $('#btn_cancel_email').parent ();
			par.css ('display', 'none').
				prev ().css ('display', 'inline').
				prev ().css ('display', 'inline');
			can_hover = true;
		}
	);
	// phone edit
	$('#btn_submit_phone').click (
		function () {
			var gender = $("span.gender i").hasClass ('icon-male');
			var phone = $('#txt_phone').val ();
			var email = $('span.email').text ();
			var rname = $('span.name').text ();
			var data = {
				'new_real_name':rname,
				'new_gender':gender,
				'new_phone_num':phone,
				'new_email':email	
			};
			edit_sub (data);
			// style
			var par = $('#btn_cancel_phone').parent ();
			par.css ('display', 'none').
				prev ().css ('display', 'inline').
				prev ().css ('display', 'inline');
			can_hover = true;
		}
	);
	// code edit
	$('#code_submit').click (
		function () {
			var _url = 'http://' + window.location.host
				+ '/index.php/User/reset_passcode'
			var p1 = $('#p1').val ();
			var p2 = $('#p2').val ();
			var p3 = $('#p3').val ();
			if (p2 != p3) {
				alert ('Passcode is not equal.');
				return;
			}
			var data = {
				'passcode':p1,
				'new_passcode':p2
			};
			$.post (_url, data, function (_dt) {
				if (_dt == -1) {
					alert ('您原密码错误！');
					$('input[type=password]').val ('');
				} else if (_dt > 0) {
					alert ('修改密码成功。');
					$('input[type=password]').val ('');
				}
			});
		}
	);
  // realname submit. 
	$('#btn_submit_name').click (function () {
		var gender = $("#txt_male:checked").val () == '1';
		var phone = $('span.phone').text ();
		var email = $('span.email').text ();
		var rname = $('#txt_realname').val ();
		var data = {
			'new_real_name':rname,
			'new_gender':gender,
			'new_phone_num':phone,
			'new_email':email
		};
		edit_sub (data);
		// style
		var par = $('#btn_cancel_name').parent (); // phone
		par.css ('display', 'none'). // edit-input
			prev ().css ('display', 'inline'). // edit-button
			prev ().css ('display', 'inline'); // span
		can_hover = true;
	});

	// debug facebox
	personal_info ();
});

