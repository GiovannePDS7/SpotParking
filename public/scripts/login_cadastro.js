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








