<?php

require($path.'/libs/Smarty.class.php');
require($path.'/libs/db.php');
require($path.'/libs/database/ez_sql_core.php');
require($path.'/libs/database/ez_sql_mysqli.php');
 

$db 	 = new ezSQL_mysqli($dbuser,$dbpass,$dbname,$dbhost); 
$smarty  = new Smarty;

// Smarty config
$smarty->addPluginsDir($path.'/libs/plugins/');
$smarty->template_dir = $path.'/themes/';
$smarty->compile_dir = $path.'/libs/cache/compile_tpl/';
$smarty->cache_dir = $path.'/libs/cache/';
$smarty->debugging = false;
$smarty->caching = false;
$smarty->force_compile = false ;
$smarty->cache_lifetime = '10';

