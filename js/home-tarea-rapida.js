/**
 * 
 */
document.getElementById("atributoPortada").addEventListener("change", () => {
    document.getElementById("colorPortada").style.backgroundColor = event.target.value;
})
/**
 * 
 */
const listadoUsuarios = sesion.getValorSesion(sesion._listaUsuariosCreados);
let listadoMiembros = "";
for(let i = 0; i < listadoUsuarios.length; i++){
    listadoMiembros += '<li onclick="agregarMiembro(&apos;'+listadoUsuarios[i]._abrv+'&apos;)">' + listadoUsuarios[i]._abrv + '</li>';
}
document.getElementById("atributosListadosMiembros").innerHTML = listadoMiembros;
/**
 * 
 */
const agregarMiembro = (miembro) => {
    document.getElementById("listaMiembrosSeleccionados").innerHTML += '<li>' + miembro + '</li>'; 
}
/**
 * 
 */
const cargarListadoEtiquetas = () => {
    const listadoEtiquetas = sesion.getValorSesion(sesion._listaEtiquetas);
    let listaEtiquetas = ""
    for(let i=0; i < listadoEtiquetas.length; i++){
        listaEtiquetas += '<li onclick="agregarEtiqueta(&apos;'+listadoEtiquetas[i]._nombre+'&apos;)">' + listadoEtiquetas[i]._nombre + '</li>';
    }
    document.getElementById("atributosListadosEtiquetas").innerHTML = listaEtiquetas;
}
cargarListadoEtiquetas();

const agregarEtiqueta = (etiqueta) => {
    document.getElementById("listaEtiquetasSeleccionadas").innerHTML += '<li>' + etiqueta + '</li>'; 
}
/**
 * 
 */
document.getElementById("nuevaEtiqueta").addEventListener("change", () => {
    const listadoEtiquetas = sesion.getValorSesion(sesion._listaEtiquetas);
    listadoEtiquetas.push(new Etiquetas(event.target.value));
    sesion.setValorSesion(sesion._listaEtiquetas, listadoEtiquetas);
    cargarListadoEtiquetas();
})