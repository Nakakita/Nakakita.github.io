<?php

$dsn = 'mysql:dbname=genro;host=localhost';
$user = 'genro';
$password = 'genro';

try{
    $dbh = new PDO($dsn, $user, $password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION) );
}catch (PDOException $e){
    print('Connection failed:'.$e->getMessage());
    die();
}

// IDを取得
$sky_id = filter_input(INPUT_POST, 'sky_id');

$now = date('Y-m-d H:i:s');

try{
	// INSERT
	$stmt = $dbh->prepare("INSERT INTO users (sky_id, created_at) VALUES (:sky_id, :now)");
	$stmt->bindParam(':sky_id', $sky_id, PDO::PARAM_STR);
	$stmt->bindParam(':now', $now, PDO::PARAM_STR);
	$stmt->execute();
} catch (PDOException $e) {
    print('Connection failed:'.$e->getMessage());
    die();
}