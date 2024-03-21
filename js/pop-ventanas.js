const popUp = (idPopUp, mostrar) => {
    if(mostrar){
        document.getElementById(idPopUp).style.display = "block";
    } else {
        document.getElementById(idPopUp).style.display = "none";
    }
}

document.getElementById("btnCrearUsuario").addEventListener("click", () => {  
    popUp("popCrearUsuario", true);

})

document.getElementById("closePopUp").addEventListener("click", () => {
    popUp("popCrearUsuario", false);
})

