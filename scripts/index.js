var header = document.querySelector('header');

function SaiuTopo(){
    var alturaJanela = window.scrollY > 0;
    if(alturaJanela){
        header.style.backgroundColor = '#000';
    }
    else{
        header.style.backgroundColor = 'transparent';
    }
}

addEventListener('scroll', SaiuTopo)

var Missao = document.getElementById('Missao');
var aMissao = document.getElementById('aMissao');

aMissao.addEventListener('click', function (){
    Missao.scrollIntoView({ block: "center", behavior: "smooth" });;
})

var Inicio = document.getElementById('apresentacao');
var aInicio = document.getElementById('aInicio');

aInicio.addEventListener('click', function (){
    Inicio.scrollIntoView({ block: "center", behavior: "smooth" });;
})

var QmSomos = document.getElementById('QmSomos');
var aQmSomos = document.getElementById('aQmSomos');
var aSBMais = document.getElementById('aSBMais');

aQmSomos.addEventListener('click', function (){
    QmSomos.scrollIntoView({ block: "center", behavior: "smooth" });;
})
aSBMais.addEventListener('click', function (){
    QmSomos.scrollIntoView({ block: "center", behavior: "smooth" });;
})

var Contato = document.getElementById('Contato');
var aContato = document.getElementById('aContato');

aContato.addEventListener('click', function (){
    Contato.scrollIntoView({ block: "center", behavior: "smooth" });;
})

