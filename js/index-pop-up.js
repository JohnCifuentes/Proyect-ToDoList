btnCrearUsuario.addEventListener("click", () => {  
    tool.pintarPopUp("popCrearUsuario", true);

})

btnIncognito.addEventListener("click", () => {
    tool.pintarPopUp("popSesionUnica", true);
})














closePopUpSesionUnico.addEventListener("click", () => {
    tool.pintarPopUp("popSesionUnica", false);    
})

closePopUpCrearUsuario.addEventListener("click", () => {
    tool.pintarPopUp("popCrearUsuario", false);  
})