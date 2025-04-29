var nomeUsuario = localStorage.getItem('nome')
var emailUsuario = localStorage.getItem('email')
var spanUsuario = document.getElementById('spanUsuario');

spanUsuario.innerHTML = `Seja bem vindo(a) ${nomeUsuario}`