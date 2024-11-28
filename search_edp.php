<?php
include_once("config.php");


function searchDB($query)
{
    global $DB_USER, $DB_PASS, $DB_HOST, $DB_NAME;
    $pdo = new PDO('mysql:host=' . $DB_HOST . ';dbname=' . $DB_NAME . ';charset=utf8mb4', $DB_USER, $DB_PASS);
    $sql = "SELECT * FROM objekte WHERE OBJEKTTYP = ? AND OBJEKT LIKE ?";
    $prep = $pdo->prepare($sql);
    $prep->execute(["PüMa Stand", "%" . $query . "%"]);

    $data = [];
    while ($row = $prep->fetch()) {
        $data[] = [
            "loc" => [$row["KOORDY"], $row["KOORDX"]],
            "title" => $row["OBJEKT"]
        ];

    }


    return json_encode($data, true);
}
if (!isset($_GET['q']) or empty($_GET['q']))
    die(json_encode(array('ok' => 0, 'errmsg' => 'specify q parameter')));

@header("Content-type: application/json;charset=utf8mb4");

echo searchDB($_GET['q']);
?>