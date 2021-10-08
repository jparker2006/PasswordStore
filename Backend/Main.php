<?php

if (isset($_POST['StorePW']))
    $jsonPasswordData = $_POST['StorePW'];

if ($jsonPasswordData)
    $sFeedback = StorePW ($jsonPasswordData);

echo $sFeedback;

function StorePW ($jsonPasswordData) {
    $objPasswordData = json_decode($jsonPasswordData);
    $dbhost = 'localhost';
    $dbuser = 'password_store_site';
    $dbpass = 'wDFlsO5daFteekyk';
    $db = "passwordstore";
    $dbconnect = new mysqli($dbhost, $dbuser, $dbpass, $db);

    $stmt = $dbconnect->prepare("INSERT INTO Passwords (user, passwordFor, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $objPasswordData->username, $objPasswordData->site, $objPasswordData->password);
    $bStatus = $stmt->execute();
    $stmt->close();
    return $bStatus;
}

?>

