/**
 * 
 */
const usuarioConectado = sesion.getValorSesion(sesion._usuarioConectado);
const listaTareas = sesion.getValorSesion(sesion._listaTareas);
const tareasUsuarioConectado = [];
let consecutivoTarea = -1;
let tareaSeleccionada = new Tarea();
const listaComentarios = document.getElementById("listaComentarios");
/**
 * 
 */
for(let i = 0; i < listaTareas.length; i++){
    let usuario = listaTareas[i]._usuario;
    if(usuario._nombre == usuarioConectado._nombre){
        tareasUsuarioConectado.push(listaTareas[i]._tarea);
    }
}
/**
 * 
 */
const cargarFront = (tareaUsuarioConectado) => {
    let htmlBackgroundColor = '<div style="background-color: ' + tareaUsuarioConectado._portada + ';"></div>';
    let htmlTituloFront = '<h3>' + tareaUsuarioConectado._titulo + '</h3>';
    let htmlFechaFront = '<h3>' + tareaUsuarioConectado._fecha + '</h3>';
    let htmlFront =  htmlBackgroundColor + htmlTituloFront + htmlFechaFront;
    return '<div class="lista-tareas-front">'+htmlFront+'</div>';
}
/**
 * 
 */
const cargarBack = (tareaUsuarioConectado) => {
    let htmlDescripcion = '<h3>' + tareaUsuarioConectado._descripcion +'</h3>';
    let htmlEtiquetas = '<div><ol class="lista-tareas-back-etiquetas">';
    for(let j=0; j < tareaUsuarioConectado._etiquetas.length; j++){
        htmlEtiquetas += '<li>' + tareaUsuarioConectado._etiquetas[j] +'</li>';
    }
    htmlEtiquetas += '</ol></div>'
    let htmlBack = htmlDescripcion + htmlEtiquetas;
    return '<div class="lista-tareas-back">'+htmlBack+'</div>';
}
/**
 * 
 */
for(let i=0; i < tareasUsuarioConectado.length; i++){
    document.getElementById("listaTareas").innerHTML += 
    '<li class="tarjeta-front-back cursor-pointer" onclick="seleccionarTarea('+i+')">'
        +cargarFront(tareasUsuarioConectado[i]) + cargarBack(tareasUsuarioConectado[i])
    +'</li>';
}
/**
 * 
 */
const cargarListaComentarios = (comentario) => {
    listaComentarios.innerHTML += '<li>' + comentario + '</li>';
}
/**
 * 
 */
const cargarComentariosTarea = (listaComentarios) => {    
    for(let i = 0; i < listaComentarios.length; i++){
        cargarListaComentarios(listaComentarios[i]);
    }
}
/**
 * 
 */
const seleccionarTarea = (idTarea) => {
    consecutivoTarea = idTarea;
    tareaSeleccionada = tareasUsuarioConectado[consecutivoTarea];
    listaComentarios.innerHTML = "";
    cargarComentariosTarea(tareaSeleccionada._comentarios);
    document.getElementById("tituloTarea").innerHTML = tareaSeleccionada._titulo;
}
/**
 * 
 */
document.getElementById("agregarComentario").addEventListener("change", () => {
    if(consecutivoTarea!=-1){
        cargarListaComentarios(event.target.value);
        tareaSeleccionada._comentarios.push(event.target.value);
        for(let i = 0; i < listaTareas.length; i++){
            if(listaTareas[i]._id == tareaSeleccionada._id){
                listaTareas[i]._comentarios.push(event.target.value)
            }
        }
        sesion.setValorSesion(sesion._listaTareas, listaTareas);
        event.target.value = "";
    }
})
/**
 * 
 */
const tituloTareaHoras = document.getElementById("tituloTareaHoras");
const tituloTareaMinutos = document.getElementById("tituloTareaMinutos");
const tituloTareaSegundos = document.getElementById("tituloTareaSegundos");
const tituloTareaHorasN = document.getElementById("tituloTareaHorasN");
const tituloTareaMinutosN = document.getElementById("tituloTareaMinutosN");
const tituloTareaSegundosN = document.getElementById("tituloTareaSegundosN")
let segundos = 0,segundosN = 0;
let minutos = 0, minutosN = 0;
let horas = 0, horasN = 0;
const cuentaPositiva = () => {
    tituloTareaSegundos.innerHTML = '<p>'+(++segundos)+'</p>';
    if(segundos == 60){
        segundos = 0;
        tituloTareaMinutos.innerHTML = '<p>'+(++minutos)+'</p>';
    }
    if(minutos == 60){
        minutos = 0;
        tituloTareaHoras.innerHTML = '<p>'+(++horas)+'</p>';
    }
}
const cuentaNegativa = () => {
    tituloTareaSegundosN.innerHTML = '<p>'+(++segundosN)+'</p>';
    if(segundosN == 60){
        segundosN = 0;
        tituloTareaMinutosN.innerHTML = '<p>'+(++minutosN)+'</p>';
    }
    if(minutosN == 60){
        minutosN = 0;
        tituloTareaHorasN.innerHTML = '<p>'+(++horasN)+'</p>';
    }    
}
document.getElementById("btnIniciarPomodoro").addEventListener("click", () => {
    if(consecutivoTarea!=-1){
        let iniciarRelojExterno = setInterval( () => {
            cuentaPositiva();
            if(minutos > 0 && minutos%15 == 0){
                clearInterval(iniciarRelojExterno);
                const iniciarRelojInterno = setInterval(function relojSecundario(){
                    cuentaNegativa();
                    if(minutosN == 5){
                        clearInterval(iniciarRelojInterno);
                        iniciarRelojExterno = setInterval(cuentaPositiva, 1000);
                    }
                }, 1000);
            }
        }, 1000);
    }
})