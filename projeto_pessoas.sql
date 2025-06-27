-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS projeto_pessoas;
USE projeto_pessoas;

-- Cria a tabela pessoa
CREATE TABLE IF NOT EXISTS pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Cria a tabela filho
CREATE TABLE IF NOT EXISTS filho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_pessoa INT,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id) ON DELETE CASCADE
);
