document.getElementById("crearPopUpCrearUsuario").addEventListener("click", () => {
    pageLogInOptions.cargarDatos(
        document.getElementById("popCrearUsuarioNombre").value,
        document.getElementById("popCrearUsuarioCorreo").value,
        document.getElementById("popCrearUsuarioTelefono").value,
        document.getElementById("popCrearUsuarioContrasena").value
    );
    pageLogInOptions.validarFormularioCompleto();
})

document.getElementById("crearPopUpSesionUnicio").addEventListener("click", () => {
    pageLogInOptions.cargarDatos(document.getElementById("popSesionUnicoNombre").value, null, null, null);
    pageLogInOptions.validarFormularioUnico();
})

document.getElementById("btnCuenta").addEventListener("click", () => {
    event.preventDefault();
    pageLogInOptions.conectarCuenta(document.getElementById("loginCorreoUsuario").value, document.getElementById("loginPasswordUsuario").value);
})