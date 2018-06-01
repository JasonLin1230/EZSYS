/*
 * Editor : ez
 * Describe : sign up page js scripts
 * Date : 2016/5/25
 */
$(function(){

	//文本框失去焦点
	$(".mainForm input").blur(function(){
		$("#mz_Float").css("top","");
	});
	//协议条款
	$(".checkboxPic").click(function(){
		if($(this).attr ("isshow")=="false")
		{
			$(this).parent().css("margin-bottom","10px");
			$(".checkboxPic i").css({"background-position":" -0px -127px"});
			$(".otherError").css("display","block");
			$(this).attr("isshow","true");
		}
		else
		{
			$(this).parent().css("margin-bottom","");
			$(".checkboxPic i").css({"background-position":"-31px -127px"});
			$(".otherError").hide();
			$(this).attr("isshow","false");
		}
		
	}); 

	//mainForm2
	//密码是否可见(mainform2)
	$(".pwdBtnShowN").click(function(){
		if($(".pwdBtnShowN").attr("isshow")=="false")
		{
			$(".pwdBtnShowN i").css("background-position","-60px -93px");
			$(".passwordN").hide();
			$(".password1N").val($(".passwordN").val());
			$(".password1N").show();
			$(".pwdBtnShowN").attr("isshow","true");
		}
		else
		{
			$(".pwdBtnShowN i").css("background-position","-30px -93px");
			$(".password1N").hide();
			$(".passwordN").val($(".password1N").val());
			$(".passwordN").show();
			$(".pwdBtnShowN").attr("isshow","false");
		}
		
	});

	//账户名栏获得焦点
	$(".username").focus(function(){
		$(".username").parent().removeClass("errorC");
		$(".username").parent().removeClass("checkedN");
		$(".error1").hide();
		$("#mz_Float").css("top","232px");
		$("#mz_Float").find(".bRadius2").html("长度为6-16个字符支持数字、字母、下划线，字母开头，字母或数字结尾");
	});
	//邮箱栏获得焦点
	$(".email").focus(function(){
		$(".email").parent().removeClass("errorC");
		$(".email").parent().removeClass("checkedN");
		$(".error2").hide();
		if($(".error1").css("display")=="block" && $(".error3").css("display")=="block")
		{
			$("#mz_Float").css("top","436px");
		}
		else if($(".error1").css("display")=="block" || $(".error3").css("display")=="block")
		{
			$("#mz_Float").css("top","406px");
		}
		else
		{
			$("#mz_Float").css("top","376px");
		}
		
		$("#mz_Float").find(".bRadius2").html("用于找回密码，提高账户安全等级");
	});
	//密码栏获得焦点(mainform2)
	$(".passwordN,.password1N").focus(function(){
		$(".passwordN").parent().removeClass("errorC");
		$(this).parent().removeClass("checkedN");
		$(".error3").hide();
		if($(".error1").css("display")=="block")
		{
			$("#mz_Float").css("top","334px");
		}
		else
		{
			$("#mz_Float").css("top","304px");
		}
		
		$("#mz_Float").find(".bRadius2").html("长度为6-16个字符，区分大小写，至少包含两种类型");
	});

	//账户名栏失去焦点
	$(".username").blur (function () {
		//reg=/^[a-zA-Z][0-9a-zA-Z_]{2,30}[0-9a-zA-Z]$/;
		 reg = /^[a-zA-Z][0-9a-zA-Z_]{5,15}$/;
		if ($(".username").val ()=="") { 
			$(".username").parent ().addClass ("errorC");
			$(".error1").html ("请输入账户名");
			$(".error1").css ("display","block");
		} else if ($(".username").val ().length>16
				|| $(".username").val ().length<6) {   
      $(".username").parent ().addClass("errorC");
      $(".error1").html ("账户名长度有误！");
      $(".error1").css ("display","block");
    } else if(!reg.test ($(".username").val ())) {   
      $(".username").parent ().addClass ("errorC");
      $(".error1").html ("账户名格式有误!!");
      $(".error1").css ("display","block");
    } else {
    	//验证用户名是否存在
    		var _url = _get_entry_url ('Reg', 'checkreg');
			var _data = {
				'usr':$(".username").val ()
			}
			$.post (_url, _data, function (_dt) {
				if (_dt == -1) {
					$(".username").parent ().addClass ("errorC");
      				$(".error1").html ("该账户名已被注册！");
     				$(".error1").css ("display","block");
				} else {
					$(".username").parent ().addClass ("checkedN");
				}
			})
    	}
	});

	//密码栏失去焦点(mainform2)
	$(".passwordN,.password1N").blur(function(){
		reg1=/^.*[\d]+.*$/;
		reg2=/^.*[A-Za-z]+.*$/;
		reg3=/^.*[_@#%&^+-/*\/\\]+.*$/;//验证密码
		if($(".pwdBtnShowN").attr("isshow")=="false")
		{
			var Pval = $(".passwordN").val();
		}
		else
		{
			var Pval = $(".password1N").val();
		}
		
		if( Pval =="")
		{
			$(".passwordN").parent().addClass("errorC");
			$(".error3").html("请填写密码");
			$(".error3").css("display","block");
		}
        else if(Pval.length>16 || Pval.length<6)
        {   
        	$(".passwordN").parent().addClass("errorC");
            $(".error3").html("密码应为6-16个字符，区分大小写");
            $(".error3").css("display","block");
        }
        else if(!((reg1.test(Pval) && reg2.test(Pval)) || (reg1.test(Pval) && reg3.test(Pval)) || (reg2.test(Pval) && reg3.test(Pval)) ))
        {
        	$(".passwordN").parent().addClass("errorC");
            $(".error3").html("需至少包含数字、字母和符号中的两种类型");
            $(".error3").css("display","block");
        }
        else
        {
        	$(".passwordN").parent().addClass("checkedN");
        }
	});
	

	//邮箱栏键盘操作
	$(".email").keyup(function(){//键盘监听keyup,keydown,keypress
		var emailVal = $(".email").val();
		emailValN = emailVal.replace(/\s/g,'');//去空
		emailValN = emailValN.replace(/[\u4e00-\u9fa5]/g,'');//屏蔽中文
		if(emailValN!=emailVal)
		{
			$(".email").val(emailValN);
		}
		
		var mailVal = emailValN.split("@");
		var mailHtml=mailVal[0];
		if(mailHtml.length>15)
		{
			mailHtml=mailHtml.slice(0,15)+"...";//字数超加省略
		}
		
		for(var i=1;i<6;i++)
		{
			var M = $(".item"+i).attr("data-mail");
			$(".item"+i).html(mailHtml+M);
		}
	});

	//邮箱提示
	$(".item").click(function(){
		var a= $(".email").val();
		var b= $(this).attr("data-mail");
		$(".email").val(a+b);
		$(".email").trigger("focus");//setTimeout($(".email").("focus") );效果同，时间设多少无所谓
	});


	$(".email").click(function(){
		if($(".error1").css("display")=="block" && $(".error3").css("display")=="block")
		{
			$(".mail").css("top","489px");
		}
		else if($(".error1").css("display")=="block" || $(".error3").css("display")=="block")
		{
			$(".mail").css("top","459px");
		}
		else
		{
			$(".mail").css("top","429px");
		}
		$(".mail").show(); 
		return false;
	});
	$(document).click(function(){
		$(".mail").hide();
	});

	//邮箱栏失去焦点
	$(".email").blur(function(){
		reg=/^\w+[@]\w+((.com)|(.net)|(.cn)|(.org)|(.gmail))$$/;
		if( $(".email").val()=="") {
			$(".email").parent().addClass("errorC");
			$(".error2").html("邮箱不能为空!");
			$(".error2").css("display","block");
		} else if(!reg.test($(".email").val())) {
      $(".email").parent().addClass("errorC");
      $(".error2").html("邮箱格式错误！");
      $(".error2").css("display","block");
    } else {
    	$(".email").parent().addClass("checkedN");
    }
	});

	$('.fullBtnBlue').click (function () {
		var email = $('.email');
		var acc =   $('.username');
		var pwd =   $('.passwordN');
		var check = $('.checkboxPic');
		if (email.parent ().hasClass ('errorC')
				|| acc.parent ().hasClass ('errorC')
				|| pwd.parent ().hasClass ('errorC')
				|| check.attr ('isshow') == 'true') 
			return;
		else {
			var _url = _get_entry_url ('Reg', 'reg');
			var _data = {
				'usr':acc.val (),
				'pwd':pwd.val (),
				'mail':email.val ()
			}
			$.post (_url, _data, function (_dt) {
				if (_dt == 0) {
					alert ('失败.');
				} else {
				  alert ('成功');
					document.location.href = "../Index";
				}
			})
		}

	});

});

