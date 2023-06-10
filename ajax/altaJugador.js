"use strict"

function validarAltaJugador(nombreJug,emailJug){
    let sErrores = "";
    let bValido = true; // en principio el formulario es válido

    // Validación de todos los campos
    let sNombrJug = nombreJug;
    let sEmailJug = emailJug;

    if(sNombrJug == ""){
    	sErrores += "\nDebe añadir un nombre de jugador";
    	bValido = false;
    }
    if(sEmailJug == ""){
        sErrores += "\nDebe añadir un email";
        bValido = false;
    }

    if(!bValido){
    	alert(sErrores);
    }else{
    	altaJugador(nombreJug,emailJug);
    }
}


function altaJugador(nombreJug,emailJug){
    var oJugador = {
        nombre:  nombreJug.trim(),
        email: emailJug.trim()
    };
    var sParametros = "datosJugador=" + JSON.stringify(oJugador);
    $.post("ajax/altaJugador.php", sParametros, procesoRespuestaAltaJugador, "json");
}

function procesoRespuestaAltaJugador(oDatos, sStatus, oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
        getIdJugador();
    }
}
