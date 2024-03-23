class Sesion{
    constructor(){
        this._listaUsuariosCreados = "listUsers";
        this._usuarioConectado = "currentUser";
    }
    /**
     * 
     */
    getValorSesion(objeto){
        return JSON.parse(sessionStorage.getItem(objeto));
    }
    /**
     * 
     */
    setValorSesion(objeto, valor){
        sessionStorage.setItem(objeto, JSON.stringify(valor));
    }
    /**
     * 
     */
    removeItem(objeto){
        sessionStorage.removeItem(objeto);
    }
}

class Tools{
    checkNumero(texto){
        if(isNaN(texto))
            return false;
        return true;
    }
    /**
     * 
     */
    checkCorreo(){
        return true;
    }
    /**
     * 
     */
    checkPassword(){
        return true;
    }
    /**
     * 
     */
    pintarPopUp(idPopUp, mostrar){
        if(mostrar){
            document.getElementById(idPopUp).style.display = "block";
        } else {
            document.getElementById(idPopUp).style.display = "none";
        }
    }
}

class Usuario{
    constructor(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioContrasena){
        this._nombre = usuarioNombre;
        this._correo = usuarioCorreo;
        this._telefono = usuarioTelefono;
        this._password = usuarioContrasena;
        this._login = false;
    }
    /**
     * 
     */
    getNombre(){
        return this._nombre;
    }
    /**
     * 
     */
    setNombre(nombre){
        this._nombre = nombre;
    }
    /**
     * 
     */
    getCorreo(){
        return this._correo;
    }
    /**
     * 
     */
    setCorreo(correo){
        this._correo = correo;
    }
    /**
     * 
     */
    getTelefono(){
        return this._telefono;
    }
    /**
     * 
     */
    setTelefono(telefono){
        this._telefono = telefono;
    }
    /**
     * 
     */
    getPassword(){
        return this._password;
    }
    /**
     * 
     */
    setPassword(password){
        this._password = password;
    }
    /**
     * 
     */
    getLogin(){
        return this._login;
    }
    /**
     * 
     */
    setLogin(login){
        this._login = login;
    }
}

class PopUpErrores{
    constructor(listaErrores, listaTarget, popTarget){
        this._listaErrores = listaErrores;
        this._listaTarget = listaTarget;
        this._popTarget = popTarget;
        this._html = "";
        this._tool = new Tools();
    }
    /**
     * 
     */
    imprimir(){
        this._listaErrores.forEach((e) => {
            this._html += e;
        });

        document.getElementById(this._listaTarget).innerHTML = this._html;
        this._tool.pintarPopUp(this._popTarget, true);

        setTimeout(() => {
            this._tool.pintarPopUp(this._popTarget, false);
        }, 2000)
    }
}

class PageLogInOptions {
    constructor(){
        this._contrasenaCorrecta = true;
        this._usuario = new Usuario();
        this._tool = new Tools();
        this._session = new Sesion();
    }
    /**
     * 
     */
    ingresar(){
        location.href = "home.html";
    }
    /**
     * 
     */
    cargarDatos(usuarioNombre, usuarioCorreo, usuarioTelefono, usuarioContrasena){
        this._usuarioNombre = usuarioNombre;
        this._usuarioCorreo = usuarioCorreo;
        this._usuarioTelefono = usuarioTelefono;
        this._usuarioPassword = usuarioContrasena;
    }
    /**
     * 
     */
    cargarListaUsuarios(){
        let usuarios = this._session.getValorSesion(this._session._listaUsuariosCreados);
        usuarios.push(this._usuario);
        this._session.setValorSesion(this._session._listaUsuariosCreados, usuarios);
    }
    /**
     * 
     */
    cargarUsuario(){
        this._session.setValorSesion(this._session._usuarioConectado, this._usuario);
    }
    /**
     * 
     */
    addUsuario(){
        this._usuario.setNombre(this._usuarioNombre);
        try{
            this._usuario.setCorreo(this._usuarioCorreo);
            this._usuario.setTelefono(this._usuarioTelefono);
            this._usuario.setPassword(this._usuarioPassword);
        } catch(error){
            this._usuario.setCorreo(null);
            this._usuario.setTelefono(null);
            this._usuario.setPassword(null);
        } finally{
            this._usuario.setLogin(true);
        }
        this.cargarUsuario();
    }
    /**
     * 
     */
    validarFormularioCompleto(){
        let errores = [];
        if(this._usuarioNombre == "" || this._usuarioCorreo == "" || this._usuarioTelefono == "" || this._usuarioPassword == ""){
            errores.push("Los datos son requeridos...");
        } else if(!this._tool.checkCorreo(this._usuarioCorreo)){
            errores.push("Formato correo electronico invalido...");
        } else if(!this._tool.checkNumero(this._usuarioTelefono)){
            errores.push("Formato numero de contacto invalido...");
        } else if(!this._contrasenaCorrecta){
            errores.push("La contraseña no cumple con los requisitos...");
        } 
        if(errores.length > 0){
            const popErrores = new PopUpErrores(errores, "listaErrores", "popUpError");
            popErrores.imprimir();
        } else {
            this.addUsuario();
            this.cargarListaUsuarios();
            this.ingresar();
        }
    }
    /**
     * 
     */
    validarFormularioUnico(){
        let errores = [];
        if(this._usuarioNombre == ""){
            errores.push("Los datos son requeridos...");
            const popErrores = new PopUpErrores(errores, "listaErrores", "popUpError");
            popErrores.imprimir();
        } else {
            this.addUsuario();
            this.ingresar();
        }
    }
    /**
     * 
     */
    conectarCuenta(correoElectronico, password){
        let usuarios = this._session.getValorSesion(this._session._listaUsuariosCreados);
        let usuario = new Usuario();
        let existeUsuario = false;
        usuarios.forEach((element) => {
            if(element._correo == correoElectronico && element._password == password){
                existeUsuario = true;
                usuario = element;
            }
        })
        if(!existeUsuario){
            let errores = [];
            errores.push("No existe ninguna cuenta con estos datos...");
            const popErrores = new PopUpErrores(errores, "listaErrores", "popUpError");
            popErrores.imprimir();
        } else {
            this.cargarDatos(usuario._nombre, usuario._correo, usuario._telefono, usuario.password);
            this.addUsuario();
            this.ingresar();
        }
    }
    /**
     * 
     */
    cerrarCuenta(){
        this._session.removeItem(this._session._usuarioConectado);
        location.href = "index.html";
    }
}