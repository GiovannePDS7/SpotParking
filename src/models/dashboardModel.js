const res = require("express/lib/response")
var database = require("../database/config")

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT idUsuario, nome, email FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }
async function ObterDadosKPI3(Periodo, Semana) {
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
    count(*) as total_entradas
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
    and u.idUsuario = 1
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

async function ObterDadosKPI4(Periodo, Semana) {
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
    count(*) as total_entradas
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
    and u.idUsuario = 1
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


module.exports = {
    ObterDadosKPI3,
    ObterDadosKPI4
};