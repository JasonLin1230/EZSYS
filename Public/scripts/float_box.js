function getPageScroll() {
  var xScroll, yScroll;
  if (self.pageYOffset) {
    yScroll = self.pageYOffset;
    xScroll = self.pageXOffset;
  } else if (document.documentElement && 
			document.documentElement.scrollTop) {	 // Explorer 6 Strict
    yScroll = document.documentElement.scrollTop;
    xScroll = document.documentElement.scrollLeft;
  } else if (document.body) {// all other Explorers
    yScroll = document.body.scrollTop;
    xScroll = document.body.scrollLeft;	
  }
  return new Array(xScroll,yScroll) 
}
function getPageHeight() {
  var windowHeight
  if (self.innerHeight) {	// all except Explorer
    windowHeight = self.innerHeight;
  } else if (document.documentElement && 
			document.documentElement.clientHeight) { // Explorer 6 Strict Mode
    windowHeight = document.documentElement.clientHeight;
  } else if (document.body) { // other Explorers
    windowHeight = document.body.clientHeight;
  }	
  return windowHeight
}
// box_close
function _close_msg (_div) {
	_div.fadeOut ('fast');
}
// box_open
function _open_msg (_div) {
	_div.css ('top', getPageScroll ()[1] + (getPageHeight () / 5))
		.css ('left', 385.5);
	_div.fadeIn ('slow');
}
// show message box with message info filled.
function open_msg (_mid, _lab) {
	var box = $('#msg');
	$.get (_get_entry_url ('Message', 'get_msg', 
		[{opt:'kid', val:_mid}, {opt:'lab', val:_lab}]), function (_dt) {
			box.find ('p.msg-box-info i').text (_dt.date);
			box.find ('p.msg-box-info a').text (_dt.account.usr_account);
			box.children ('p.msg-box-body').text (_dt.desc);
		_open_msg ($('#msgbox'));
	});
    refresh_norecv_msg();
}
// close message box, empty filed.
function close_msg () {
	_close_msg ($('#msgbox'));
}
// show src box with src info filled.
function open_src (_sid) {
	var box = $('#src');
	$.get (_get_entry_url ('Src', 'get_src', 
		[{opt:'sid', val:_sid}]), function (_dt) {
			box.find ('p.msg-box-title b').text (
					_dt.src_name.length == 0 ? "无题" : _dt.src_name);
			box.find ('p.msg-box-info i').text (_dt.src_update_date);
			box.find ('p.msg-box-info a.r').text (_dt.account);
			box.find ('p.msg-box-info b').text (_dt.src_down_times);
			box.find ('p.msg-box-info a.d').attr ('href', 
					_get_entry_url ('Src', 'download_src', 
					[{opt:'kid',val:_dt.src_id}])
			);
			box.children ('p.msg-box-body').text (_dt.src_describe);
		_open_msg ($('#srcbox'));
	});
}
// close resource box, empty filed.
function close_src () {
	_close_msg ($('#srcbox'));
}

//按钮的透明度
// $("#forgetbtn").hover(function () {
// 	$(this).stop().animate({
// 		opacity: '1'}, 600);
// 	}, function () {
// 		$(this).stop().animate({
// 			opacity: '0.4'
// 		}, 1000);
// 	}
// );

//关闭
// $(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
// 	$("#msgbox").fadeOut("fast");
// 	$("#mask").css({ display: 'none' });
// });
