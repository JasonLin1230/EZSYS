<?php

/*
 * Author : ez
 * Describe : Entry port.
 * Date : 2016/5/4.
*/


if (version_compare (PHP_VERSION, '5.3.0', '<')) {
	die ('require PHP > 5.3.0 !');
}


define ('APP_DEBUG', true);
define ('APP_PATH', './ezsys_app/');

define ('BIND_MODULE', 'Kng');


require './think/ThinkPHP.php';

