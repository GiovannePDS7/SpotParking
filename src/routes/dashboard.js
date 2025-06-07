var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     usuarioController.cadastrar(req, res);
// })

router.post("/ObterDadosKPI1", function (req, res) {
    dashboardController.ObterDadosKPI1(req, res);
})
router.post("/ObterDadosKPI2", function (req, res) {
    dashboardController.ObterDadosKPI2(req, res);
})
router.post("/ObterDadosKPI3", function (req, res) {
    dashboardController.ObterDadosKPI3(req, res);
})
router.post("/ObterDadosKPI4", function (req, res) {
    dashboardController.ObterDadosKPI4(req, res);
})

// Gráfico

router.get("/pegarUltimosDadosG1/:idUsuario", function (req, res) {
    dashboardController.pegarUltimosDadosG1(req, res);
})
router.get("/tempo-realG1/:idUsuario", function (req, res) {
    dashboardController.pegarDadosTempoRealG1(req, res);
})
router.get("/ObterPiso/:idUsuario", function (req, res) {
    dashboardController.ObterPiso(req, res);
})
router.get("/ObterPosicao/:idUsuario", function (req, res) {
    dashboardController.ObterPosicao(req, res);
})
module.exports = router;