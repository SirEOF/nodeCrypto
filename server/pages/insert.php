<?php
function keygen($length=10)
{
	$key = '';
	list($usec, $sec) = explode(' ', microtime());
	mt_srand((float) $sec + ((float) $usec * 100000));
	
   	$inputs = array_merge(range('z','a'),range(0,9),range('A','Z'));

   	for($i=0; $i<$length; $i++)
	{
   	    $key .= $inputs{mt_rand(0,61)};
	}
	return $key;
}
 
if (isset($_POST) /* && !empty($_POST)*/) {
	if (isset($_POST['first']) && !empty($_POST['first'])) {
 
		$queryUser = "INSERT INTO users (name,uid,decryptKey,date) 
		      VALUES (
			  '".$db->escape($_POST['username'])."',
			  '".$db->escape($_POST['uid'])."',
			  '".$db->escape(keygen(32))."',
			  '".$db->escape($_POST['date'])."'
			  )";
	   		$db->query($queryUser);
     
	}
 
    //var_dump($_POST);
	$date = time();
	$query = "INSERT INTO files (username,fname,fsize,data) 
          VALUES (
		  '".$db->escape($_POST['username'])."',
		  '".$db->escape($_POST['fName'])."',
		  '".$db->escape($_POST['fSize'])."',
		  '".$db->escape($_POST['eString'])."'
		  )";
   		$db->query($query);
} else
	echo 'Mhhhh! Are you lost?';
	
 
