<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$user = 'root';
$password = 'password';

$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';
$data = json_decode(file_get_contents('php://input'), true);
$selectedUser = $data['username'];

//echo ($selectedUser);
try {
    // Подключение к базе данных с использованием PDO
    $pdo = new PDO($dsn, $user, $password);
    // Установка режима ошибок PDO на исключения
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Подготовка запроса
    $stmt = $pdo->prepare("SELECT * FROM user WHERE login=:login");
    $stmt->bindParam(':login', $selectedUser);
    $stmt->execute();

    // Проверка результатов запроса
    if ($stmt->rowCount() > 0) {
        // Успешная авторизация
        session_start();
        $_SESSION['login'] = $selectedUser;
//        header('Location: SaveFilters.php');
        echo $selectedUser;
    } else {
        // Пользователь не найден
        echo "error";
    }
} catch(PDOException $e) {
    // Обработка ошибок подключения к базе данных
    echo "Connection failed: " . $e->getMessage();
}
$pdo = null; // Закрытие соединения
}
else {
    // Если запрос не является POST, возвращаем ошибку
    echo "Method Not Allowed";
}