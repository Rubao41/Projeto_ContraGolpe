CREATE DATABASE IF NOT EXISTS empresas_db
  DEFAULT CHARACTER SET = utf8mb4;
USE empresas_db;

CREATE TABLE IF NOT EXISTS empresas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(80) NOT NULL,
  cnpj CHAR(14) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY ux_empresas_cnpj (cnpj),
  UNIQUE KEY ux_empresas_usuario (usuario),
  CHECK (cnpj REGEXP '^[0-9]{14}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO empresas (usuario, cnpj, password_hash)
VALUES ('usuario_teste', '12345678000195', SHA2('senha_teste', 256));

SELECT id, usuario, cnpj, ativo, created_at FROM empresas;