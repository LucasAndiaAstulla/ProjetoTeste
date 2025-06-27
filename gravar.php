<?php
header('Content-Type: application/json');
//como se fosse um import para trazer as informações de database
require_once "Database.php";

//variável data recebe os dados
$data = json_decode(file_get_contents("php://input"), true);

//verifica de JSON que foi enviado é valido, se eles estão formatados corretamente
//Somente é um tratamento caso não venha JSON correto com info correta é enviado mensagem de erro
if (!$data || !isset($data['pessoas'])) {
    echo json_encode(["status" => "erro", "mensagem" => "JSON inválido"]);
    exit;
}

//cria uma classe de banco de dados
$db = new Database();
$conn = $db->conectar(); //conn representa a conexão do banco de dados PDO

//Tenta fazer a transação de JSON para SQL
try {
    $conn->beginTransaction();

    //pega cada pessoas do array recebido e grava
    //transcrição para SQL
    foreach ($data['pessoas'] as $pessoa) {
        $stmtPessoa = $conn->prepare("INSERT INTO pessoa (nome) VALUES (:nome)");
        $stmtPessoa->execute([':nome' => $pessoa['nome']]);
        $idPessoa = $conn->lastInsertId();

        //se tiver filho
        if (isset($pessoa['filhos'])) {
            //para cada filho
            foreach ($pessoa['filhos'] as $filhoNome) {
                $stmtFilho = $conn->prepare("INSERT INTO filho (nome, id_pessoa) VALUES (:nome, :id_pessoa)");
                $stmtFilho->execute([
                    ':nome' => $filhoNome,
                    ':id_pessoa' => $idPessoa
                ]);
            }
        }
    }

    //enviar
    $conn->commit();

    //sinal que foi bem sucedido
    echo json_encode(["status" => "sucesso", "mensagem" => "Dados gravados com sucesso!"]);

//Caso exista algum erro
} catch (Exception $e) {
    //pare a conexão
    $conn->rollBack();
    //mostre que deu erro
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao gravar: " . $e->getMessage()]);
}
?>
