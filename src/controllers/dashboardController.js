var dashboardModel = require("../models/dashboardModel.js");

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
// Gráfico


function pegarUltimosDadosG1(req, res) {
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else {
        dashboardModel.pegarUltimosDadosG1(idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados KPI2: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function pegarDadosTempoRealG1(req, res) {
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else {
        dashboardModel.pegarDadosTempoRealG1(idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function ObterPiso(req, res) {
    
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else {
        dashboardModel.ObterPiso(idUsuario)
        .then(
                function (resposta) {
                    console.log(`Resultados ObterPiso: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function ObterPosicao(req, res) {
    
    var idUsuario = req.params.idUsuario;
    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else {
        dashboardModel.ObterPosicao(idUsuario)
            .then(
                function (resposta) {
                    console.log(`Resultados ObterPosicao: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function pegarUltimosDadosG2(req, res) {
    var idUsuario = req.params.idUsuario;
    var piso = req.params.piso;
    var posicao = req.params.posicao;


    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else  if (posicao == undefined) {
        res.status(400).send("Valor da posicao está undefined!");
    } else  if (piso == undefined) {
        res.status(400).send("Valor do piso está undefined!");
    } {
        dashboardModel.pegarUltimosDadosG2(idUsuario, piso, posicao)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function pegarDadosTempoRealG2(req, res) {
    var idUsuario = req.params.idUsuario;
    var piso = req.params.piso;
    var posicao = req.params.posicao;


    if (idUsuario == undefined) {
        res.status(400).send("Valor do id está undefined!");
    } else  if (posicao == undefined) {
        res.status(400).send("Valor da posicao está undefined!");
    } else  if (piso == undefined) {
        res.status(400).send("Valor do piso está undefined!");
    } {
        dashboardModel.pegarDadosTempoRealG2(idUsuario, piso, posicao)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    if (resposta.length > 0) {
                        res.status(200).json(resposta)
                    }
                    else {
                        res.status(500).send("Nenhum resultado encontrado!")
                    }
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
    ObterDadosKPI2,
    pegarUltimosDadosG1,
    pegarDadosTempoRealG1,
    pegarUltimosDadosG2,
    pegarDadosTempoRealG2,
    ObterPiso,
    ObterPosicao
}