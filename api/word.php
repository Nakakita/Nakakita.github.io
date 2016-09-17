<?php

$words = [
	'サランラップ',
	'コンドーム',
	mt_rand(1, 4),
];

header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');
echo json_encode($words);