<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

//$dishes = [
//    [
//        'eating_time' => 'supper',
//        'dish_name' => 'Pelmeni',
//        'dish_pic' => file_get_contents(dirname(__FILE__) . 'img/pelmeni.jpg')
//    ]
//];
//
//$sql_statement = 'INSERT INTO dish (eating_time, dish_name, dish_pic)';
//$sql_statement .= 'VALUES(:eating_time, :dish_name, :dish_pic)';
//
//foreach ($dishes as $dish) {
//    $stmt = $pdo->prepare($sql_statement);
//    $stmt->execute($dish);
//}
//
//echo 'done!';