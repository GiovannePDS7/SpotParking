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

function ObterDadosKPI1(req, res) {
    var selectSemana = req.body.selectServer;

    if (selectSemana == undefined) {
        res.status(400).send("Valor do select está undefined!");
    } else {

        dashboardModel.ObterDadosKPI1(selectSemana)
            .then(
                function (resposta) {
                    console.log(`Resultados: ${JSON.stringify(resposta)}`); // transforma JSON em String
                    res.json({
                        id: resposta[0].idUsuario,
                        email: resposta[0].email,
                        nome: resposta[0].nome,
                    });

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


module.exports = {
    ObterDadosKPI1
}