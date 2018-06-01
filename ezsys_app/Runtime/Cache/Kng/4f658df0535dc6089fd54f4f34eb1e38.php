<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
    <!-- Basic Page Needs
  ================================================== -->
	<meta charset="utf-8">
	<title>ez's Knownledge</title>
	<meta name="description" content="Ez system.">
	<meta name="author" content="kukunanhai_5207@126.com">
	
    <!-- Mobile Specific Metas
  ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <!-- CSS
  ================================================== -->
  <link rel="stylesheet" href="/EZSYS/src/Public/css/zerogrid.css"/>
	<link rel="stylesheet" href="/EZSYS/src/Public/css/main.css"/>
	<link rel="stylesheet" href="/EZSYS/src/Public/ckeditor/plugins/codesnippet/lib/highlight/styles/railscasts.css" />
	<link rel="shortcut icon" href="/EZSYS/src/Public/images/favicon.ico" />
	
	<script src="/EZSYS/src/Public/ckeditor/ckeditor.js"></script>
	<script src="/EZSYS/src/Public/scripts/jquery-latest.min.js"></script>
	<script src="/EZSYS/src/Public/scripts/sys_utils.js"></script>
	<script type="text/javascript" src="/EZSYS/src/Public/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js"></script>
	<script type="text/javascript" src="/EZSYS/src/Public/scripts/main_page.js"></script>
	<script type="text/javascript">
		// hljs.configure ({useBR:true});
		hljs.initHighlightingOnLoad();
	</script>
	<!--[if lt IE 8]>
       <div style=' clear: both; text-align:center; position: relative;'>
         <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">
           <img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0" height="42" width="820" alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today." />
        </a>
      </div>
    <![endif]-->
    <!--[if lt IE 9]>
		<script src="js/html5.js"></script>
		<script src="js/css3-mediaqueries.js"></script>
	<![endif]-->
    
</head>
<body>
<div class="wrap-body">

<!--////////////////////////////////////Header-->
<header>
	<div class="wrap-header zerogrid">
		<div class="row">
			<div id="cssmenu">
				<ul>
				   <li class='active'><a href="main_page">主页</a></li>
					 <li><a href="../index/index" style="color:blue;"><?php echo ($usr_name); ?></a></li>
					 <li><a href="../login/logout">退出</a></li>
				   <li><a href="#">关于</a>
					 	<ul>
							<li><a href="#">公司</a></li>
							<li><a href="#">技术支持</a></li>
							<li><a href="#">开发者</a></li>
							<li><a href="#">系统</a></li>
						</ul>
					 </li>
				</ul>
			</div>
			<a class="logo"><img src="/EZSYS/src/Public/images/logobig.png" /></a>
		</div>
	</div>
</header>

<!--////////////////////////////////////Container-->
<section id="container">
	<div class="zerogrid">
		<div class="wrap-container clearfix">
			<div id="main-content">
				<div class="row wrap-content"><!--Start Box-->
					<div class="header">
						<h1>Sharing your intelligence</h1>
						<span>The Latest Knowledge for everyone</br>Start challenge!</span>
					</div>	
					<div class="row">

						<div class="col-1-3">
							<div class="wrap-col">

							<?php if(is_array($items)): $i = 0; $__LIST__ = $items;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$i): $mod = ($i % 2 );++$i;?><div class="item-container">
									<p class="item-title">
										<?php echo ($i["name"]); ?>
										<a class="item-author">作者:<b><?php echo ($i["acc"]); ?></b></a>
										<a class="item-cate"><?php echo ($i["ctnm"]); ?></a>
										<a kid="<?php echo ($i["kid"]); ?>" onclick="slide_down_up (this);" class="item-open">打开</a>
									</p>
									<div class="item-desc">
										<?php echo ($i["dscr"]); ?>
									</div>
									<div class="item-bottom">
										<a  kid="<?php echo ($i["kid"]); ?>" onclick="like_it (this);">
											<i class="item-bottom-like"></i>喜欢(<b><?php echo ($i["lk"]); ?></b>)
										</a>|
										<a>
											<i class="item-bottom-comm"></i>打开评论(<b>21</b>)
										</a>|
										<a>
											<i class="item-bottom-share" style="width:12px;"></i>分享
										</a>|
										<a>
											<?php echo ($i["dt"]); ?>
										</a>
									</div>
								</div><?php endforeach; endif; else: echo "" ;endif; ?>

							</div><!--wrap-->
						</div><!--col-->

					</div><!--row-->
				</div> <!--box-->
				<div class="load_btn_div">
					<a onclick="load_more ();">加载更多...</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!--////////////////////////////////////Footer-->
<footer>
	<div class="zerogrid">
		<div class="wrap-footer">
			<div class="row">
				<h3>Contact</h3>
				<span>电话 / +86 186-6666-6666</span></br>
				<span>Email / kukunanhai_5207@126.com</span></br>
				<span>Blog / <a href="http://blog.csdn.net/u012842205" target="_blank">http://blog.csdn.net/u012842205</a></span></br>
				<span>工作室 / 河北保定华电二校教十</span></br>
				<span><strong>Copyright &copy; 2016.<a href="http://dreamtech.club" target="_blank">Dre@mtech</a> All rights reserved.</strong></span>
			</div>
		</div>
	</div>
</footer>

</div>
</body>
</html>