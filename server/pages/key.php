<?php
 

if (isset($_POST) /* && !empty($_POST)*/) {
 
    //var_dump($_POST);
	$query = "SELECT * FROM users AS u";
	$query .= " INNER JOIN users_group AS g ON u.level=g.id WHERE u.id='$key'";
			
	$userD = $db->get_row($query);
} else
	echo 'Mhhhh! Are you lost?';
	
 
echo 'Key validate';

