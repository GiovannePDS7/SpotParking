var database = require("../database/config")

async function ObterDadosKPI3(Periodo, Semana, idUsuario) {
    var dataInicial = ''
    var dataFinal = ''
    var MesF30 = ['04', '06', '09', '11']
    var MesF31 = ['01', '03', '05', '07', '08', '10']
    switch (Semana) {
        case '1':
            dataInicial = `${Periodo}01`;
            dataFinal = `${Periodo}07`;
            break;

        case '2':
            dataInicial = `${Periodo}08`;
            dataFinal = `${Periodo}14`;
            break;

        case '3':
            dataInicial = `${Periodo}15`;
            dataFinal = `${Periodo}21`;
            break;

        case '4':
            dataInicial = `${Periodo}22`;

            var mesPeriodo = Periodo.slice(5, 2)
            if (MesF30.includes(mesPeriodo)) {
                dataFinal = `${Periodo}30`;
            } else if (MesF31.includes(mesPeriodo)) {
                dataFinal = `${Periodo}31`;
            } else {
                var ano = Number(Periodo.slice(0, 4))

                if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
                    dataFinal = `${Periodo}29`;
                }
                else {
                    dataFinal = `${Periodo}28`;
                }
            }
            break;
    }
    var instrucaoSql = `
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
    and l.dataHora between '${dataInicial}' and '${dataFinal}'
    and u.idUsuario = ${idUsuario}
group by dia_semana
order by total_entradas desc
limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resSql = await database.executar(instrucaoSql);
    switch (resSql[0].dia_semana) {
        case 'Sunday':
            resSql[0].dia_semana = 'Domingo'
            break;
        case 'Monday':
            resSql[0].dia_semana = 'Segunda-feira'
            break;
        case 'Tuesday':
            resSql[0].dia_semana = 'Terça-feira'
            break;
        case 'Wednesday':
            resSql[0].dia_semana = 'Quarta-feira'
            break;
        case 'Thursday':
            resSql[0].dia_semana = 'Quinta-feira'
            break;
        case 'Friday':
            resSql[0].dia_semana = 'Sexta-feira'
            break;
        case 'Saturday':
            resSql[0].dia_semana = 'Sábado'
            break;
    }
    return resSql;
}

async function ObterDadosKPI4(Periodo, Semana, idUsuario) {
    var dataInicial = ''
    var dataFinal = ''
    var MesF30 = ['04', '06', '09', '11']
    var MesF31 = ['01', '03', '05', '07', '08', '10']
    switch (Semana) {
        case '1':
            dataInicial = `${Periodo}01`;
            dataFinal = `${Periodo}07`;
            break;

        case '2':
            dataInicial = `${Periodo}08`;
            dataFinal = `${Periodo}14`;
            break;

        case '3':
            dataInicial = `${Periodo}15`;
            dataFinal = `${Periodo}21`;
            break;

        case '4':
            dataInicial = `${Periodo}22`;

            var mesPeriodo = Periodo.slice(5, 2)
            if (MesF30.includes(mesPeriodo)) {
                dataFinal = `${Periodo}30`;
            } else if (MesF31.includes(mesPeriodo)) {
                dataFinal = `${Periodo}31`;
            } else {
                var ano = Number(Periodo.slice(0, 4))

                if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
                    dataFinal = `${Periodo}29`;
                }
                else {
                    dataFinal = `${Periodo}28`;
                }
            }
            break;
    }
    var instrucaoSql = `
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
    and l.dataHora between '${dataInicial}' and '${dataFinal}'
    and u.idUsuario = ${idUsuario}
group by dia_semana
order by total_entradas asc
limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resSql = await database.executar(instrucaoSql);

    switch (resSql[0].dia_semana) {
        case 'Sunday':
            resSql[0].dia_semana = 'Domingo'
            break;
        case 'Monday':
            resSql[0].dia_semana = 'Segunda-feira'
            break;
        case 'Tuesday':
            resSql[0].dia_semana = 'Terça-feira'
            break;
        case 'Wednesday':
            resSql[0].dia_semana = 'Quarta-feira'
            break;
        case 'Thursday':
            resSql[0].dia_semana = 'Quinta-feira'
            break;
        case 'Friday':
            resSql[0].dia_semana = 'Sexta-feira'
            break;
        case 'Saturday':
            resSql[0].dia_semana = 'Sábado'
            break;
    }
    return resSql;
}

async function ObterDadosKPI1(Periodo, Semana, idUsuario) {
    var dataInicial = ''
    var dataFinal = ''
    var MesF30 = ['04', '06', '09', '11']
    var MesF31 = ['01', '03', '05', '07', '08', '10']
    switch (Semana) {
        case '1':
            dataInicial = `${Periodo}01`;
            dataFinal = `${Periodo}07`;
            break;

        case '2':
            dataInicial = `${Periodo}08`;
            dataFinal = `${Periodo}14`;
            break;

        case '3':
            dataInicial = `${Periodo}15`;
            dataFinal = `${Periodo}21`;
            break;

        case '4':
            dataInicial = `${Periodo}22`;

            var mesPeriodo = Periodo.slice(5, 2)
            if (MesF30.includes(mesPeriodo)) {
                dataFinal = `${Periodo}30`;
            } else if (MesF31.includes(mesPeriodo)) {
                dataFinal = `${Periodo}31`;
            } else {
                var ano = Number(Periodo.slice(0, 4))

                if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
                    dataFinal = `${Periodo}29`;
                }
                else {
                    dataFinal = `${Periodo}28`;
                }
            }
            break;
    }
    var instrucaoSql = `
select
dayname(l.dataHora) as dia_semana,
    date_format(l.dataHora, '%H:%i') as horario,
    count(distinct l.fkDemandOcup) as total_ocupacoes
from Log l
join Demanda_Ocupacional d on l.fkDemandOcup = d.idDemandOcup and l.fkSensor = d.fkSensor
join Sensor s on d.fkSensor = s.idSensor
join Vaga v on s.fkVaga = v.idVaga
join Estacionamento e on v.fkEstacionamento = e.idEstacionamento
join Shopping sh on e.fkShopping = sh.idShopping
join Usuario u on sh.fkUsuario = u.idUsuario
where 
    l.status_vaga = 'Ocupado'
    and l.dataHora between '${dataInicial}' and '${dataFinal}'
    and u.idUsuario = ${idUsuario}
group by dayname(l.dataHora), horario
order by total_ocupacoes desc
limit 1;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resSql = await database.executar(instrucaoSql);

    switch (resSql[0].dia_semana) {
        case 'Sunday':
            resSql[0].dia_semana = 'Domingo'
            break;
        case 'Monday':
            resSql[0].dia_semana = 'Segunda-feira'
            break;
        case 'Tuesday':
            resSql[0].dia_semana = 'Terça-feira'
            break;
        case 'Wednesday':
            resSql[0].dia_semana = 'Quarta-feira'
            break;
        case 'Thursday':
            resSql[0].dia_semana = 'Quinta-feira'
            break;
        case 'Friday':
            resSql[0].dia_semana = 'Sexta-feira'
            break;
        case 'Saturday':
            resSql[0].dia_semana = 'Sábado'
            break;
    }
    return resSql;
}

async function ObterDadosKPI2(Periodo, Semana, idUsuario) {
    var dataInicial = ''
    var dataFinal = ''
    var MesF30 = ['04', '06', '09', '11']
    var MesF31 = ['01', '03', '05', '07', '08', '10']
    switch (Semana) {
        case '1':
            dataInicial = `${Periodo}01`;
            dataFinal = `${Periodo}07`;
            break;

        case '2':
            dataInicial = `${Periodo}08`;
            dataFinal = `${Periodo}14`;
            break;

        case '3':
            dataInicial = `${Periodo}15`;
            dataFinal = `${Periodo}21`;
            break;

        case '4':
            dataInicial = `${Periodo}22`;

            var mesPeriodo = Periodo.slice(5, 2)
            if (MesF30.includes(mesPeriodo)) {
                dataFinal = `${Periodo}30`;
            } else if (MesF31.includes(mesPeriodo)) {
                dataFinal = `${Periodo}31`;
            } else {
                var ano = Number(Periodo.slice(0, 4))

                if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
                    dataFinal = `${Periodo}29`;
                }
                else {
                    dataFinal = `${Periodo}28`;
                }
            }
            break;
    }
    var instrucaoSql = `
select
dayname(l.dataHora) as dia_semana,
    date_format(l.dataHora, '%H:%i') as horario,
    count(distinct l.fkDemandOcup) as total_ocupacoes
from Log l
join Demanda_Ocupacional d on l.fkDemandOcup = d.idDemandOcup and l.fkSensor = d.fkSensor
join Sensor s on d.fkSensor = s.idSensor
join Vaga v on s.fkVaga = v.idVaga
join Estacionamento e on v.fkEstacionamento = e.idEstacionamento
join Shopping sh on e.fkShopping = sh.idShopping
join Usuario u on sh.fkUsuario = u.idUsuario
where 
    l.status_vaga = 'Ocupado'
    and l.dataHora between '${dataInicial}' and '${dataFinal}'
    and u.idUsuario = ${idUsuario}
group by dayname(l.dataHora), horario
order by total_ocupacoes asc
limit 1;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resSql = await database.executar(instrucaoSql);

    switch (resSql[0].dia_semana) {
        case 'Sunday':
            resSql[0].dia_semana = 'Domingo'
            break;
        case 'Monday':
            resSql[0].dia_semana = 'Segunda-feira'
            break;
        case 'Tuesday':
            resSql[0].dia_semana = 'Terça-feira'
            break;
        case 'Wednesday':
            resSql[0].dia_semana = 'Quarta-feira'
            break;
        case 'Thursday':
            resSql[0].dia_semana = 'Quinta-feira'
            break;
        case 'Friday':
            resSql[0].dia_semana = 'Sexta-feira'
            break;
        case 'Saturday':
            resSql[0].dia_semana = 'Sábado'
            break;
    }
    return resSql;
}

function pegarUltimosDadosG1(idUsuario) {

    var instrucaoSql = `
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
      and u.idusuario = ${idUsuario}

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
              and sh.fkusuario = ${idUsuario}
        ) as ocupacao
    from (
        select 1 as seq union all select 2 union all select 3 
        union all select 4 union all select 5
    ) as horas
    order by dia desc, hora desc
) as resultado_final
order by dia desc, hora desc
limit 6
`;
    console.log("Executando a instrução SQL Ultimos Dados: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function pegarDadosTempoRealG1(idUsuario) {
    var instrucaoSql = `
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
      and u.idusuario = ${idUsuario}

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
              and sh.fkusuario = ${idUsuario}
        ) as ocupacao
    from (
        select 1 as seq union all select 2 union all select 3 
        union all select 4 union all select 5
    ) as horas
    order by dia desc, hora desc
) as resultado_final
order by dia desc, hora desc
limit 1
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function ObterPiso(idUsuario) {
    var instrucaoSql = `
select distinct v.piso from Vaga v join Estacionamento e on v.fkEstacionamento = e.idEstacionamento 
join Shopping s on s.idShopping = e.fkShopping join Usuario u on u.idUsuario = s.fkUsuario where u.idUsuario = ${idUsuario}
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function ObterPosicao(idUsuario) {
    console.log('Model Posicao')
    var instrucaoSql = `
select distinct v.posicao from Vaga v join Estacionamento e on v.fkEstacionamento = e.idEstacionamento 
join Shopping s on s.idShopping = e.fkShopping join Usuario u on u.idUsuario = s.fkUsuario where u.idUsuario = ${idUsuario}
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function pegarUltimosDadosG2(idUsuario, piso, posicao) {

    var instrucaoSql = `
SELECT
    MIN(idLog) AS id
    DATE(l.dataHora) AS dia,
    DATE_FORMAT(l.dataHora, '%H:00') AS hora,
    l.fkSensor AS sensor,
    MAX(CASE WHEN l.status_vaga = 'Ocupado' THEN 1 ELSE 0 END) AS ocupacao
FROM Log l
JOIN Demanda_Ocupacional d ON d.idDemandOcup = l.fkDemandOcup
JOIN Sensor s ON d.fksensor = s.idsensor
JOIN Vaga v ON s.fkvaga = v.idvaga
JOIN Estacionamento e ON v.fkestacionamento = e.idestacionamento
JOIN Shopping sh ON e.fkShopping = sh.idShopping
JOIN Usuario u ON sh.fkusuario = u.idusuario
WHERE u.idusuario = ${idUsuario}
  AND l.fkSensor = (
    SELECT s.idSensor
    FROM Sensor s
    JOIN Vaga v ON s.fkvaga = v.idvaga
    WHERE v.piso = '${piso}' AND v.posicao = '${posicao}'/
  )
GROUP BY dia, hora, sensor
ORDER BY dia DESC, hora DESC
LIMIT 6;
`;
    console.log("Executando a instrução SQL Ultimos Dados: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function pegarDadosTempoRealG2(idUsuario, piso, posicao) {


    var instrucaoSql = `
SELECT
    MIN(idLog) AS id
    DATE(l.dataHora) AS dia,
    DATE_FORMAT(l.dataHora, '%H:00') AS hora,
    l.fkSensor AS sensor,
    MAX(CASE WHEN l.status_vaga = 'Ocupado' THEN 1 ELSE 0 END) AS ocupacao
FROM Log l
JOIN Demanda_Ocupacional d ON d.idDemandOcup = l.fkDemandOcup
JOIN Sensor s ON d.fksensor = s.idsensor
JOIN Vaga v ON s.fkvaga = v.idvaga
JOIN Estacionamento e ON v.fkestacionamento = e.idestacionamento
JOIN Shopping sh ON e.fkShopping = sh.idShopping
JOIN Usuario u ON sh.fkusuario = u.idusuario
WHERE u.idusuario = ${idUsuario}
  AND l.fkSensor = (
    SELECT s.idSensor
    FROM Sensor s
    JOIN Vaga v ON s.fkvaga = v.idvaga
    WHERE v.piso = '${piso}' AND v.posicao = '${posicao}'/
  )
GROUP BY dia, hora, sensor
ORDER BY dia DESC, hora DESC
LIMIT 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    ObterDadosKPI3,
    ObterDadosKPI4,
    ObterDadosKPI1,
    ObterDadosKPI2,
    pegarUltimosDadosG1,
    pegarDadosTempoRealG1,
    pegarUltimosDadosG2,
    pegarDadosTempoRealG2,
    ObterPiso,
    ObterPosicao
};