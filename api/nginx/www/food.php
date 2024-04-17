<?php
header("Access-Control-Allow-Origin: *");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$pdo = new PDO($dsn, $user, $password);
$ingrArr = [];


$id = $_GET['id'];
if($result = $pdo->query("SELECT * FROM `dish`")){
        foreach($result as $row){
            if ($id == $row["dish_id"]){
                $dishes = $row;
            }
        }
}

if($result = $pdo->query("SELECT * FROM `portion`")){
    foreach($result as $row){
        if ($id == $row["dish_id"]){
            $calories = $row['portion_quantity']/100*$row['calorific'];
            $dishes['calories'] = $calories;
        }
    }
}

//if (!isset($dishes['ingredients'])) {
//    $dishes['ingredients'] = [];
//}

foreach ($dishes as &$dish) {
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
}
//array_push($dishes, $ingridients);
for ($i = 0; $i < count($ingridients); $i++) {
    $dishes["ing_name" . strval($i)] = $ingridients[$i]['ingridient_name'];
    array_push($dishes,$ingridients[$i]['ingridient_name']);
}
array_push($dishes, $calories);
//array_push($dishes,$ingrArr);
//print_r($dishes);
//header('Content-Type: application/json');
echo json_encode($dishes);



