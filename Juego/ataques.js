//Ataques Heore ------------------------------------------------------------------------------------------------------------------------------
const puno = new Image();
puno.src = './imagenes/puno.png';
let golpe = new Ataque({
    imagen: puno,
    nombre: 'Golpe',
    potencia: 10,
    posicion: {
        x: 1,
        y: 1
    },
    alcance: 1,
    tipo: 'fisico',
    desc: 'golpe'
});

const bolaDoFogo = new Image();
bolaDoFogo.src = './imagenes/bolaDoFogo.png';
let bolaFuego = new Ataque({
    imagen: bolaDoFogo,
    nombre: 'BolaFuego',
    potencia: 25,
    mana:10,
    posicion: {
        x: 1,
        y: 1
    },
    alcance: 6,
    tipo: 'magico',
    desc: 'bolaFuego'
});

const tempano = new Image();
tempano.src = './imagenes/tempanoHielo.png';
let esquirlaHelada = new Ataque({
    imagen:tempano,
    nombre:'Tempano',
    potencia:17,
    mana:7,
    posicion:{
        x:1,
        y:1
    },
    alcance:4,
    tipo:'magico',
    desc:'esquirlaHielo'
})

let arrayAtaquesHeroe = new Array();
arrayAtaquesHeroe = [golpe,bolaFuego,esquirlaHelada];

//Ataques Goblin----------------------------------------------------------------------------------------------------------------------------------

const punoGoblin = new Image();
punoGoblin.src = './imagenes/punoGoblin.png';
let golpeGoblin = new Ataque({
    imagen:punoGoblin,
    nombre:'GolpeGobin',
    potencia:7,
    posicion:{
        x:1,
        y:1
    },
    alcance:1,
    tipo:'fisico'
});
const imgEscupitajo = new Image();
imgEscupitajo.src = './imagenes/escupitajoVenenoso.png';
let escupitajoVenenoso = new Ataque({
    imagen:imgEscupitajo,
    nombre:'EscupitajoVenenoso',
    potencia:12,
    posicion:{
        x:1,
        y:1
    },
    alcance:3,
    tipo:'fisico'
});

//Ataques ogro-----------------------------------------------------------------------------------------------------------------------------------

const imgPunoOgro = new Image();
imgPunoOgro.src = './imagenes/punoOgro.png';
let aplastaGoblins = new Ataque({
    imagen:imgPunoOgro,
    nombre:'AplastaGoblins',
    potencia:49.5,
    posicion:{
        x:1,
        y:1
    },
    alcance:1,
    tipo:'fisico'
});

const imgPieOgro = new Image();
imgPieOgro.src = './imagenes/pieOgro.png';
let patadaOgra = new Ataque({
    imagen:imgPieOgro,
    nombre:'PatadaOgra',
    potencia:25.5,
    posicion:{
        x:1,
        y:1
    },
    alcance:2,
    tipo:'fisico'
});

//Ataques de animales

let placaje = new Ataque({
    nombre:'Placaje',
    potencia:5,
    posicion:{
        x:1,
        y:1
    },
    alcance:1,
    tipo:'fisico'
});

const imgMordisco = new Image();
imgMordisco.src = './imagenes/mordiscoAbierto.png';
let mordisco = new Ataque({
    imagen:imgMordisco,
    nombre:'Mordisco',
    potencia:15,
    posicion:{
        x:1,
        y:1
    },
    alcance:1,
    tipo:'fisico'
});

let embitePorcino = new Ataque({
    nombre:'Embite',
    potencia:17.5,
    posicion:{
        x:1,
        y:1
    },
    alcance:3,
    tipo:'fisico'
});