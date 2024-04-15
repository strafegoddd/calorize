<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

if($result = $pdo->query("SELECT * FROM `dish`")){
    foreach($result as $row){
        $new[]['dish_name'] = $row['dish_name'];
    }
}

echo json_encode($new);