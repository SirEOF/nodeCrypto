<?php
/**
 * Example Application
 *
 * @package Example-application
 */
$path = dirname(__FILE__); 
require($path.'/libs/startup.php');
 
switch (isset($_GET["page"])?$_GET["page"]:""){
    case 'insert':
        include 'pages/insert.php';
        break;    

    case 'key':
        include 'pages/key.php';
        break;   

    default:
        include 'pages/main.php';
        $smarty->display('main.html');        
        break;
}
