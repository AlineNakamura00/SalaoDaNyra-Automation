-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS salao_da_nyra;
USE salao_da_nyra;

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) UNIQUE,
  email VARCHAR(100),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS servicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  duracao INT COMMENT 'Duração em minutos',
  ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de profissionais
CREATE TABLE IF NOT EXISTS profissionais (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefone VARCHAR(20),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  profissional_id INT NOT NULL,
  servico_id INT NOT NULL,
  data_agendamento DATETIME NOT NULL,
  status ENUM('pendente', 'confirmado', 'cancelado', 'concluido') DEFAULT 'pendente',
  observacoes TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
  FOREIGN KEY (servico_id) REFERENCES servicos(id)
);
