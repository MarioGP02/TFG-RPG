
const eInm = document.getElementById('espInmortal');
//const e = eInm.getContext('2d');

//console.log(cookie1);
let gameOver = false;
//programacion inmortal

const spriteInmortal = new Image();
spriteInmortal.src = './Imagenes/frameInmortal1.png';
let inmortal = new Inmortal({
    posicion: {
        x: 50,
        y: 3
    },
    imagen: spriteInmortal,
    frames: { max: 4, val: 1 }
});
inmortal.draw();


//Diseño Responsive
let btonesResponsive = document.getElementById('botonesResponsive');
let navegador = navigator.userAgent;
    console.log(navegador);
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        

    } else {
        
        btonesResponsive.style.opacity = 0;
        btonesResponsive.style.position = 'absolute';
        btonesResponsive.style.top = 700;
    }


//Programacion incio de la aventura

let movimiento = false;
let pantallaInicial = document.getElementById('pantallaInicial');
let pantallaJuego = document.getElementById('pantallaJuego');
let pantallaMejoras = document.getElementById('pantallaMejoras');
let pantallaAdmin = document.getElementById('pantallaAdmin');
let NombreJugador;
let emailJugador;



function inicioAventura() {

    
    NombreJugador = document.getElementById('inputNombreJugador').value.trim();
    emailJugador = document.getElementById('inputEmailJugador').value.trim();
    let expresionRegularEM = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;



    if (!NombreJugador.length == 0 && !emailJugador.length == 0) {
        if (expresionRegularEM.test(emailJugador)) {
            setStorage(NombreJugador, emailJugador);
            comenzarPartida();
        } else {
            alert(emailJugador + ' esta mal escrito');
        }
    } else {

        let nombreStorage = getStorage('jugador');
        let emailStorage = getStorage('email');
        if (nombreStorage == null) {
            alert('Para iniciar debes introducir un nombre de jugador');
        } else {
            if ((!nombreStorage.length == 0 || nombreStorage != null) && (!emailStorage.length == 0 || emailStorage != null)) {
                console.log(nombreStorage);
                if (!nombreStorage == 'admin') {
                    document.getElementById('espAdmin').setAttribute('style', 'opacity:0;');
                } else {
                    document.getElementById('espAdmin').setAttribute('style', 'opacity:1;');
                }

                comenzarPartida();
            }
        }
    }

}

function comenzarPartida() {
    pantallaJuego.style.top = 0;
    gsap.to('#pantallaInicial', {
        opacity: 0,
        duration: 2,
        onComplete: () => {
            pantallaMejoras.style.top = 700;
            pantallaInicial.style.top = 700;
        }
    });
    gsap.to('#pantallaJuego', {
        opacity: 1,
        duration: 2
    });
    document.getElementById('mana').innerHTML = 'Mana:' + player.mana + '/' + player.manaMax;
    movimiento = true;
    animar();
}



//Programacion espacio admin
let ElemtCreados = false;
function abrirEspAdmin() {
    movimiento = false;
    pantallaAdmin.style.top = 0;
    gsap.to('#pantallaJuego', {
        opacity: 0,
        duration: 2,
        onComplete: () => {
            pantallaJuego.style.top = 700;
        }
    });
    gsap.to('#pantallaAdmin', {
        opacity: 1,
        duration: 2
    });

    if (!ElemtCreados) {
        crearElementosPA();
    }
}
let selectEnemigos = document.createElement('select');
function crearElementosPA() {
    pantallaAdmin.appendChild(selectEnemigos);
    arrayEnemigos.forEach(enemigo => {
        let optEn = document.createElement('option');
        optEn.setAttribute('value', enemigo.desc);
        selectEnemigos.appendChild(optEn);
        optEn.innerHTML = enemigo.desc;
    });

    selectEnemigos.setAttribute('onchange', 'cambioSelectEnemigo()');

    let btonReturn = document.createElement('button');
    btonReturn.setAttribute('onclick', 'returnJuegoA()');
    btonReturn.innerHTML = '->';
    btonReturn.style.position = 'absolute';
    btonReturn.style.left = 1000;
    pantallaAdmin.appendChild(btonReturn);
    ElemtCreados = true;
}

function returnJuegoA() {
    const tl = gsap.timeline();
    movimiento = true;

    tl.to('#pantallaAdmin', {
        opacity: 0,
        onComplete: () => {
            pantallaJuego.style.top = 0;
            pantallaAdmin.style.top = 700;
            pantallaInicial.style.top = 700;
        }
    }).to('#pantallaJuego', {
        opacity: 1
    });
}

let divCont = document.createElement('div');
let imgEn = document.createElement('img');
let divVidaE = document.createElement('div');
let pVidaE = document.createElement('p');
let btonMasVida = document.createElement('button');
let btonMenosVida = document.createElement('button');
let divAtaqueE = document.createElement('div');
let pAtaqE = document.createElement('p');
let btonMasAtaq = document.createElement('button');
let btonMenosAtaq = document.createElement('button');
let divVelE = document.createElement('div');
let pVelE = document.createElement('p');
let btonMasVel = document.createElement('button');
let btonMenosVel = document.createElement('button');

divCont.style.position = 'absolute';
divCont.style.top = 250;
divCont.style.left = 250;
divVidaE.style.position = 'absolute';
divVidaE.style.top = 0;
divVidaE.style.left = 250;
divAtaqueE.style.position = 'absolute';
divAtaqueE.style.top = 50;
divAtaqueE.style.left = 250;
divVelE.style.position = 'absolute';
divVelE.style.top = 100;
divVelE.style.left = 250;

btonMasVida.setAttribute('onclick', 'masVidaE()');
btonMasVida.innerHTML = '+';
btonMasVida.style.border = '3px darkgoldenrod solid';
btonMasVida.style.left = '30';
btonMenosVida.setAttribute('onclick', 'menosVidaE()');
btonMenosVida.innerHTML = '-';
btonMenosVida.style.border = '3px darkgoldenrod solid';
btonMasAtaq.setAttribute('onclick', 'masAtaqE()');
btonMasAtaq.innerHTML = '+';
btonMasAtaq.style.border = '3px darkgoldenrod solid';
btonMenosAtaq.setAttribute('onclick', 'menosAtaqE()');
btonMenosAtaq.innerHTML = '-';
btonMenosAtaq.style.border = '3px darkgoldenrod solid';
btonMasVel.setAttribute('onclick', 'masVelE()');
btonMasVel.innerHTML = '+';
btonMasVel.style.border = '3px darkgoldenrod solid';
btonMenosVel.setAttribute('onclick', 'menosVelE()');
btonMenosVel.innerHTML = '-';
btonMenosVel.style.border = '3px darkgoldenrod solid';

pantallaAdmin.appendChild(divCont);
divCont.appendChild(imgEn);
divCont.appendChild(divVidaE);
divVidaE.appendChild(pVidaE);
divVidaE.appendChild(btonMasVida);
divVidaE.appendChild(btonMenosVida);
divCont.appendChild(divAtaqueE);
divAtaqueE.appendChild(pAtaqE);
divAtaqueE.appendChild(btonMasAtaq);
divAtaqueE.appendChild(btonMenosAtaq);
divCont.appendChild(divVelE);
divVelE.appendChild(pVelE);
divVelE.appendChild(btonMasVel);
divVelE.appendChild(btonMenosVel);

let enemigoSelect;
let vidaEnNueva;
let ataqEnNuevo;
let velEnNueva;
function cambioSelectEnemigo() {
    let vSelectE = selectEnemigos.value;


    arrayEnemigos.forEach(enemigo => {
        if (vSelectE == enemigo.desc) {
            enemigoSelect = enemigo;
        }
    });
    ;
    imgEn.src = enemigoSelect.imagenBat.src;
    imgEn.setAttribute('id', 'img' + enemigoSelect.desc);

    pVidaE.innerHTML = 'Vida:' + enemigoSelect.vidaMax;
    pAtaqE.innerHTML = 'Ataque:' + enemigoSelect.ataque;
    pVelE.innerHTML = 'Velocidad:' + enemigoSelect.velocidad;

    let tl = gsap.timeline();
    tl.to('#img' + enemigoSelect.desc, {
        scale: 1
    }).to('#img' + enemigoSelect.desc, {
        scale: 2.5
    });

    vidaEnNueva = enemigoSelect.vidaMax;
    ataqEnNuevo = enemigoSelect.ataque;
    velEnNueva = enemigoSelect.velocidad;
}


function masVidaE() {
    vidaEnNueva = vidaEnNueva + 5;
    pVidaE.innerHTML = 'Vida:' + vidaEnNueva;
}
function menosVidaE() {
    vidaEnNueva = vidaEnNueva - 5;
    pVidaE.innerHTML = 'Vida:' + vidaEnNueva;
}

function masAtaqE() {
    ataqEnNuevo = ataqEnNuevo + 0.5;
    pAtaqE.innerHTML = 'Ataque:' + ataqEnNuevo;
}
function menosAtaqE() {
    ataqEnNuevo = ataqEnNuevo - 0.5;
    pAtaqE.innerHTML = 'Ataque:' + ataqEnNuevo;
}

function masVelE() {
    velEnNueva = velEnNueva + 1;
    pVelE.innerHTML = 'Velocidad:' + velEnNueva;
}
function menosVelE() {
    velEnNueva = velEnNueva - 1;
    pVelE.innerHTML = 'Velocidad:' + velEnNueva;
}

let btonGuardarCambiosEn = document.createElement('button');
btonGuardarCambiosEn.setAttribute('onclick', 'guardarCambiosEn()');
btonGuardarCambiosEn.innerHTML = 'Guardar Cambios en Enemigo';
btonGuardarCambiosEn.style.position = 'absolute';
btonGuardarCambiosEn.style.top = 550;
btonGuardarCambiosEn.style.left = 750;

pantallaAdmin.appendChild(btonGuardarCambiosEn);

function guardarCambiosEn() {
    enemigoSelect.vidaMax = vidaEnNueva;
    enemigoSelect.vida = vidaEnNueva;
    enemigoSelect.ataque = ataqEnNuevo;
    enemigoSelect.velocidad = velEnNueva;

    alert('Cambios en el enemigo ' + enemigoSelect.desc + ' Guardados');
}

let divBatInt = document.getElementById('barraAtaques');
let divBatalla = document.getElementById('divSuperior');
let divVidaBat = document.getElementById('divVidas');

//Programacion juego
const teclas = {
    w: {
        pulsada: false
    },
    a: {
        pulsada: false
    },
    s: {
        pulsada: false
    },
    d: {
        pulsada: false
    }
}
let batallaEmpezada = false;
const conMovimiento = [background, ...bordes, Atravesables, ...entrar, goblin, sombraGoblin, ogro, ...altaHierba];
let MovInterno = [];
function Colision({ objeto1, objeto2 }) {
    let chocan = false;
    if (objeto1.posicion.x + objeto1.width >= objeto2.posicion.x &&
        objeto1.posicion.x <= objeto2.posicion.x + objeto2.width &&
        objeto1.posicion.y <= objeto2.posicion.y + objeto2.height &&
        objeto1.posicion.y + objeto1.height >= objeto2.posicion.y) {
        chocan = true;
    }
    return chocan;
}

function CargarMapa({ entrada }) {
    c.save();
    c.clearRect(0, 0, canvas.width, canvas.height);
    /*for(let i= 0;i<100;i+10){
        c.globalAlpha = i/100;
    }*/
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
    bordes.forEach(limite => {
        c.clearRect(limite.posicion.x, limite.posicion.y, Limite.width, Limite.height);
    })

}
let batAltaHierba = true;
let bolInterior = false;
let entradaUsada;
let iteracion = 0;
let bolEntrExtUsada = false;
let bolEntrIntUsada = false;
let ingDirect = 0;
function animar() {
    if (!batallaEmpezada) {
        divBatInt.style.visibility = 'hidden';
    }
    if (gameOver) {
        GameOver();
    }
    if (pantallaJuego.style.opacity == 1) {
        movimiento = true;
    }
    //window.requestAnimationFrame(animar);


    //Mario del futuro la clave esta aqui: ponle un atributo a la clase entrada, que se base en el color de la entrada.



    background.draw();
    bordes.forEach(limite => {
        limite.draw();
    });
    entrar.forEach(entrada => {
        entrada.draw();
    });

    if (goblin.vida > 0) {
        sombraGoblin.draw();
        goblin.draw();
    } else {

    }
    if (ogro.vida > 0) {
        ogro.draw();
    } else {

    }
    Sombra.draw();
    player.draw();
    Atravesables.draw();

    altaHierba.forEach(bloqHierba => {
        bloqHierba.draw();

        if (Colision({ objeto1: player, objeto2: bloqHierba })) {
            while (ingDirect > 4) {

                if (batAltaHierba) {
                    let randomBat = Math.random();
                    console.log(randomBat);
                    if (randomBat >= 0.99) {
                        batAltaHierba = false;
                        CombateHierba();

                    }

                }
                if (ingDirect >= 4) {
                    ingDirect = 0;
                }
            }
            ingDirect++
        }
    })

    entrar.forEach(entrada => {

        if (Colision({ objeto1: player, objeto2: entrada })) {
            if (!bolEntrExtUsada) {
                MovInterno.forEach((cM) => {
                    cM.posicion.y += 4;
                });
                entradaUsada = entrada;
                iteracion++;
                bolInterior = true;
                bolEntrExtUsada = true;
                animarInterior(entradaUsada);
            }
            return;
        }

    });

    if (teclas.w.pulsada && ultimaTecla == 'w') {
        for (let i = 0; i < bordes.length; i++) {
            let borde = bordes[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x,
                        y: borde.posicion.y + 4
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            conMovimiento.forEach((cM) => {
                cM.posicion.y += 5;
            });
        }
    } else if (teclas.a.pulsada && ultimaTecla == 'a') {
        for (let i = 0; i < bordes.length; i++) {
            let borde = bordes[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x + 4,
                        y: borde.posicion.y
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            conMovimiento.forEach((cM) => {
                cM.posicion.x += 5;
            });
        }
    } else if (teclas.s.pulsada && ultimaTecla == 's') {
        for (let i = 0; i < bordes.length; i++) {
            let borde = bordes[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x,
                        y: borde.posicion.y - 4
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            conMovimiento.forEach((cM) => {
                cM.posicion.y -= 5;
            });
        }
    } else if (teclas.d.pulsada && ultimaTecla == 'd') {
        for (let i = 0; i < bordes.length; i++) {
            let borde = bordes[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x - 4,
                        y: borde.posicion.y
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            conMovimiento.forEach((cM) => {
                cM.posicion.x -= 5;
            });
        }
    }

    if (bolEntrIntUsada) {
        bolEntrExtUsada = false;
    }



};
animar();


function animarInterior(entrada) {

    CargarMapa({ entrada });

    if (pantallaJuego.style.opacity == 1) {
        movimiento = true;
    }

    let mapaInteior;
    let colisionesInt;
    let entradasInt;

    switch (entrada.direccion) {
        case 'casa':
            mapaInteior = inter;
            colisionesInt = bordesInt;
            entradasInt = entrarInt;
            MovInterno = [inter, ...bordesInt, ...entrarInt];
            break;
        case 'cueva':
            mapaInteior = cuevaMont;
            colisionesInt = bordesCueva;
            entradasInt = entratCueva;
            MovInterno = [cuevaMont, ...bordesCueva, ...entratCueva, ...bloqCama];

            break;
    }

    mapaInteior.draw();
    colisionesInt.forEach(limite => {
        limite.draw();
    });
    entradasInt.forEach(entrad => {
        entrad.draw();
    });
    if (entrada.direccion == 'cueva') {
        bloqCama.forEach(cama => {
            cama.draw();
            if (Colision({ objeto1: player, objeto2: cama })) {
                document.querySelector('#cajaDialogos').innerHTML = 'Pulsa K para descansar y guardar progreso';
            } else {
                document.querySelector('#cajaDialogos').innerHTML = '';
            }
        })
    }

    entradasInt.forEach(entrad => {
        if (Colision({ objeto1: player, objeto2: entrad })) {
            if (!bolEntrIntUsada) {
                conMovimiento.forEach((cM) => {
                    cM.posicion.y -= 4;
                });
                iteracion++;
                bolInterior = false;
                bolEntrIntUsada = true;
                CargarMapa({ entrad });
                animar();
            }
            return;
        }

    });

    Sombra.draw();
    player.draw();

    if (teclas.w.pulsada && ultimaTecla == 'w') {
        for (let i = 0; i < colisionesInt.length; i++) {
            let borde = colisionesInt[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x,
                        y: borde.posicion.y + 4
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            MovInterno.forEach((cM) => {
                cM.posicion.y += 5;
            });
        }
    } else if (teclas.a.pulsada && ultimaTecla == 'a') {
        for (let i = 0; i < colisionesInt.length; i++) {
            let borde = colisionesInt[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x + 4,
                        y: borde.posicion.y
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            MovInterno.forEach((cM) => {
                cM.posicion.x += 5;
            });
        }
    } else if (teclas.s.pulsada && ultimaTecla == 's') {
        for (let i = 0; i < colisionesInt.length; i++) {
            let borde = colisionesInt[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x,
                        y: borde.posicion.y - 4
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            MovInterno.forEach((cM) => {
                cM.posicion.y -= 5;
            });
        }
    } else if (teclas.d.pulsada && ultimaTecla == 'd') {
        for (let i = 0; i < colisionesInt.length; i++) {
            let borde = colisionesInt[i];
            if (Colision({
                objeto1: player,
                objeto2: {
                    ...borde,
                    posicion: {
                        x: borde.posicion.x - 4,
                        y: borde.posicion.y
                    }
                }
            })) {
                movimiento = false;
                break;
            }
        }
        if (movimiento) {
            MovInterno.forEach((cM) => {
                cM.posicion.x -= 5;
            });
        }
    }

    if (bolEntrExtUsada) {
        bolEntrIntUsada = false;
    }
}


//Iniciaciones batalla
let recuadroHeroe = new RecuadroBatalla({
    posicion: {
        x: 0,
        y: 0
    },
    letra: '',
    numero: 0,
    imagen: recuadroImg
});
let recuadroEnemigo = new RecuadroBatalla({
    posicion: {
        x: 0,
        y: 0
    },
    letra: '',
    numero: 0,
    imagen: recuadroImg
});
let participantesBatalla = new Array();
participantesBatalla.push(player);
let enemigo;
let arrayVidasPart = new Array();
let arrayPart = new Array();
let TurnoBatalla = 0;
let contTurnoHeroe = 0;
let contTurnoEnemigo = 0;
let contTurnosBatGoblin = 0;
let contTurnosBatOgro = 0;

//Programacion para la zona de mejoras de atributos y ataques

const selectAtq = document.getElementById('lstAtaquesConocidos');
let kl = 1;
let atqsSelec = document.getElementsByName('ataqueSelec');
function espHeroe() {
    movimiento = false;
    const tl = gsap.timeline();

    document.getElementById('vidaMaxH').innerHTML = player.vidaMax;
    document.getElementById('ataqueH').innerHTML = player.ataque;
    document.getElementById('velocidadH').innerHTML = player.velocidad;
    document.getElementById('manaMaxH').innerHTML = player.manaMax;
    document.getElementById('ptosDisponibles').innerHTML = player.ptosAtrb;
    document.getElementById('expNumerica').innerHTML = player.exp + '/' + player.expSigNvl;
    document.getElementById('nvlHeroe').innerHTML = player.nivel;
    document.getElementById('imgHPM').setAttribute('src', player.imagenBat.src);

    let porExp = player.exp / player.expSigNvl;
    let porBarraExp = 300 * porExp;

    document.getElementById('barraExp').setAttribute('style', 'width:' + porBarraExp);



    arrayAtaquesHeroe.forEach(atq => {
        if (selectAtq.length < (arrayAtaquesHeroe.length + 1)) {
            let ataque = document.createElement('option');
            ataque.setAttribute('value', atq.desc);
            ataque.innerHTML = atq.nombre;
            selectAtq.appendChild(ataque);
        }
    })



    atqsSelec.forEach(atqS => {
        if (kl <= 4) {
            let atq = document.createElement('div');
            atq.setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;');
            atq.setAttribute('id', 'atqSel' + kl);
            kl++;
            switch (atqS.id) {
                case 'golpe':
                    atq.innerHTML = golpe.nombre;
                    break;
                case 'bolaFuego':
                    atq.innerHTML = bolaFuego.nombre;
                    break;
            }
            document.getElementById('atquesSelect').appendChild(atq);
        }
    })


    tl.to('#pantallaJuego', {
        opacity: 0,
        onComplete: () => {
            pantallaJuego.style.top = 700;
            pantallaMejoras.style.top = 0;
            pantallaInicial.style.top = 700;
        }
    }).to('#pantallaMejoras', {
        opacity: 1,
        onComplete: () => {
            gsap.to('#imgHPM', {
                scale: 2
            });

        }
    });
}
let atqSeleccionado;
let numAtq;
function cambioRadio(radioCam) {
    numAtq = radioCam;
    document.getElementById('atqSel1').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;');
    document.getElementById('atqSel2').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;');
    document.getElementById('atqSel3').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;');
    document.getElementById('atqSel4').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;');
    switch (radioCam) {
        case '1':
            document.getElementById('atqSel1').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;background-color:magenta;');
            atqSeleccionado = document.getElementById('atqSel1');
            break;
        case '2':
            document.getElementById('atqSel2').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;background-color:magenta;');
            atqSeleccionado = document.getElementById('atqSel2');
            break;
        case '3':
            document.getElementById('atqSel3').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;background-color:magenta;');
            atqSeleccionado = document.getElementById('atqSel3');
            break;
        case '4':
            document.getElementById('atqSel4').setAttribute('style', 'display:flex;align-items: center;justify-content: center;border:2px black solid;background-color:magenta;');
            atqSeleccionado = document.getElementById('atqSel4');
            break;
    }
}

let vselect;
function cambioSelectAtq() {
    vselect = selectAtq.value;
    switch (vselect) {
        case 'nada':
            break;
        case 'golpe':

            document.getElementById('infoAtaque').innerHTML = '<p>Potencia:' + golpe.potencia + '</p><br><p>Alcance:' + golpe.alcance + '</p><br><p>Tipo:' + golpe.tipo + '</p>';
            break;
        case 'bolaFuego':
            document.getElementById('infoAtaque').innerHTML = '<p>Potencia:' + bolaFuego.potencia + '</p><br><p>Alcance:' + bolaFuego.alcance + '</p><br><p>Tipo:' + bolaFuego.tipo + '</p><br><p>Mana:' + bolaFuego.mana + '</p>';
            break;
        case 'esquirlaHielo':
            document.getElementById('infoAtaque').innerHTML = '<p>Potencia:' + esquirlaHelada.potencia + '</p><br><p>Alcance:' + esquirlaHelada.alcance + '</p><br><p>Tipo:' + esquirlaHelada.tipo + '</p><br><p>Mana:' + esquirlaHelada.mana + '</p>';
            break;
    }
}

function cambioAtaqueSelec() {

    if (atqSeleccionado == undefined || vselect == undefined) {
        alert('No has seleccionado nada, selecciona alguna opcion para cambiar');
    } else {
        atqsSelec.forEach((atq, i) => {

            if (i == (numAtq - 1)) {
                switch (vselect) {
                    case 'nada':
                        break;
                    case 'golpe':

                        atqSeleccionado.innerHTML = golpe.nombre;
                        atq.setAttribute('onmouseover', 'caractAtq("' + golpe.desc + '")');
                        atq.setAttribute('id', golpe.desc)
                        atq.innerHTML = golpe.nombre;
                        break;
                    case 'bolaFuego':
                        atqSeleccionado.innerHTML = bolaFuego.nombre;
                        atq.setAttribute('onmouseover', 'caractAtq("' + bolaFuego.desc + '")');
                        atq.setAttribute('id', bolaFuego.desc)
                        atq.innerHTML = bolaFuego.nombre;
                        break;
                    case 'esquirlaHielo':
                        atqSeleccionado.innerHTML = esquirlaHelada.nombre;
                        atq.setAttribute('onmouseover', 'caractAtq("' + esquirlaHelada.desc + '")');
                        atq.setAttribute('id', esquirlaHelada.desc)
                        atq.innerHTML = esquirlaHelada.nombre;
                        break;
                }
            }
        })

    }
}

function masVida() {
    if (player.ptosAtrb > 0) {
        player.vidaMax += 10;
        player.ptosAtrb--;
        espHeroe();
    } else {
        alert('No cuentas con los puntos de atributo suficientes');
    }
}
function masAtaque() {
    if (player.ptosAtrb > 0) {
        player.ataque++;
        player.ptosAtrb--;
        espHeroe();
    } else {
        alert('No cuentas con los puntos de atributo suficientes');
    }
}
function masVelocidad() {
    if (player.ptosAtrb > 0) {
        player.velocidad++;
        player.ptosAtrb--;
        espHeroe();
    } else {
        alert('No cuentas con los puntos de atributo suficientes');
    }
}
function masMana() {
    if (player.ptosAtrb > 0) {
        player.manaMax += 5;
        player.ptosAtrb--;
        document.getElementById('mana').innerHTML = 'Mana:' + player.mana + '/' + player.manaMax;
        espHeroe();
    } else {
        alert('No cuentas con los puntos de atributo suficientes');
    }
}

function volverJuego() {
    const tl = gsap.timeline();
    movimiento = true;

    tl.to('#pantallaMejoras', {
        opacity: 0,
        onComplete: () => {
            pantallaJuego.style.top = 0;
            pantallaMejoras.style.top = 700;
            pantallaInicial.style.top = 700;
            gsap.to('#imgHPM', {
                scale: 1
            })
        }
    }).to('#pantallaJuego', {
        opacity: 1
    });
}
//Programacion del descanso y guardado de personaje

function descansar() {
    gsap.to('#divSuperior', {
        opacity: 1,
        duration: 1.5,
        onComplete: () => {
            player.vida = player.vidaMax;
            player.mana = player.manaMax;
            document.getElementById('mana').innerHTML = 'Mana:' + player.mana + '/' + player.manaMax;
            gsap.to('#barraMana', {
                width: 100
            });
            gsap.to('#divSuperior', {
                opacity: 0,
                duration: 2
            })
        }
    });
    setStorageHeroe(player);
}

//Eventos teclado
let ultimaTecla = '';
window.addEventListener('keydown', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'W':
            case 'w':
                teclas.w.pulsada = true;
                ultimaTecla = 'w';
                if (batallaEmpezada == false) {
                    player.mov = true;
                    player.direcciones.val = 3;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }



                } if (batallaEmpezada) {
                    if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
                        document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
                    } else {
                        if (recuadroHeroe.letra == 'A') {
                            console.log('Te sales de la batalla');
                        }
                        if (recuadroHeroe.letra == 'B') {
                            recuadroHeroe.letra = 'A';
                        }
                        if (recuadroHeroe.letra == 'C') {
                            recuadroHeroe.letra = 'B';
                        }
                        contTurnoHeroe++;
                        TurnoBatalla++;
                    }
                    animacionBatalla(enemigo);
                }


                break;
            case 'A':
            case 'a':
                teclas.a.pulsada = true;
                ultimaTecla = 'a';

                if (batallaEmpezada == false) {
                    player.mov = true;
                    player.direcciones.val = 2;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
                        document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
                    } else {
                        if (recuadroHeroe.numero == 0) {
                            console.log('Te sales de la batalla');
                        } else {
                            recuadroHeroe.numero--;
                        }
                        contTurnoHeroe++;
                        TurnoBatalla++;
                    }
                    animacionBatalla(enemigo);
                }
                break;
            case 'S':
            case 's':
                teclas.s.pulsada = true;
                ultimaTecla = 's';
                if (batallaEmpezada == false) {
                    player.mov = true;
                    player.direcciones.val = 0;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
                        document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
                    } else {
                        if (recuadroHeroe.letra == 'C') {
                            console.log('Te sales de la batalla');
                        }
                        if (recuadroHeroe.letra == 'B') {
                            recuadroHeroe.letra = 'C';
                        }
                        if (recuadroHeroe.letra == 'A') {
                            recuadroHeroe.letra = 'B';
                        }
                        contTurnoHeroe++;
                        TurnoBatalla++;
                    }
                    animacionBatalla(enemigo);
                }
                break;
            case 'D':
            case 'd':
                teclas.d.pulsada = true;
                ultimaTecla = 'd';
                if (batallaEmpezada == false) {
                    player.mov = true;
                    player.direcciones.val = 1;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
                        document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
                    } else {
                        if (recuadroHeroe.numero == 7) {
                            console.log('Te sales de la batalla');
                        } else {
                            recuadroHeroe.numero++;
                        }
                        contTurnoHeroe++;
                        TurnoBatalla++;
                    }
                    animacionBatalla(enemigo);
                }
                break;
            case 'K':
            case 'k':

                if (Colision({ objeto1: player, objeto2: goblin }) || Colision({ objeto1: player, objeto2: ogro })) {
                    batallaEmpezada = true;
                    if (Colision({ objeto1: player, objeto2: goblin })) {
                        participantesBatalla.push(goblin);
                        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + goblin.desc;
                        enemigo = goblin;
                        contTurnoHeroe = 0;
                        contTurnoEnemigo = 0;
                    }
                    else {
                        participantesBatalla.push(ogro);
                        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + ogro.desc;
                        enemigo = ogro;
                        contTurnoHeroe = 0;
                        contTurnoEnemigo = 0;
                    }
                    recuadroHeroe.letra = 'B';
                    recuadroHeroe.numero = 0;
                    recuadroEnemigo.letra = 'B';
                    recuadroEnemigo.numero = 7;

                    gsap.to('#divSuperior', {
                        opacity: 1,
                        repeat: 3,
                        yoyo: true,
                        duration: 0.5,
                        onComplete() {
                            gsap.to('#divSuperior', {
                                opacity: 1,
                                duration: 0.5,
                                onComplete() {
                                    animacionBatalla(enemigo);
                                    gsap.to('#divSuperior', {
                                        opacity: 0,
                                        duration: 0.5
                                    });
                                }
                            });

                        }
                    });

                }
                else {
                    gsap.to('#divSuperior', {
                        opacity: 0
                    });

                }

                let bloqOkupado = 0;
                bloqCama.forEach(cama => {
                    if (Colision({ objeto1: player, objeto2: cama })) {
                        bloqOkupado++;

                    }
                });
                if (bloqOkupado == bloqCama.length) {
                    descansar();
                }

                break;
        }
    }
}
);

window.addEventListener('keyup', (e) => {
    if (!gameOver) {
        switch (e.key) {
            case 'W':
            case 'w':
                teclas.w.pulsada = false;

                if (batallaEmpezada == false) {
                    player.mov = false;
                    player.frames.val = 0;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    animacionBatalla();
                }

                break;
            case 'A':
            case 'a':
                teclas.a.pulsada = false;
                if (batallaEmpezada == false) {
                    player.mov = false;
                    player.frames.val = 0;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    animacionBatalla(enemigo);
                }
                break;
            case 'S':
            case 's':
                teclas.s.pulsada = false;
                if (batallaEmpezada == false) {
                    player.mov = false;
                    player.frames.val = 0;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    animacionBatalla(enemigo);
                }
                break;
            case 'D':
            case 'd':
                teclas.d.pulsada = false;
                if (batallaEmpezada == false) {
                    player.mov = false;
                    player.frames.val = 0;
                    if (bolInterior == true) {
                        animarInterior(entradaUsada);
                    } else {
                        animar();
                    }

                } if (batallaEmpezada) {
                    animacionBatalla(enemigo);
                }
                break;
        }
    }
}
);

//Programacion botones responsive


document.getElementById('btnW').addEventListener('keypress',(i)=>{
    btnWResponsive();
});
document.getElementById('btnA').addEventListener('keypress',(i)=>{
    btnAResponsive();
});
document.getElementById('btnS').addEventListener('keypress',(i)=>{
    btnSResponsive();
});
document.getElementById('btnD').addEventListener('keypress',(i)=>{
    btnDResponsive();
});

function btnWResponsive() {
    teclas.w.pulsada = true;
    ultimaTecla = 'w';
    if (batallaEmpezada == false) {
        player.mov = true;
        player.direcciones.val = 3;
        if (bolInterior == true) {
            animarInterior(entradaUsada);
        } else {
            animar();
        }



    } if (batallaEmpezada) {
        if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
            document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
        } else {
            if (recuadroHeroe.letra == 'A') {
                console.log('Te sales de la batalla');
            }
            if (recuadroHeroe.letra == 'B') {
                recuadroHeroe.letra = 'A';
            }
            if (recuadroHeroe.letra == 'C') {
                recuadroHeroe.letra = 'B';
            }
            contTurnoHeroe++;
            TurnoBatalla++;
        }
        animacionBatalla(enemigo);
    }
}
function btnAResponsive() {
    teclas.a.pulsada = true;
    ultimaTecla = 'a';

    if (batallaEmpezada == false) {
        player.mov = true;
        player.direcciones.val = 2;
        if (bolInterior == true) {
            animarInterior(entradaUsada);
        } else {
            animar();
        }

    } if (batallaEmpezada) {
        if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
            document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
        } else {
            if (recuadroHeroe.numero == 0) {
                console.log('Te sales de la batalla');
            } else {
                recuadroHeroe.numero--;
            }
            contTurnoHeroe++;
            TurnoBatalla++;
        }
        animacionBatalla(enemigo);
    }
}
function btnSResponsive() {
    teclas.s.pulsada = true;
    ultimaTecla = 's';
    if (batallaEmpezada == false) {
        player.mov = true;
        player.direcciones.val = 0;
        if (bolInterior == true) {
            animarInterior(entradaUsada);
        } else {
            animar();
        }

    } if (batallaEmpezada) {
        if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
            document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
        } else {
            if (recuadroHeroe.letra == 'C') {
                console.log('Te sales de la batalla');
            }
            if (recuadroHeroe.letra == 'B') {
                recuadroHeroe.letra = 'C';
            }
            if (recuadroHeroe.letra == 'A') {
                recuadroHeroe.letra = 'B';
            }
            contTurnoHeroe++;
            TurnoBatalla++;
        }
        animacionBatalla(enemigo);
    }
}
function btnDResponsive() {
    teclas.d.pulsada = true;
    ultimaTecla = 'd';
    if (batallaEmpezada == false) {
        player.mov = true;
        player.direcciones.val = 1;
        if (bolInterior == true) {
            animarInterior(entradaUsada);
        } else {
            animar();
        }

    } if (batallaEmpezada) {
        if (contTurnoHeroe == 1 && contTurnoEnemigo <= 0) {
            document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
        } else {
            if (recuadroHeroe.numero == 7) {
                console.log('Te sales de la batalla');
            } else {
                recuadroHeroe.numero++;
            }
            contTurnoHeroe++;
            TurnoBatalla++;
        }
        animacionBatalla(enemigo);
    }
}
function btnKResponsive() {
    if (Colision({ objeto1: player, objeto2: goblin }) || Colision({ objeto1: player, objeto2: ogro })) {
        batallaEmpezada = true;
        if (Colision({ objeto1: player, objeto2: goblin })) {
            participantesBatalla.push(goblin);
            document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + goblin.desc;
            enemigo = goblin;
            contTurnoHeroe = 0;
            contTurnoEnemigo = 0;
        }
        else {
            participantesBatalla.push(ogro);
            document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + ogro.desc;
            enemigo = ogro;
            contTurnoHeroe = 0;
            contTurnoEnemigo = 0;
        }
        recuadroHeroe.letra = 'B';
        recuadroHeroe.numero = 0;
        recuadroEnemigo.letra = 'B';
        recuadroEnemigo.numero = 7;

        gsap.to('#divSuperior', {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.5,
            onComplete() {
                gsap.to('#divSuperior', {
                    opacity: 1,
                    duration: 0.5,
                    onComplete() {
                        animacionBatalla(enemigo);
                        gsap.to('#divSuperior', {
                            opacity: 0,
                            duration: 0.5
                        });
                    }
                });

            }
        });

    }
    else {
        gsap.to('#divSuperior', {
            opacity: 0
        });

    }

    let bloqOkupado = 0;
    bloqCama.forEach(cama => {
        if (Colision({ objeto1: player, objeto2: cama })) {
            bloqOkupado++;

        }
    });
    if (bloqOkupado == bloqCama.length) {
        descansar();
    }
}

