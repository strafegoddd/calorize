<?php
session_start();
//require_once __DIR__ .'/login.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $ingridientsToEat = $data['eatList'];
    $ingridientsToNotEat = $data['noEatList'];
    $login = $data['login'];

try {
    // Создание подключения к базе данных
    $conn = new PDO($dsn, $user, $password);
    // Установка режима ошибок PDO на исключения
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Получение ID пользователя по логину
    $stmt = $conn->prepare("SELECT user_id FROM user WHERE login = :login");
    $stmt->bindParam(':login', $login);
    $stmt->execute();
    $user_id = $stmt->fetchColumn();

    // Вставка выбранных ингредиентов в user_preferences
    $stmt = $conn->prepare("INSERT INTO user_preferences (user_id, ingridient_id,is_like) VALUES (:user_id, (SELECT ingridient_id FROM ingridient WHERE ingridient_name = :ingridient_name), 'like')");
    $stmt->bindParam(':user_id', $user_id);

    foreach ($ingridientsToEat as $ingredient) {
        $stmt->bindParam(':ingridient_name', $ingredient);
        $stmt->execute();
    }

    $stmt = $conn->prepare("INSERT INTO user_preferences (user_id, ingridient_id,is_like) VALUES (:user_id, (SELECT ingridient_id FROM ingridient WHERE ingridient_name = :ingridient_name), 'not like')");
    $stmt->bindParam(':user_id', $user_id);

    foreach ($ingridientsToNotEat as $ingredient) {
        $stmt->bindParam(':ingridient_name', $ingredient);
        $stmt->execute();
    }

    echo "Ингредиенты успешно добавлены в предпочтения пользователя.";
} catch(PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}
$conn = null;
}
