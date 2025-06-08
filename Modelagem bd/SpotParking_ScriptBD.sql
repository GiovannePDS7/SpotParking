CREATE DATABASE SpotParking;

USE SpotParking;

-- CRIandO TABELAS:

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
values (1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 0 DAY);

-- Terça
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 1 DAY);

-- Quarta (3 entradas)
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values 
(1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 2 DAY),
(1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 2 DAY + interval 2 hour),
(1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 2 DAY + interval 4 hour);

-- Quinta (2 entradas)
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values 
(1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 3 DAY),
(1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 3 DAY + interval 3 hour);

-- Sexta
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 4 DAY);

-- Sábado
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 5 DAY);

-- Domingo
insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (1, 1, 'Ocupado', now() - interval WEEKDAY(now()) DAY + interval 6 DAY);


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
		-- and l.dataHora between date_format(now(), '%Y-%m-%d %H:00:00') - interval 1 hour and now()
SELECT 
    DATE(DATE_SUB(NOW(), INTERVAL seq HOUR)) AS dia,
    DATE_FORMAT(DATE_SUB(NOW(), INTERVAL seq HOUR), '%H:00') AS hora,
    (
        SELECT COUNT(DISTINCT d.idDemandOcup)
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        JOIN sensor s ON d.fksensor = s.idsensor
        JOIN vaga v ON s.fkvaga = v.idvaga
        JOIN estacionamento e ON v.fkestacionamento = e.idestacionamento
        JOIN shopping sh ON e.fkshopping = sh.idshopping
        WHERE d.status_vaga = 'Ocupado'
          AND l.dataHora <= DATE_SUB(NOW(), INTERVAL seq HOUR)
          AND sh.fkusuario = 1
    ) AS ocupacao
FROM (
    SELECT 0 AS seq UNION ALL SELECT 1 UNION ALL SELECT 2 
    UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
) AS horas
ORDER BY dia DESC, hora DESC;

        
SELECT * 
FROM Log 
WHERE DATE(dataHora) IN (CURDATE(), CURDATE() - INTERVAL 1 DAY);

-- ÚLTIMAS 6 HORAS - HORA ATUAL

SELECT 
    DATE(DATE_SUB(NOW(), INTERVAL seq HOUR)) AS dia,
    DATE_FORMAT(DATE_SUB(NOW(), INTERVAL seq HOUR), '%H:00') AS hora,
    (
        SELECT COUNT(DISTINCT d.idDemandOcup)
        FROM Log l
        JOIN demanda_ocupacional d ON l.fkDemandOcup = d.idDemandOcup
        JOIN sensor s ON d.fksensor = s.idsensor
        JOIN vaga v ON s.fkvaga = v.idvaga
        JOIN estacionamento e ON v.fkestacionamento = e.idestacionamento
        JOIN shopping sh ON e.fkshopping = sh.idshopping
        WHERE d.status_vaga = 'Ocupado'
          AND l.dataHora <= DATE_SUB(NOW(), INTERVAL seq HOUR)
          AND sh.fkusuario = 1
    ) AS ocupacao
FROM (
    SELECT 1 AS seq UNION ALL SELECT 2 UNION ALL SELECT 3 
    UNION ALL SELECT 4 UNION ALL SELECT 5
) AS horas
ORDER BY dia DESC, hora DESC;


-- ÚLTIMA 1 HORA
SELECT
    CURDATE() AS dia,
    DATE_FORMAT(NOW(), '%H:00') AS hora,
    COUNT(DISTINCT d.idDemandOcup) AS ocupacao
FROM Log l join demanda_ocupacional d on d.idDemandOcup = l.fkDemandOcup
JOIN sensor s ON d.fksensor = s.idsensor
JOIN vaga v ON s.fkvaga = v.idvaga
JOIN estacionamento e ON v.fkestacionamento = e.idestacionamento
JOIN shopping sh ON e.fkshopping = sh.idshopping
JOIN usuario u ON sh.fkusuario = u.idusuario
WHERE d.status_vaga = 'Ocupado'
  AND u.idusuario = 1;


----------------------------------
insert into Demanda_Ocupacional (fkSensor, status_vaga)
values (1, 'Ocupado');
select * from demanda_ocupacional;

insert into Log (fkDemandOcup, fkSensor, status_vaga, dataHora)
values (70, 1, 'Ocupado', '2025-06-08 05:12:00');

----------------------------------

select DATE(l.dataHora) as dia, count(distinct(l.fkDemandOcup)) as Ocupacao from log l group by dia order by DATE(l.dataHora) desc;

-- Última 1 hora + últimas 5 horas anteriores

select * from (
    select
        curdate() as dia,
        date_format(now(), '%H:00') as hora,
        count(distinct d.idDemandOcup) as ocupacao
    from log l
    join demanda_ocupacional d on d.idDemandOcup = l.fkDemandOcup
    join sensor s on d.fksensor = s.idsensor
    join vaga v on s.fkvaga = v.idvaga
    join estacionamento e on v.fkestacionamento = e.idestacionamento
    join shopping sh on e.fkshopping = sh.idshopping
    join usuario u on sh.fkusuario = u.idusuario
    where d.status_vaga = 'Ocupado'
      and u.idusuario = 1

    union all

    select 
        date(date_sub(now(), interval seq hour)) as dia,
        date_format(date_sub(now(), interval seq hour), '%H:00') as hora,
        (
            select count(distinct d.idDemandOcup)
            from log l
            join demanda_ocupacional d on l.fkDemandOcup = d.idDemandOcup
            join sensor s on d.fksensor = s.idsensor
            join vaga v on s.fkvaga = v.idvaga
            join estacionamento e on v.fkestacionamento = e.idestacionamento
            join shopping sh on e.fkshopping = sh.idshopping
            where d.status_vaga = 'Ocupado'
              and l.dataHora <= date_sub(now(), interval seq hour)
              and sh.fkusuario = 1
        ) as ocupacao
    from (
        select 1 as seq union all select 2 union all select 3 
        union all select 4 union all select 5
    ) as horas
    order by dia desc, hora desc
) as resultado_final
order by dia desc, hora desc
limit 6;


select * from log where date(dataHora) = curdate();

insert into Vaga (piso, posicao, fkEstacionamento)
values ('P2', 'A2', 1);

select distinct v.piso from Vaga v join Estacionamento e on v.fkEstacionamento = e.idEstacionamento 
join Shopping s on s.idShopping = e.fkShopping join Usuario u on u.idUsuario = s.fkUsuario where u.idUsuario = 1;

select distinct v.posicao from Vaga v join Estacionamento e on v.fkEstacionamento = e.idEstacionamento 
join Shopping s on s.idShopping = e.fkShopping join Usuario u on u.idUsuario = s.fkUsuario where u.idUsuario = 1;


select * from (
    select
        curdate() as dia,
        date_format(now(), '%H:00') as hora,
        count(distinct d.idDemandOcup) as ocupacao
    from log l
    join demanda_ocupacional d on d.idDemandOcup = l.fkDemandOcup
    join sensor s on d.fksensor = s.idsensor
    join vaga v on s.fkvaga = v.idvaga
    join estacionamento e on v.fkestacionamento = e.idestacionamento
    join shopping sh on e.fkshopping = sh.idshopping
    join usuario u on sh.fkusuario = u.idusuario
    where d.status_vaga = 'Ocupado'
		and v.piso = 'P1' and v.posicao = 'A1'
      and u.idusuario = 1

    union all

    select 
        date(date_sub(now(), interval seq hour)) as dia,
        date_format(date_sub(now(), interval seq hour), '%H:00') as hora,
        (
            select count(distinct d.idDemandOcup)
            from log l
            join demanda_ocupacional d on l.fkDemandOcup = d.idDemandOcup
            join sensor s on d.fksensor = s.idsensor
            join vaga v on s.fkvaga = v.idvaga
            join estacionamento e on v.fkestacionamento = e.idestacionamento
            join shopping sh on e.fkshopping = sh.idshopping
            where d.status_vaga = 'Ocupado'
            and v.piso = 'P1' and v.posicao = 'A1'
              and l.dataHora <= date_sub(now(), interval seq hour)
              and sh.fkusuario = 1
        ) as ocupacao
    from (
        select 1 as seq union all select 2 union all select 3 
        union all select 4 union all select 5
    ) as horas
    order by dia desc, hora desc
) as resultado_final
order by dia desc, hora desc
limit 6;
