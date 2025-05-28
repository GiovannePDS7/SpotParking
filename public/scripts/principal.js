window.onload = function () {
    validarSessao();

    const seta = document.getElementById("setalIcon");
    const container = document.getElementById("containerFerramentas");

    seta.addEventListener("click", function () {
        container.classList.toggle("ativo");
    });
};