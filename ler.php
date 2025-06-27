<?php
header('Content-Type: application/json');
require_once "Database.php";

$db = new Database();
$conn = $db->conectar();

$pessoas = [];

$stmt = $conn->query("SELECT * FROM pessoa");

while ($pessoa = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $id = $pessoa['id'];
    $filhos = [];

    $stmtFilhos = $conn->prepare("SELECT nome FROM filho WHERE id_pessoa = :id");
    $stmtFilhos->execute([':id' => $id]);

    while ($filho = $stmtFilhos->fetch(PDO::FETCH_ASSOC)) {
        $filhos[] = $filho['nome'];
    }

    $pessoas[] = [
        'nome' => $pessoa['nome'],
        'filhos' => $filhos
    ];
}

echo json_encode(['pessoas' => $pessoas], JSON_PRETTY_PRINT);
