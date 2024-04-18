<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);
$ingrArr = [];


if ($result = $pdo->query("SELECT * FROM `ingridient`")) {
    foreach ($result as $row) {
            $filters[] = $row;
    }
}

echo json_encode($filters);