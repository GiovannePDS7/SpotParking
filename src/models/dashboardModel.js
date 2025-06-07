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
        count(distinct l.fkdemandocup) as ocupacao
    from log l
    join demanda_ocupacional d on l.fkdemandocup = d.iddemandocup
    join sensor s on s.idsensor = d.fksensor
    join vaga v on v.idvaga = s.fkvaga
    join estacionamento e on e.idestacionamento = v.fkestacionamento
    join shopping sh on sh.idshopping = e.fkshopping
    join usuario u on u.idusuario = sh.fkusuario
    where d.status_vaga = 'Ocupado'
      and u.idusuario = ${idUsuario}
      and date(l.datahora) = curdate()
      and date_format(l.datahora, '%H') = date_format(now(), '%H')

    union all
    
    select 
        date(l.datahora) as dia,
        date_format(l.datahora, '%H:00') as hora, 
        count(distinct l.fkdemandocup) as ocupacao
    from Log l
    join demanda_ocupacional d on l.fkdemandocup = d.iddemandocup
    join sensor s on s.idsensor = d.fksensor
    join vaga v on v.idvaga = s.fkvaga
    join estacionamento e on e.idestacionamento = v.fkestacionamento
    join shopping sh on sh.idshopping = e.fkshopping
    join usuario u on u.idusuario = sh.fkusuario
    where d.status_vaga = 'Ocupado'
      and u.idusuario = ${idUsuario}
      and date(l.datahora) = curdate()
      and hour(l.datahora) between date_format(l.dataHora, '%H') - 5 and HOUR(NOW()) - 1
    group by dia, hora
) as resultado_final
order by dia desc, hora desc
limit 6;
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
        count(distinct l.fkdemandocup) as ocupacao
    from log l
    join demanda_ocupacional d on l.fkdemandocup = d.iddemandocup
    join sensor s on s.idsensor = d.fksensor
    join vaga v on v.idvaga = s.fkvaga
    join estacionamento e on e.idestacionamento = v.fkestacionamento
    join shopping sh on sh.idshopping = e.fkshopping
    join usuario u on u.idusuario = sh.fkusuario
    where d.status_vaga = 'Ocupado'
      and u.idusuario = ${idUsuario}
      and date(l.datahora) = curdate()
      and date_format(l.datahora, '%H') = date_format(now(), '%H')

    union all
    
    select 
        date(l.datahora) as dia,
        date_format(l.datahora, '%H:00') as hora, 
        count(distinct l.fkdemandocup) as ocupacao
    from Log l
    join demanda_ocupacional d on l.fkdemandocup = d.iddemandocup
    join sensor s on s.idsensor = d.fksensor
    join vaga v on v.idvaga = s.fkvaga
    join estacionamento e on e.idestacionamento = v.fkestacionamento
    join shopping sh on sh.idshopping = e.fkshopping
    join usuario u on u.idusuario = sh.fkusuario
    where d.status_vaga = 'Ocupado'
      and u.idusuario = ${idUsuario}
      and date(l.datahora) = curdate()
      and hour(l.datahora) between date_format(l.dataHora, '%H') - 5 and HOUR(NOW()) - 1
    group by dia, hora
) as resultado_final
order by dia desc, hora desc
limit 1;
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

module.exports = {
    ObterDadosKPI3,
    ObterDadosKPI4,
    ObterDadosKPI1,
    ObterDadosKPI2,
    pegarUltimosDadosG1,
    pegarDadosTempoRealG1,
    ObterPiso,
    ObterPosicao
};