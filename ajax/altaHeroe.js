"use strict"

let heroeGuardado = getStorage('heroeBD');

if(heroeGuardado == undefined || heroeGuardado == null){
    localStorage.setItem('heroeBD','no')
}
getIdJugador();

function altaHeroe(nvl,vida,mana,ataque,velocidad,exp,ptosAtrib){
    let idjugador = getStorage('idJugador');
    let heroeGuardado = getStorage('heroeBD');
    var oHeroe = {
        id:idjugador,
        nivel:nvl,
        vd:vida,
        mn:mana,
        atq:ataque,
        vl:velocidad,
        xp:exp,
        ptos:ptosAtrib
    }

    var sParametros = "heroe=" + JSON.stringify(oHeroe);

    if(heroeGuardado == 'si'){

        $.get("ajax/updateHeroe.php",sParametros, procesoRespuestaUpdateHeroe, "json");
    }else{
        localStorage.setItem('heroeBD','si');
        $.get("ajax/altaHeroe.php", sParametros, procesoRespuestaAltaHeroe, "json");
    }
    


}

function procesoRespuestaUpdateHeroe(oDatos,sStatus,oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
    }
}

function procesoRespuestaAltaHeroe(oDatos, sStatus, oXHR){
    if(oDatos.error){
        alert(oDatos.mensaje);
    }else{
        alert(oDatos.mensaje);
    }
}

function getIdJugador(){
    let nombreJug = getStorage('jugador');

    
    $.ajax({
        url: "ajax/getIdJugador.php",
        type: "GET",
        async: true,
        data: ("nombre=" + nombreJug),
        dataType: "text",
        //success: respuestaJson2
    }).done(IdJugador);

}

function IdJugador(data, status, oXHR){

    localStorage.setItem('idJugador',data);
}