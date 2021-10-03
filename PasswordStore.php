<?php

if (isset($_POST['NewAccount']))
    $jsonNewAccount = $_POST['NewAccount'];

if ($jsonNewAccount)
    $sFeedback = NewAccount ($jsonNewAccount);

function NewAccount ($jsonNewAccount) {
    $objNewAccount = json_decode($jsonNewAccount);
    $objNewAccount->password = password_hash($objNewAccount->password, PASSWORD_DEFAULT);

    $dbhost = 'localhost';
    $dbuser = 'games_site';
    $dbpass = 'wDFlsO5daFteekyk';
    $db = "games";
    $dbconnect = new mysqli($dbhost, $dbuser, $dbpass, $db);

    $stmt = $dbconnect->prepare("INSERT INTO Users (first, last, username, password, ip) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $objNewAccount->first, $objNewAccount->last, $objNewAccount->username, $objNewAccount->password, $objNewAccount->ip);
    $status = $stmt->execute();
    $stmt->close();
    return $status;
}

// function LogIn ($jsonCredentials) {
//     $objCredentials = json_decode($jsonCredentials);
//     $sSQL = "SELECT * FROM Users WHERE username = '" . $objCredentials->un . "'";
//     $tResult = QueryDB ($sSQL);
//     if (1 != $tResult->num_rows)
//         return false;
//     $row = $tResult->fetch_assoc();
//     $bMatched = password_verify($objCredentials->pw, $row["password"]);
//     if (!$bMatched)
//         return false;
//
//     $objUserData = new stdClass();
//     $objUserData->id = $row["id"];
//     $objUserData->username = $row["username"];
//     return json_encode($objUserData);
// }
//
// function CheckUNAvail ($sCheckUNAvail) {
//     $sSQL = "SELECT * FROM Users WHERE username = '" . $sCheckUNAvail . "'";
//     $tResult = QueryDB ($sSQL);
//     return $tResult->num_rows;
// }

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


/*

mysql -u root -p
CREATE DATABASE passwordstore;
USE passwordstore;
CREATE USER 'password_store_site'@'localhost' IDENTIFIED BY 'wDFlsO5daFteekyk';
GRANT ALL PRIVILEGES ON passwordstore.* TO 'password_store_site'@'%' IDENTIFIED BY 'wDFlsO5daFteekyk'



mysqldump -u root -p passwordstore > passwordstore.sql

*/

?>
