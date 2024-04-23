<?php
session_start();
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);
//$ingrArr = [];


if ($result = $pdo->query("SELECT * FROM `user`")) {
    foreach ($result as $row) {
        $users[] = $row;
    }
}

echo json_encode($users);