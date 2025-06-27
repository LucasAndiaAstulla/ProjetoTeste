<?php
//funcionalidade é conectar com o banco de dados
class Database {
    private $host = "localhost";
    private $dbname = "projeto_pessoas";
    private $username = "root";
    private $password = "";
    public $conn;

    public function conectar() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8", 
                                  $this->username, 
                                  $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Erro na conexão: " . $e->getMessage();
        }

        return $this->conn;
    }
}
?>
