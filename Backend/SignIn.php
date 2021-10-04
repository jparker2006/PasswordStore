<?php

if (isset($_POST['NewAccount']))
    $jsonNewAccount = $_POST['NewAccount'];
else if (isset($_POST['LogIn']))
    $jsonCredentials = $_POST['LogIn'];

if ($jsonNewAccount)
    $sFeedback = NewAccount ($jsonNewAccount);
else if ($jsonCredentials)
    $sFeedback = LogIn ($jsonCredentials);

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

function NewAccount ($jsonNewAccount) {
    $objNewAccount = json_decode($jsonNewAccount);
    $objNewAccount->password = password_hash($objNewAccount->password, PASSWORD_DEFAULT);

    $dbhost = 'localhost';
    $dbuser = 'password_store_site';
    $dbpass = 'wDFlsO5daFteekyk';
    $db = "passwordstore";
    $dbconnect = new mysqli($dbhost, $dbuser, $dbpass, $db);

    $stmt = $dbconnect->prepare("INSERT INTO Users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $objNewAccount->username, $objNewAccount->password);
    $bStatus = $stmt->execute();
    $stmt->close();
    return $bStatus;
}

function LogIn ($jsonCredentials) {
    $objCredentials = json_decode($jsonCredentials);
    $sSQL = "SELECT * FROM Users WHERE username = '" . $objCredentials->un . "'";
    $tResult = QueryDB ($sSQL);
    if (1 != $tResult->num_rows)
        return false;
    $row = $tResult->fetch_assoc();
    $bMatched = password_verify($objCredentials->pw, $row["password"]);
    if (!$bMatched)
        return false;
    return true;
}


?>
