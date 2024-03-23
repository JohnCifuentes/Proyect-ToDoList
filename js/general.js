if(sesion.getValorSesion(sesion._listaUsuariosCreados).length == 0){
    const usuarioAdmin = new Usuario("John A. Cifuentes Murillo", "johncifuentes97@gmail.com", "3232337553", "1094Jo962H750n&.");
    const listaUsuarios = [];
    listaUsuarios.push(usuarioAdmin);
    sesion.setValorSesion(sesion._listaUsuariosCreados, listaUsuarios);
}


if(sesion.getValorSesion(sesion._usuarioConectado) === null){
    btnCerrarSesion.style.display = "none";
    btnCrearUsuario.style.display = "flex";
} else {
    btnCerrarSesion.style.display = "flex";
    btnCrearUsuario.style.display = "none";
}

const listaLimpiar = document.getElementsByClassName("btn-limpiar");
for(let i = 0; i < listaLimpiar.length; i++){
    listaLimpiar[i].addEventListener("click", (event) => {
        let idCampoInput = event.target.id;
        idCampoInput = idCampoInput.substring(idCampoInput.length, 3).trim();
        idCampoInput = idCampoInput.charAt(0).toLowerCase() + idCampoInput.slice(1);
        document.getElementById(idCampoInput).value = "";
    });
}


document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    pageLogInOptions.cerrarCuenta();
})