-- Adicionar índices para melhorar performance
USE salao_da_nyra;

ALTER TABLE agendamentos ADD INDEX idx_cliente (cliente_id);
ALTER TABLE agendamentos ADD INDEX idx_profissional (profissional_id);
ALTER TABLE agendamentos ADD INDEX idx_servico (servico_id);
ALTER TABLE agendamentos ADD INDEX idx_data (data_agendamento);

-- Adicionar coluna de avaliação
ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS avaliacao INT CHECK (avaliacao >= 1 AND avaliacao <= 5);

-- Adicionar histórico de status
CREATE TABLE IF NOT EXISTS agendamentos_historico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  agendamento_id INT NOT NULL,
  status_anterior ENUM('pendente', 'confirmado', 'cancelado', 'concluido'),
  status_novo ENUM('pendente', 'confirmado', 'cancelado', 'concluido'),
  data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agendamento_id) REFERENCES agendamentos(id)
);
