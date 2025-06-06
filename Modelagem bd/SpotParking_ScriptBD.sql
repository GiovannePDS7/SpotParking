CREATE DATABASE SpotParking;

USE SpotParking;

-- CRIANDO TABELAS:

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
	email VARCHAR(30) NOT NULL,
	senha VARCHAR(255) NOT NULL,
	funcao VARCHAR(30) 
);

CREATE TABLE Shopping (
	idShopping INT PRIMARY KEY AUTO_INCREMENT,
	nomeFantasia VARCHAR(45) NOT NULL,
	cnpj CHAR(14) NOT NULL,
    cep CHAR(8) NOT NULL,
	rua VARCHAR(45) NOT NULL,
	bairro VARCHAR(45) NOT NULL,
	numero VARCHAR(10) NOT NULL,
	cidade VARCHAR(45) NOT NULL,
	UF CHAR(2) NOT NULL,
	fkUsuario INT NOT NULL,
	CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
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

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(45) NOT NULL,
	fkVaga INT NOT NULL,
	CONSTRAINT fkVaga FOREIGN KEY (fkVaga) REFERENCES Vaga(idVaga)
);

CREATE TABLE Demanda_Ocupacional (
	idDemandOcup INT NOT NULL AUTO_INCREMENT,
	fkSensor INT NOT NULL,
    CONSTRAINT fkSensor FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor),
	CONSTRAINT PkComposta PRIMARY KEY (idDemandOcup, fkSensor),
	status_vaga VARCHAR(20) NOT NULL
);

CREATE TABLE Log(
	idLog INT PRIMARY KEY AUTO_INCREMENT,
    fkDemandOcup INT NOT NULL,
    CONSTRAINT fkDemandOcup FOREIGN KEY (fkDemandOcup) REFERENCES Demanda_Ocupacional(idDemandOcup),
    fkSensor INT NOT NULL,
	CONSTRAINT fkDemanOcupSensor FOREIGN KEY (fkSensor) REFERENCES Demanda_Ocupacional(fkSensor),
    status_vaga VARCHAR(20) NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);


select * from Usuario;

-- Inserts

insert into Usuario(nome, email, senha) values('Mario', 'mario@gmail.com', 'mario');


insert into Shopping (nomeFantasia, cnpj, cep, rua, bairro, numero, cidade, UF, fkUsuario)
values ('Shopping Central', '12345678000199', '01001000', 'Rua Principal', 'Centro', '100', 'São Paulo', 'SP', 1);

insert into Estacionamento (capacidade, fkShopping)
values (100, 1);

insert into Vaga (piso, posicao, fkEstacionamento)
values ('P1', 'A1', 1);

insert into Sensor (tipo, fkVaga)
values ('sensor ultrasônico', 1);


insert into Demanda_Ocupacional (fkSensor, status_vaga)
values (1, 'Ocupado'); -- ID será 1

-- Segunda
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 0 DAY);

-- Terça
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 1 DAY);

-- Quarta (3 entradas)
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values 
(1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 2 DAY),
(1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 2 DAY + INTERVAL 2 HOUR),
(1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 2 DAY + INTERVAL 4 HOUR);

-- Quinta (2 entradas)
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values 
(1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 3 DAY),
(1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 3 DAY + INTERVAL 3 HOUR);

-- Sexta
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 4 DAY);

-- Sábado
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 5 DAY);

-- Domingo
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', NOW() - INTERVAL WEEKDAY(NOW()) DAY + INTERVAL 6 DAY);


-- Selects

SET lc_time_names = 'pt_BR';

select * from Log;


select
    dayname(l.dataHora) as dia_semana,
    count(distinct l.fkDemandOcup) as total_entradas
from Log l
join Demanda_Ocupacional d on l.fkDemandOcup = d.idDemandOcup and l.fkSensor = d.fkSensor
join Sensor s on d.fkSensor = s.idSensor
join Vaga v on s.fkVaga = v.idVaga
join Estacionamento e on v.fkEstacionamento = e.idEstacionamento
join Shopping sh on e.fkShopping = sh.idShopping
join Usuario u on sh.fkUsuario = u.idUsuario
where
    l.status_vaga = 'Ocupado'
    and l.dataHora between '2025-06-01' and '2025-06-07'
    and u.idUsuario = 1
group by dia_semana
order by total_entradas desc
limit 1;

select
 dayname(l.dataHora) as dia_semana,
    date_format(l.dataHora, '%H:%i') as horario,
    count(*) as total_ocupacoes
from Log l
join Demanda_Ocupacional d on l.fkDemandOcup = d.idDemandOcup and l.fkSensor = d.fkSensor
join Sensor s on d.fkSensor = s.idSensor
join Vaga v on s.fkVaga = v.idVaga
join Estacionamento e on v.fkEstacionamento = e.idEstacionamento
join Shopping sh on e.fkShopping = sh.idShopping
join Usuario u on sh.fkUsuario = u.idUsuario
where 
    l.status_vaga = 'Ocupado'
    and l.dataHora between '2025-06-01' and '2025-06-08'
    and u.idUsuario = 1
group by dayname(l.dataHora), horario
order by total_ocupacoes asc
limit 1;


select * from Log;

show tables;

describe demanda_ocupacional;
describe Log;



select * from Log order by idLog desc;

select * from demanda_ocupacional order by idDemandOcup desc;

------------------------










-- ÚLTIMAS 6 HORAS

SELECT 
    DATE(l.dataHora) AS Dia,
    DATE_FORMAT(l.dataHora, '%H:00') AS Hora, COUNT(DISTINCT l.fkDemandOcup) as Ocupacao
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        WHERE d.status_vaga = 'Ocupação finalizada'
		AND DATE(l.dataHora) = CURDATE()
        AND HOUR(l.dataHora) BETWEEN date_format(l.dataHora, '%H') - 5 and HOUR(NOW())
        GROUP BY dia, Hora
		ORDER BY Hora desc
        limit 6;

-- ÚLTIMAS 6 HORAS - HORA ATUAL

SELECT 
    DATE(l.dataHora) AS Dia,
    DATE_FORMAT(l.dataHora, '%H:00') AS Hora, COUNT(DISTINCT l.fkDemandOcup) as Ocupacao
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        WHERE d.status_vaga = 'Ocupação finalizada'
		AND DATE(l.dataHora) = CURDATE()
        AND HOUR(l.dataHora) BETWEEN date_format(l.dataHora, '%H') - 5 and HOUR(NOW()) - 1
        GROUP BY dia, Hora
        ORDER BY Hora desc
        limit 6;

-- ÚLTIMA 1 HORA
SELECT 
    CURDATE() AS Dia,
    DATE_FORMAT(NOW(), '%H:00') AS Hora, COUNT(DISTINCT l.fkDemandOcup) as Ocupacao
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        WHERE d.status_vaga = 'Ocupado'
		AND DATE(l.dataHora) = CURDATE()
        AND DATE_FORMAT(l.dataHora, '%H:00') = DATE_FORMAT(NOW(), '%H:00');
--

----------------------------------

select DATE(l.dataHora) as dia, count(distinct(l.fkDemandOcup)) as Ocupacao from log l group by dia order by DATE(l.dataHora) desc;


SELECT 
    DATE(l.dataHora) AS Dia,
    DATE_FORMAT(l.dataHora, '%H:00') AS Hora, COUNT(DISTINCT l.fkDemandOcup) as Ocupacao
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        WHERE d.status_vaga = 'Ocupação finalizada'
		AND DATE(l.dataHora) = CURDATE()
        AND HOUR(l.dataHora) BETW
        -- AND HOUR(l.dataHora) BETWEEN date_format(l.dataHora, '%H') - 5 and HOUR(NOW()) - 1
        GROUP BY dia, Hora
        ORDER BY Hora desc
        limit 6;