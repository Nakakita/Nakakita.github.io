<?php

$dsn = 'mysql:dbname=genro;host=localhost';
$user = 'genro';
$password = 'genro';

try{
    $dbh = new PDO($dsn, $user, $password);
}catch (PDOException $e){
    print('Connection failed:'.$e->getMessage());
    die();
}

// IDを取得
$sky_id = filter_input(INPUT_POST, 'sky_id');

// INSERT
stmt = $pdo -> prepare("INSERT INTO users (sky_id, created_at) VALUES (:sky_id, :now)");
$stmt->bindParam(':sky_id', $sky_id, PDO::PARAM_STR);
$stmt->bindValue(':now', date('yyyy-mm-dd HH:ii:ss'), PDO::PARAM_STR);
$stmt->execute();



