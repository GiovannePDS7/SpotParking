var database = require("../database/config")

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT idUsuario, nome, email FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }
function ObterDadosKPI1(selectSemana) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
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
    and l.dataHora >= curdate() - interval (7 * ${selectSemana}) day
    and u.idUsuario = 1
group by dia_semana
order by total_entradas desc
limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    ObterDadosKPI1
};