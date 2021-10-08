<?php

if (isset($_POST['GetPasswordAll']))
    $sUN = $_POST['GetPasswordAll'];

if ($sUN)
    $sFeedback = GetPasswordAll ($sUN);

echo $sFeedback;

function QueryDB ($sSQL) {
    $dbhost = 'localhost';
    $dbuser = 'password_store_site';
    $dbpass = 'wDFlsO5daFteekyk';
    $db = "passwordstore";
    $dbconnect = new mysqli($dbhost, $dbuser, $dbpass, $db);
    $Result = $dbconnect->query($sSQL);
    $dbconnect->close();
    return $Result;
}

function GetPasswordAll ($sUN) {
    return $sUN;
}




/*
CREATE TABLE Passwords (
user VARCHAR(30) PRIMARY KEY,
password VARCHAR(300),
domain VARCHAR(70),
company VARCHAR(60)
)

*/


?>

