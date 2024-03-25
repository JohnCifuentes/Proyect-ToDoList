const usuarioConectado = sesion.getValorSesion(sesion._usuarioConectado);
const tareasUsuarioConectado = [];
const listaTareas = sesion.getValorSesion(sesion._listaTareas);
for(let i = 0; i < listaTareas.length; i++){
    let usuario = listaTareas[i]._usuario;
    if(usuario._nombre == usuarioConectado._nombre){
        tareasUsuarioConectado.push(listaTareas[i]._tarea);
    }
}

const cargarFront = (tareaUsuarioConectado) => {
    let htmlBackgroundColor = '<div style="background-color: ' + tareaUsuarioConectado._portada + ';"></div>';
    let htmlTituloFront = '<h3>' + tareaUsuarioConectado._titulo + '</h3>';
    let htmlFechaFront = '<h3>' + tareaUsuarioConectado._fecha + '</h3>';
    let htmlFront =  htmlBackgroundColor + htmlTituloFront + htmlFechaFront;
    return '<div class="lista-tareas-front">'+htmlFront+'</div>';
}

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

for(let i=0; i < tareasUsuarioConectado.length; i++){
    document.getElementById("listaTareas").innerHTML += 
    '<li class="tarjeta-front-back cursor-pointer" id="'+i+'">'
        +cargarFront(tareasUsuarioConectado[i]) + cargarBack(tareasUsuarioConectado[i])
    +'</li>';
}