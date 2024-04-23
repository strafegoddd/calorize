<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$user = 'root';
$password = 'password';
$dsn = 'mysql:host=db;dbname=calorize_db;charset=utf8';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $login = $data["login"];

    try {
        // Создание подключения к базе данных
        $conn = new PDO($dsn, $user, $password);
        // Установка режима ошибок PDO на исключения
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql_user_id = "SELECT user_id FROM user WHERE login = :login";
        $stmt_user_id = $conn->prepare($sql_user_id);
        $stmt_user_id->bindParam(':login', $login);
        $stmt_user_id->execute();
        $user_result = $stmt_user_id->fetch(PDO::FETCH_ASSOC);

        if ($user_result) {
            $user_id = $user_result['user_id'];
            $sql = "SELECT i.ingridient_name
                FROM ingridient i
                JOIN user_preferences up ON i.ingridient_id = up.ingridient_id
                WHERE up.user_id = :user_id AND up.is_like = 'like'";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                // Вывод результатов
                foreach ($result as $row) {
                    $new['eat'][] = $row['ingridient_name'];
                }
                $placeholders = str_repeat('?,', count($new['eat']) - 1) . '?';
                $sql_dish_id = "SELECT DISTINCT d.dish_id
                    FROM dish d
                    JOIN portion p ON d.dish_id = p.dish_id
                    JOIN ingridient_portion ip ON p.portion_id = ip.portion_id
                    JOIN ingridient i ON ip.ingridient_id = i.ingridient_id
                    WHERE i.ingridient_name IN ($placeholders)";
                $stmt_dish_id = $conn->prepare($sql_dish_id);
                $stmt_dish_id->execute($new['eat']);
                $dish_ids = $stmt_dish_id->fetchAll(PDO::FETCH_COLUMN);
                if ($dish_ids) {
                    $sql_dish_name = "SELECT dish_name FROM dish WHERE dish_id IN (".implode(',', $dish_ids).")";
                    $stmt_dish_name = $conn->prepare($sql_dish_name);
                    $stmt_dish_name->execute();
                    $dish_names = $stmt_dish_name->fetchAll(PDO::FETCH_COLUMN);
                    if ($dish_names) {
                        //echo "Блюда, содержащие следующие ингредиенты:<br>";
                        foreach ($dish_names as $dish_name) {
                            $arr['eatDish'][] = $dish_name;
                        }
                        //echo json_encode($arr);
                    } else {
                        echo "Нет блюд, содержащих указанные ингредиенты";
                    }
                }
                else{
                    $arr['eatDish'] = [];
                }
            }
            else{
                $arr['eatDish'] = [];
                //echo 'no one eat';
            }
            $sql = "SELECT i.ingridient_name
                FROM ingridient i
                JOIN user_preferences up ON i.ingridient_id = up.ingridient_id
                WHERE up.user_id = :user_id AND up.is_like = 'not like'";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                // Вывод результатов
                foreach ($result as $row) {
                    $new['notEat'][] = $row['ingridient_name'];
                }
                $placeholders = str_repeat('?,', count($new['notEat']) - 1) . '?';
                $sql_dish_id = "SELECT DISTINCT d.dish_id
                    FROM dish d
                    JOIN portion p ON d.dish_id = p.dish_id
                    JOIN ingridient_portion ip ON p.portion_id = ip.portion_id
                    JOIN ingridient i ON ip.ingridient_id = i.ingridient_id
                    WHERE i.ingridient_name IN ($placeholders)";
                $stmt_dish_id = $conn->prepare($sql_dish_id);
                $stmt_dish_id->execute($new['notEat']);
                $dish_ids = $stmt_dish_id->fetchAll(PDO::FETCH_COLUMN);
                if ($dish_ids) {
                    $sql_dish_name = "SELECT dish_name FROM dish WHERE dish_id IN (".implode(',', $dish_ids).")";
                    $stmt_dish_name = $conn->prepare($sql_dish_name);
                    $stmt_dish_name->execute();
                    $dish_names = $stmt_dish_name->fetchAll(PDO::FETCH_COLUMN);
                    if ($dish_names) {
                        //echo "Блюда, содержащие следующие ингредиенты:<br>";
                        foreach ($dish_names as $dish_name) {
                            $arr['notEatDish'][] = $dish_name;
                        }
                    } else {
                        echo "Нет блюд, содержащих указанные ингредиенты";
                    }
                }
                else{
                    $arr['notEatDish'] = [];
                }
            }
            else{
                $arr['notEatDish'] = [];
                //echo 'no one not eat';
            }




            $answer = array_diff($arr['eatDish'], $arr['notEatDish']);
            //echo json_encode($answer);

            $placeholders = str_repeat('?,', count($answer) - 1) . '?';
            $sql = "SELECT dish_id, dish_name, eating_time, dish_image_url FROM dish WHERE dish_name IN ($placeholders)";
            $stmt = $conn->prepare($sql);
            $stmt->execute($answer);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }
    } catch(PDOException $e) {
        echo "Ошибка: " . $e->getMessage();
    }
    $conn = null;
}