<?php

if (isset($_POST['StorePW']))
    $jsonPasswordData = $_POST['StorePW'];
else if (isset($_POST['GetAllPasswords']))
    $sUN = $_POST['GetAllPasswords'];

if ($jsonPasswordData)
    $sFeedback = StorePW ($jsonPasswordData);
else if ($sUN)
    $sFeedback = GetAllPasswords ($sUN);

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

function GetAllPasswords ($sUN) {
    $sSQL = "SELECT * FROM Passwords WHERE user='" . $sUN . "'";
    $tResult = QueryDB ($sSQL);
    $nRows = $tResult->num_rows;
    $objPasswords = [];
    if ($nRows > 0) {
        for ($x=0; $x < $nRows; $x++) {
            $row = $tResult->fetch_assoc();
            $objPasswords[$x] = new stdClass();
            $objPasswords[$x]->site = $row["passwordFor"];
            $objPasswords[$x]->password = $row["password"];
        }
    }
    return json_encode($objPasswords);
}

?>

