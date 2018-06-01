/*
 * Author : ez
 * Date : 2016/5/23
 * Describe : 主页script
 */

/*
 * Author : ez
 * Date : 2016/5/24
 * Describe : 加载更多项
 */
function load_more () {
	var outer = $('div.wrap-col');
	var temp = outer.children ().length;
	var count = temp == 0 ? 0 : temp;
	var _url = _get_entry_url ('Main', 'more_items', 
			[{opt:'start', val:count}]);
	$.get (_url, function (_dt) {
		if (_dt.length == 0) {
			$('div.load_btn_div').children ().text ('没有了:(');
		} else {
			for (var i = 0; i < _dt.length; i ++) {
				outer.append (_create_item (_dt [i]));
			}
			$('div.load_btn_div').children ().text ('加载更多...');
			$('div.item-desc').hide ();
		}
	});
}

/*
 * Author : ez
 * Date : 2016/5/24
 * Describe : 缩回，打开具体数据。
 */
function slide_down_up (_a) {
	$(_a).parent ().next ().slideToggle ('slow')
	.find ('code').each (function (i, block) {
		hljs.highlightBlock (block);
	});
}

/*
 * Author : ez
 * Date : 2016/5/25
 * Describe : 点赞
 */
function like_it (_a) {
	var aobj = $(_a);
	var _url = _get_entry_url ('Kng', 'like_kng',
			[{opt:'kid',val:aobj.attr ('kid')}]);
	$.get (_url, function (_dt) {
		if (_dt > 0) {
			var b = aobj.children ('b');
			b.text (parseInt (b.text ()) + 1);
		} else {
			alert ('您操作失败!');
		}
	});
}

$(document).ready (function () {
	
	$('div.item-desc').hide ();

  $.fn.menumaker = function(options) {
    var cssmenu = $(this), settings = $.extend({
      title: "Menu",
      format: "dropdown",
      sticky: false
    }, options);

    return this.each(function() {
    	cssmenu.prepend('<div id="menu-button">' + 
					settings.title + '</div>');
      $(this).find("#menu-button").on('click', function(){
      	$(this).toggleClass('menu-opened');
      	var mainmenu = $(this).next('ul');
      	if (mainmenu.hasClass('open')) {
      	  mainmenu.hide().removeClass('open');
      	} else {
      	  mainmenu.show().addClass('open');
      	  if (settings.format === "dropdown") {
      	    mainmenu.find('ul').show();
      	  }
      	}
      });
      cssmenu.find('li ul').parent().addClass('has-sub');
      multiTg = function() {
      	cssmenu.find(".has-sub")
				 .prepend('<span class="submenu-button"></span>');
      	cssmenu.find('.submenu-button').on('click', function() {
        	$(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          } else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };
      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');
      if (settings.sticky === true) cssmenu.css('position', 'fixed');
      resizeFix = function () {
        if ($( window ).width() > 768) {
          cssmenu.find('ul').show();
        }
        if ($(window).width() <= 768) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    }); // return $(this).each ();
  }; // menumaker

  // menu
	$("#cssmenu").menumaker({
	   title: "Menu",
	   format: "multitoggle"
	});

});

