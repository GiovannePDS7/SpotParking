var dashboardModel = require("../models/dashboardModel.js");

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);
//                         res.json({
//                             id: resultadoAutenticar[0].idUsuario,
//                             email: resultadoAutenticar[0].email,
//                             nome: resultadoAutenticar[0].nome,
//                         });
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function ObterDadosKPI3(req, res) {
    var Semana = req.body.selectSemanaServer;
    var Periodo = req.body.selectPeriodoServer;
    var idUsuario = req.body.idUsuario;
    
    if (Semana == undefined) {
        res.status(400).send("Valor do select está undefined!");
    } else if (Periodo == undefined) {
        res.status(400).send("Valor do periodo está undefined!");
    } else {

        dashboardModel.ObterDadosKPI3(Periodo, Semana, idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String

                    res.json({
                        diaSemana: resposta[0].dia_semana,
                        totalEntradas: resposta[0].total_entradas,
                    });

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function ObterDadosKPI4(req, res) {
    var Semana = req.body.selectSemanaServer;
    var Periodo = req.body.selectPeriodoServer;
    var idUsuario = req.body.idUsuario;
    if (Semana == undefined) {
        res.status(400).send("Valor do select está undefined!");
    } else if (Periodo == undefined) {
        res.status(400).send("Valor do periodo está undefined!");
    } else {

        dashboardModel.ObterDadosKPI4(Periodo, Semana, idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String

                    res.json({
                        diaSemana: resposta[0].dia_semana,
                        totalEntradas: resposta[0].total_entradas,
                    });

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function ObterDadosKPI1(req, res) {
    var Semana = req.body.selectSemanaServer;
    var Periodo = req.body.selectPeriodoServer;
    var idUsuario = req.body.idUsuario;
    if (Semana == undefined) {
        res.status(400).send("Valor do select está undefined!");
    } else if (Periodo == undefined) {
        res.status(400).send("Valor do periodo está undefined!");
    } else {

        dashboardModel.ObterDadosKPI1(Periodo, Semana, idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados KPI1: ${JSON.stringify(resposta)}`); // transforma JSON em String

                    res.json({
                        diaSemana: resposta[0].dia_semana,
                        horario: resposta[0].horario,
                        totalOcupacao: resposta[0].total_ocupacoes,
                    });

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function ObterDadosKPI2(req, res) {
    var Semana = req.body.selectSemanaServer;
    var Periodo = req.body.selectPeriodoServer;
    var idUsuario = req.body.idUsuario;
    if (Semana == undefined) {
        res.status(400).send("Valor do select está undefined!");
    } else if (Periodo == undefined) {
        res.status(400).send("Valor do periodo está undefined!");
    } else {

        dashboardModel.ObterDadosKPI2(Periodo, Semana, idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados KPI2: ${JSON.stringify(resposta)}`); // transforma JSON em String

                    res.json({
                        diaSemana: resposta[0].dia_semana,
                        horario: resposta[0].horario,
                        totalOcupacao: resposta[0].total_ocupacoes,
                    });

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    ObterDadosKPI3,
    ObterDadosKPI4,
    ObterDadosKPI1,
    ObterDadosKPI2
}