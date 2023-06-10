//document.cookie = 'jugador='+document.getElementById('inputNombreJugador').value+'; expires=Mon, 1 Jan 2024 00:00:00 UTC';

function checkStorage() {
    let jugador = getStorage('jugador');
    let nvlHeroe = getStorage('nivel');
    let email = getStorage('email');

    if ((jugador != "" && jugador != null && jugador != undefined) && (email != "" && email != null && email != undefined)) {
        document.getElementById('inputNombreJugador').setAttribute('placeholder', 'Bienvenido ' + jugador);
        document.getElementById('inputNombreJugador').setAttribute('readonly', '');
        document.getElementById('inputEmailJugador').setAttribute('placeholder',email);
        document.getElementById('inputEmailJugador').setAttribute('readonly','');
        document.getElementById('btnInicio').innerHTML = 'Continuar Aventura';
    } else {
        setStorage(jugador,email);
    }
    if(nvlHeroe != null && nvlHeroe != "" && nvlHeroe != undefined){
        getStorageHeroe();
    }
}

function getStorage(vNombre) {
    let nombre = localStorage.getItem(vNombre);

    if (nombre != " " || nombre != null) {
        return nombre;
    } else {
        return "";
    }


}

function setStorage(njugador,email) {
    if (njugador != "" && njugador != null && njugador != undefined) {
        localStorage.setItem('jugador', njugador);
        localStorage.setItem('email',email);
        validarAltaJugador(njugador,email);
    }else{
        alert('Nombre no valido');
    }
}

function setStorageHeroe(heroe){
    localStorage.setItem('nivel',heroe.nivel);
    localStorage.setItem('vidaMax',heroe.vidaMax);
    localStorage.setItem('manaMax',heroe.manaMax);
    localStorage.setItem('ataque',heroe.ataque);
    localStorage.setItem('velocidad',heroe.velocidad);
    localStorage.setItem('exp',heroe.exp);
    localStorage.setItem('ptosAtrib',heroe.ptosAtrb);

    altaHeroe(heroe.nivel,heroe.vidaMax,heroe.manaMax,heroe.ataque,heroe.velocidad,heroe.exp,heroe.ptosAtrb);
    
}
function getStorageHeroe(){
    let heroeNvl = localStorage.getItem('nivel')
    let heroeVd = localStorage.getItem('vidaMax')
    let heroeMn = localStorage.getItem('manaMax')
    let heroeA = localStorage.getItem('ataque')
    let heroeV = localStorage.getItem('velocidad')
    let heroeExp = localStorage.getItem('exp')
    let heroeAtrb = localStorage.getItem('ptosAtrib');

    
    player.nivel = parseFloat(heroeNvl);
    player.vidaMax = parseFloat(heroeVd);
    player.vida = parseFloat(heroeVd);
    player.manaMax = parseFloat(heroeMn);
    player.mana = parseFloat(heroeMn);
    player.ataque = parseFloat(heroeA);
    player.velocidad = parseFloat(heroeV);
    player.exp = parseFloat(heroeExp);
    player.ptosAtrb = parseFloat(heroeAtrb);
}

function bajaStorage(){

    let idjugador = getStorage('idJugador');
    let heroeBD = getStorage('heroeBD');
    
    if(idjugador == undefined && heroeBD == 'no'){
        alert('No hay ningun jugador ni heroe registrados');
        return;
    }

    localStorage.removeItem('jugador');
    localStorage.removeItem('email');
    localStorage.removeItem('nivel');
    localStorage.removeItem('vidaMax');
    localStorage.removeItem('manaMax');
    localStorage.removeItem('ataque');
    localStorage.removeItem('velocidad');
    localStorage.removeItem('exp');
    localStorage.removeItem('ptosAtrib');
    localStorage.removeItem('heroeBD');
    localStorage.removeItem('idJugador');


    document.getElementById('inputNombreJugador').setAttribute('placeholder', 'Introducir Nombre Jugador');
    document.getElementById('inputNombreJugador').removeAttribute('readonly', '');
    document.getElementById('inputEmailJugador').setAttribute('placeholder','Introducir email Jugador');
    document.getElementById('inputEmailJugador').removeAttribute('readonly','');
    document.getElementById('btnInicio').innerHTML = 'Comenzar Aventura';

    bajaBD(heroeBD,idjugador);
}