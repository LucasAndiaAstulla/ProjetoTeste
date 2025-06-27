<?php
require_once "Database.php";

$db = new Database();
$conn = $db->conectar();

if ($conn) {
    echo "Conexão com o banco de dados realizada com sucesso!";
} else {
    echo "Erro ao conectar com o banco de dados.";
}
