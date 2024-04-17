<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);

$id=14;

$sql = "SELECT ingridient.ingridient_name
        FROM dish
        JOIN portion ON dish.dish_id = portion.dish_id
        JOIN ingridient_portion ON portion.portion_id = ingridient_portion.portion_id
        JOIN ingridient ON ingridient_portion.ingridient_id = ingridient.ingridient_id
        WHERE dish.dish_id = :dish_id";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':dish_id', $id, PDO::PARAM_INT);
$stmt->execute();
$ingridients = $stmt->fetchAll(PDO::FETCH_ASSOC);
$ingrArr = [];
for ($i = 0; $i < count($ingridients); $i++) {
    array_push($ingrArr,$ingridients[$i]['ingridient_name']);
}
echo json_encode($ingrArr);


