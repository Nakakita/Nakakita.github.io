<?php

$words = [
	[
		'ポテチ',
		'とんがりコーン',
	],
	[
		'紅茶',
		'コーヒー',
	],
	[
		'夏祭り',
		'花火',
	],
	[
		'野球',
		'サッカー',
	],
	[
		'猫',
		'犬',
	],
];

$word = $words[mt_rand(0, count($words) - 1)];
$word[] = mt_rand(0, 3);

$word = [
	'野球',
	'サッカー',
	'2'
];
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');
echo json_encode($word);