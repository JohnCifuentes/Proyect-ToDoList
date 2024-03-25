let atributoPortada = "white";
const colorPortada = document.getElementById("colorPortada");
const miembros = [];
const etiquetas = [];
const comentarios = [];
const atributoFechas = document.getElementById("atributoFechas");
const tituloTarea = document.getElementById("tituloTarea");
const descripcionTarea = document.getElementById("descripcionTarea");
/**
 * 
 */
const usuarioConectado = sesion.getValorSesion(sesion._usuarioConectado);
const listaMiembrosSeleccionados = document.getElementById("listaMiembrosSeleccionados");
const listaEtiquetasSeleccionadas = document.getElementById("listaEtiquetasSeleccionadas");
const atributosListadosMiembros = document.getElementById("atributosListadosMiembros");
const atributosListadosEtiquetas = document.getElementById("atributosListadosEtiquetas");
const listaComentarios = document.getElementById("listaComentarios");
/**
 * 
 */
const tarea = new Tarea();
/**
 * Ajuste cambio color portada
 */
const cambioColorPortada = (valor) => {
    colorPortada.style.backgroundColor = valor;
}
/**
 * Agregar miembro a la tarea
 */
const agregarMiembro = (miembro) => {
    listaMiembrosSeleccionados.innerHTML += '<li>' + miembro + '</li>';
    miembros.push(miembro);
}
agregarMiembro(usuarioConectado._abrv);
/**
 * Agregar etiqueta a la tarea
 */
const agregarEtiqueta = (etiqueta) => {
    listaEtiquetasSeleccionadas.innerHTML += '<li>' + etiqueta + '</li>'; 
    etiquetas.push(etiqueta);
}
/**
 * Agregar comentario a la tarea
 */
const agregarComentario = (comentario) => {
    listaComentarios.innerHTML += '<li>' + comentario + '</li>';
    comentarios.push(comentario);
}
/**
 * 
 * @returns lista de los usuarios creados.
 */
const listadoUsuarios = () => {
    let lista = "";
    const listaUsuariosCreados = sesion.getValorSesion(sesion._listaUsuariosCreados);
    for(let i = 0; i < listaUsuariosCreados.length; i++){
        lista += '<li onclick="agregarMiembro(&apos;'+listaUsuariosCreados[i]._abrv+'&apos;)">'+listaUsuariosCreados[i]._abrv+'</li>';
    }
    return lista;
}
atributosListadosMiembros.innerHTML = listadoUsuarios();
/**
 * 
 * @returns lista de las etiquetas creadas
 */
const listadoEtiquetas = () => {
    let lista = "";
    const listadoEtiquetasCreadas = sesion.getValorSesion(sesion._listaEtiquetas);
    for(let i=0; i < listadoEtiquetasCreadas.length; i++){
        lista += '<li onclick="agregarEtiqueta(&apos;'+listadoEtiquetasCreadas[i]._nombre+'&apos;)">' + listadoEtiquetasCreadas[i]._nombre + '</li>';
    }
    return lista;
}
/**
 * Carga lista de etiquetas
 */
const cargarListadoEtiquetas = () => {
    atributosListadosEtiquetas.innerHTML = listadoEtiquetas();
}
cargarListadoEtiquetas();
/**
 * 
 */
document.getElementById("nuevaEtiqueta").addEventListener("change", () => {
    const listadoEtiquetasCreadas = sesion.getValorSesion(sesion._listaEtiquetas);
    listadoEtiquetasCreadas.push(new Etiquetas(event.target.value));
    sesion.setValorSesion(sesion._listaEtiquetas, listadoEtiquetasCreadas);
    cargarListadoEtiquetas();
})
/**
 * 
 */
document.getElementById("atributoPortada").addEventListener("change", () => {
    cambioColorPortada(event.target.value);
    atributoPortada = event.target.value;
})
/**
 * 
 */
document.getElementById("comentarioTarea").addEventListener("change", () => {
    agregarComentario(event.target.value);
    event.target.value = "";
})
/**
 * 
 */
document.getElementById("btnCancelar").addEventListener("click", () => {
    event.preventDefault();
    location.href = "home-tarea-rapida.html";
})
/**
 * 
 */
document.getElementById("btnAgregar").addEventListener("click", () => {
    event.preventDefault();
    tarea.validarFormulario(tituloTarea.value, descripcionTarea.value);
    if(tarea._correcto){
        tarea.cargarDatos(
            atributoPortada,
            miembros,
            etiquetas,
            atributoFechas.value,
            tituloTarea.value,
            descripcionTarea.value,
            comentarios
        );
        const usuarioTareas = new UsuarioTareas(usuarioConectado, tarea);
        const listaTareas = sesion.getValorSesion(sesion._listaTareas);
        listaTareas.push(usuarioTareas);
        sesion.setValorSesion(sesion._listaTareas, listaTareas);
        location.href = "home-tarea-rapida.html";
    }
})