<?php
session_start();
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

$stmt = $pdo->query("SELECT * FROM `user`");
$row = $stmt->fetch();

print_r($row);