#!/bin/bash

# Parâmetros de conexão
USUARIO="desenvolvedor"
SENHA="Spot1234#"
HOST="localhost"

# Nome do arquivo SQL temporário
ARQUIVO_SQL="script_spotparking.sql"

# Criar o arquivo SQL
cat <<EOF > $ARQUIVO_SQL
$(cat <<'SQL'
CREATE DATABASE SpotParking;

USE SpotParking;

-- CRIANDO TABELAS:

CREATE TABLE Cliente (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(30) NOT NULL,
	senha VARCHAR(255) NOT NULL
);

CREATE TABLE Shopping (
	idShopping INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	cnpj CHAR(14) NOT NULL,
	rua VARCHAR(45) NOT NULL,
	bairro VARCHAR(45) NOT NULL,
	cep CHAR(8) NOT NULL,
	numero VARCHAR(10) NOT NULL,
	cidade VARCHAR(45) NOT NULL,
	estado CHAR(2) NOT NULL,
	fkCliente INT NOT NULL,
	CONSTRAINT fkCliente FOREIGN KEY (fkCliente) REFERENCES Cliente(idCliente)
);

CREATE TABLE Estacionamento (
	idEstacionamento INT PRIMARY KEY AUTO_INCREMENT,
	capacidade INT NOT NULL,
	fkShopping INT NOT NULL,
	CONSTRAINT fkShopping FOREIGN KEY (fkShopping) REFERENCES Shopping(idShopping)
);


-- TABELAS DE FUNCIONAMENTO DO SISTEMA/DASHBOARD:

CREATE TABLE Vaga (
	idVaga INT PRIMARY KEY AUTO_INCREMENT,
	piso CHAR(10) NOT NULL,
	posicao CHAR(10) NOT NULL,
	fkEstacionamento INT NOT NULL,
	CONSTRAINT fkEstacionamentoVaga FOREIGN KEY (fkEstacionamento) REFERENCES Estacionamento(idEstacionamento)
);

CREATE TABLE Fluxo (
	idFluxo INT PRIMARY KEY AUTO_INCREMENT,
	dataHora DATETIME NOT NULL,
	movimentacao CHAR(10) NOT NULL,
	contagem INT NOT NULL,
	fkEstacionamento INT NOT NULL,
	CONSTRAINT fkEstacionamentoFluxo FOREIGN KEY (fkEstacionamento) REFERENCES Estacionamento(idEstacionamento)
);

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(45) NOT NULL,
	fkVaga INT NOT NULL,
	CONSTRAINT fkVaga FOREIGN KEY (fkVaga) REFERENCES Vaga(idVaga)
);

CREATE TABLE Ocupacao (
	idOcupacao INT NOT NULL,
	fkSensor INT NOT NULL,
	entrada DATETIME NOT NULL,
	saida DATETIME,
	status_vaga VARCHAR(20) NOT NULL,
	CONSTRAINT PkComposta PRIMARY KEY (idOcupacao, fkSensor)
);

)
EOF

# Executar o script SQL no MySQL
mysql -u$USUARIO -p$SENHA -h$HOST < $ARQUIVO_SQL

# Opcional: remover o arquivo SQL
rm $ARQUIVO_SQL

