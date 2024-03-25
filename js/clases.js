class Sesion{
    constructor(){
        this._listaTareasUsuario = "listTasksUser";
        this._listaUsuariosCreados = "listUsers";
        this._listaEtiquetas = "listTags";
        this._listaTareas = "listTask"
        this._usuarioConectado = "currentUser";
        this._consecutivoTarea = "idTask";
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
    constructor(usuarioNombre, abrv, usuarioCorreo, usuarioTelefono, usuarioContrasena){
        this._nombre = usuarioNombre;
        this._abrv = abrv;
        this._correo = usuarioCorreo;
        this._telefono = usuarioTelefono;
        this._password = usuarioContrasena;
        this._login = false;
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
    setCorreo(correo){
        this._correo = correo;
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
    setPassword(password){
        this._password = password;
    }
    /**
     * 
     */
    setLogin(login){
        this._login = login;
    }
    /**
     * 
     */
    setAbrv(abrv){
        this._abrv = abrv;
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
            this._html += "<li>"+e+"</li>";
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

        const nombreAbrev = this._usuarioNombre.split(" ");
        let abrv = "";
        for(let i = 0; i < nombreAbrev.length; i++){
            abrv += nombreAbrev[i].charAt(0);
        }
        this._usuario.setAbrv(abrv);

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
        const errores = [];
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
        const errores = [];
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
            const errores = [];
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

class Etiquetas{
    constructor(nombre){
        this._nombre = nombre;
    }
}

class Tarea{
    constructor(){
        this._portada = "white";
        this._miembros = [];
        this._etiquetas = [];
        this._fecha = null;
        this._titulo = null;
        this._descripcion = null;
        this._comentarios = [];
        this._correcto = false;
    }
    /**
     * 
     */
    validarFormulario(titulo, descripcion){
        const errores = [];
        if(titulo == ""){
            errores.push("Debes ingresar un titulo");
        } 
        if(descripcion == ""){
            errores.push("Debes ingresar una descripcion");
        }
        if(errores.length > 0){
            const popErrores = new PopUpErrores(errores, "listaErrores", "popUpError");
            popErrores.imprimir();
            this._correcto = false;
        } else {
            this._correcto = true;
        }
    }
    /**
     * 
     */
    cargarDatos(portada, miembros, etiquetas, fecha, titulo, descripcion, comentarios, consecutivo){
        this._portada = (portada==null||portada=="")? "white":portada;
        this._miembros = miembros;
        this._etiquetas = etiquetas;
        this._fecha = fecha;
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._comentarios = comentarios;
        this._id = consecutivo;
    }
}

class UsuarioTareas{
    constructor(usuario, tarea){
        this._usuario = usuario;
        this._tarea = tarea;
    }
    getPortada(){
        return this._tarea._portada;
    }
    getTituloTarea(){
        return this._tarea._titulo;
    }
    getFechaTarea(){
        return this._tarea._fecha;
    }
}