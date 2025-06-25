<?php
$data = file_get_contents("php://input");
file_put_contents("dados.json", $data);

echo json_encode(["status" => "sucesso", "mensagem" => "Dados gravados com sucesso!"]);
