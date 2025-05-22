function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    if (email == null || nome == null) {
        window.location = "../pages/login_cadastro.html";
    }
    else {
        GetUsuarioNome(nome);
    }
}

function GetUsuarioNome(nome) {
    var [primeiroNome] = nome.split(' ');
    if (nome != null) {
        spanUsuario.innerHTML = 'Seja Bem-Vindo(a) ' + primeiroNome;
    }
}
function limparSessao() {
    sessionStorage.clear();
    window.location = "../pages/login_cadastro.html";
}
