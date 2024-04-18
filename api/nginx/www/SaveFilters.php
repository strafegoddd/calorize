<?php

header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

//$json = file_get_contents('php://input');
//$data = json_decode($json, true);

$eatList = array('meat', 'fish', 'vegan');
//$noEatList = $data['noEatList'];

$ingredientString = "'" . implode("', '", $eatList) . "'";

$sql = "SELECT user_id
        FROM user_preferences
        WHERE ingridient_id IN (
            SELECT ingridient_id
            FROM ingridient
            WHERE ingridient_name IN ($ingredientString)
        )";

//$result = $pdo->query($sql);
if ($result = $pdo->query($sql)) {
    foreach ($result as $row) {
        echo "User ID: " . $row["user_id"]. "<br>";
    }
}
//if ($result->num_rows > 0) {
//    // Выводим данные каждой строки
//    while($row = $result->fetch_assoc()) {
//        echo "User ID: " . $row["user_id"]. "<br>";
//    }
//} else {
//    echo "Нет результатов";
//}