"use strict"
function bajaBD(heroeBD,idJugador){
    idJugador = parseInt(idJugador);
    console.log(idJugador);
    if(heroeBD == 'si'){
        $.ajax({
            url: "ajax/bajaHeroe.php",
            data: "idJug=" + JSON.stringify(idJugador),
            cache: false,
            async: true, // por defecto
            method: "POST",
            success: respuestaBajaHeroe
        });
    }
    $.ajax({
        url: "ajax/bajaJugador.php",
        data: "id=" + JSON.stringify(idJugador),
        cache: false,
        async: true, // por defecto
        method: "POST",
        success: respuestaBajaJugador
    });
}

function respuestaBajaHeroe(oDatos, sStatus, oXHR){
    let datos = JSON.parse(oDatos);
    if(datos["error"]){
        alert(datos["mensaje"]);
    }else{
        alert(datos["mensaje"]);
    }
}

function respuestaBajaJugador(oDatos, sStatus, oXHR){
    let datos = JSON.parse(oDatos);
    if(datos["error"]){
        alert(datos["mensaje"]);
    }else{
        alert(datos["mensaje"]);
    }

}