if(sesion.getValorSesion(sesion._listaUsuariosCreados) == null || sesion.getValorSesion(sesion._listaUsuariosCreados).length == 0){
    const listaUsuarios = [];
    const usuarioAdmin = new Usuario("John A. Cifuentes Murillo", "JACM", "johncifuentes97@gmail.com", "3232337553", "1094Jo962H750n&.");
    listaUsuarios.push(usuarioAdmin);
    sesion.setValorSesion(sesion._listaUsuariosCreados, listaUsuarios);
}

if(sesion.getValorSesion(sesion._listaEtiquetas) == null || sesion.getValorSesion(sesion._listaEtiquetas).length == 0){
    const listaEtiquetas = [];
    listaEtiquetas.push(new Etiquetas("Prioridad A"));
    listaEtiquetas.push(new Etiquetas("Prioridad B"));
    listaEtiquetas.push(new Etiquetas("Prioridad C"));
    sesion.setValorSesion(sesion._listaEtiquetas, listaEtiquetas);
}

if(sesion.getValorSesion(sesion._usuarioConectado) === null){
    btnUsuario.style.display = "none";
    btnCerrarSesion.style.display = "none";
    btnCrearUsuario.style.display = "flex";
} else {
    btnUsuario.style.display = "flex";
    btnCerrarSesion.style.display = "flex";
    btnCrearUsuario.style.display = "none";
    let usuario = sesion.getValorSesion(sesion._usuarioConectado);
    document.getElementById("nombreUsuarioLogeado").innerHTML = "Bienvenid@ " + usuario._nombre;
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

btnCerrarSesion.addEventListener("click", () => {
    pageLogInOptions.cerrarCuenta();
})

btnUsuario.addEventListener("click", () => {
    event.preventDefault();
    location.href = "home.html";
})