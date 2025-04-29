const btnControlLogin = document.getElementById('ControlLogin');
const btnControlCadastro = document.getElementById('ControlCadastro');
const formLogin = document.getElementById('formLogin');
const formCadastro = document.getElementById('formCadastro');

function ExibirCadastro() {
    btnControlCadastro.style.backgroundColor = '#4E2B06';
    btnControlLogin.style.backgroundColor = '#2E2F2F';
    formLogin.classList.add('d-none');
    formCadastro.classList.remove('d-none');
}
btnControlCadastro.addEventListener('click', ExibirCadastro)

function ExibirLogin() {
    btnControlLogin.style.backgroundColor = '#4E2B06';
    btnControlCadastro.style.backgroundColor = '#2E2F2F';
    formLogin.classList.remove('d-none');
    formCadastro.classList.add('d-none')
}
btnControlLogin.addEventListener('click', ExibirLogin)


// Configurando usuario 

var DadosUsuario = [
    {
        nomeUsuario: 'Mario',
        emailUsuario: 'mario@gmail.com',
        senhaUsuario: '1234'
    }
];

var tentativas = 3;

function ValidarLogin() {
    tentativas--;
    var ipt_email = document.getElementById('inputEmail').value;
    var ipt_senha = document.getElementById('inputSenha').value;

    for (let index = 0; index >= tentativas; index++) {
        EsqSenha.innerHTML = 'Esqueceu a senha?'
        break
    }

    // Verificando se o usuario está cadastrado
    for (let i = 0; i < DadosUsuario.length; i++) {
        if (ipt_email == DadosUsuario[i].emailUsuario && ipt_senha == DadosUsuario[i].senhaUsuario) {
            localStorage.setItem("nome", DadosUsuario[i].nomeUsuario);
            localStorage.setItem("email", DadosUsuario[i].emailUsuario);
            window.location.href = 'principal.html';
            break;
        }
        else if (i == (DadosUsuario.length - 1)) {
            alert("Login inválido");
        }
    }
}

function CadastrarUsuario() {
    var Nome = document.getElementById('inputNome').value;
    var Email = document.getElementById('inputEmailCadastro').value;
    var Senha = document.getElementById('inputSenhaCadastro').value;
    var ConfirmSenha = document.getElementById('inputConfirmarSenha').value;
    var emailCadastrado = false;

    if (Nome != '' && Email != '' && Senha != '' && Senha == ConfirmSenha) {

        for (let i = 0; i < DadosUsuario.length; i++) {
            if (DadosUsuario[i].emailUsuario == Email) {
                alert("email já cadastrado")
                emailCadastrado = true;
                break;
            }
        }
        if (!emailCadastrado) {
            dadosCadastro = {
                nomeUsuario: Nome,
                emailUsuario: Email,
                senhaUsuario: Senha
            }

            DadosUsuario.push(dadosCadastro)
            alert("Cadastro efetuado")
            ExibirLogin();
        }
    }
    else {
        alert('Dados inválidos')
    }
}
