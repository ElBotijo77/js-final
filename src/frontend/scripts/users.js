//SIN IMPORTAR AHORA MISMO
function formulario () {
    const inputUsuario = document.getElementById('usuario');
    const tarjeta = document.getElementById('loginCard');

    if (inputUsuario && tarjeta) {
        inputUsuario.addEventListener('focus', () => {
            tarjeta.classList.add('tarjeta-foco');
        });

        inputUsuario.addEventListener('blur', () => {
            tarjeta.classList.remove('tarjeta-foco');
        });
    }
};
