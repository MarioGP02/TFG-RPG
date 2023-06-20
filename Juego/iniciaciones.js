const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 567;

//Iniciaciones
const mapa = new Image();
mapa.src = './Imagenes/MapaDemo.png';
const atr = new Image();
atr.src = './imagenes/AtravesablesDemo.png';
const heroe = new Image();
heroe.src = './imagenes/eroe2.png';
const sombra = new Image();
sombra.src = './imagenes/sombra2t.png';
const interior = new Image();
interior.src = './imagenes/InteriorCasa.png';
const cueva = new Image();
cueva.src = './imagenes/cueva.png';
const gob = new Image();
gob.src = './imagenes/goblinEnemigo1400.png';
const mapBatalla = new Image();
mapBatalla.src = './imagenes/CampoBatalla.png';
const mapBatallaHA = new Image();
mapBatallaHA.src = './imagenes/CampBatallaAltaHierba.png';
const recuadroImg = new Image();
recuadroImg.src = './imagenes/recuadro.png';
const imgHeroeBat = new Image();
imgHeroeBat.src = './imagenes/imagenHeroeBat.png';
const imgGoblinBat = new Image();
imgGoblinBat.src = './imagenes/imagenGolbinBat.png';
const spOgro = new Image();
spOgro.src = './imagenes/ogro.png';
const imgLoboBat = new Image();
imgLoboBat.src = './imagenes/lobo.png';
const imgAlphaBat = new Image();
imgAlphaBat.src = './imagenes/loboAlpha.png';
const imgSerpienteBat = new Image();
imgSerpienteBat.src = './imagenes/serpiente.png';
const imgJabaliBat = new Image();
imgJabaliBat.src = './imagenes/jabali.png';
const imgRataBat = new Image();
imgRataBat.src = './imagenes/raton.png';

let offset = {
    x: 0,
    y: -400
};
let background = new Sprite({
    posicion: {
        x: offset.x,
        y: offset.y
    },
    imagen: mapa
});
let inter = new Sprite({
    posicion: {
        x: 300,
        y: 0
    },
    imagen: interior
});
let cuevaMont = new Sprite({
    posicion: {
        x: 0,
        y: 0
    },
    imagen: cueva
})

let Atravesables = new Sprite({
    posicion: {
        x: offset.x,
        y: offset.y
    },
    imagen: atr
});
const player = new Heroe({
    imagen: heroe,
    vida: 100,
    posicion: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    ataque: 10,
    mana: 35,
    velocidad: 15,
    //width: imagen.width ,
    //height: imagen.height,
    frames: { max: 4, val: 0 },
    direcciones: { val: 0 },
    imagenBat: imgHeroeBat,
    nivel: 1,
    exp: 0,
    expSigNvl: 100,
    ptosAtrb: 0,
});
const Sombra = new Sprite({
    imagen: sombra,
    posicion: {
        x: canvas.width / 2 - 15,
        y: canvas.height / 2 - 23
    }
});
let sombraGoblin = new Sprite({
    imagen: sombra,
    posicion: {
        x: 1585,
        y: 13
    }
})
let goblin = new Goblin({
    imagen: gob,
    vida: 65,
    posicion: {
        x: 1600,
        y: 35
    },
    ataque: 5.5,
    velocidad: 10,
    imagenBat: imgGoblinBat
});

let ogro = new Ogro({
    imagen: spOgro,
    vida: 135,
    posicion: {
        x: 1750,
        y: 35
    },
    ataque: 15.5,
    velocidad: 8,
    imagenBat: spOgro
});

let campoBatalla = new Sprite({
    posicion: {
        x: 0,
        y: 0
    },
    imagen: mapBatalla
});
let loboEn = new Lobo({
    imagenBat: imgLoboBat,
    vida: 85,
    posicion: {
        x: 0,
        y: 0
    },
    ataque: 7.5,
    velocidad: 12
});
let loboAlphaEn = new Alpha({
    imagenBat: imgAlphaBat,
    vida: 105,
    posicion: {
        x: 0,
        y: 0
    },
    ataque: 10.5,
    velocidad: 15
});
let serpienteEn = new Serpiente({
    imagenBat: imgSerpienteBat,
    vida: 65,
    posicion: {
        x: 0,
        y: 0
    },
    ataque: 10.5,
    velocidad: 10
});
let jabaliEn = new Jabali({
    imagenBat: imgJabaliBat,
    vida: 125,
    posicion: {
        x: 0,
        y: 0
    },
    ataque: 6.5,
    velocidad: 9
});
let ratonEn = new Rata({
    imagenBat: imgRataBat,
    vida: 45,
    posicion: {
        x: 0,
        y: 0
    },
    ataque: 5.5,
    velocidad: 15
});



//Arrays
let arrayEnemigos=[goblin,ogro,loboAlphaEn,loboEn,serpienteEn,ratonEn,jabaliEn];


let bordes = []
let bloqEntrar = [];
let MapaColisiones = [];
let entrar = [];
let MapaColInt = [];
let bordesInt = [];
let EntradaInt = [];
let entrarInt = [];
let mapaRecuadros = [];
let recuadros = [];
let bloqHierbaAlta = [];
let altaHierba = [];
let MapaColCueva = [];
let bordesCueva = [];
let EntradaCueva = [];
let entratCueva = [];
let mapaCama = [];
let bloqCama = [];


for (let i = 0; i < colisiones.length; i += 40) {
    MapaColisiones.push(colisiones.slice(i, 40 + i));
}

for (let i = 0; i < BloqEntr.length; i += 40) {
    bloqEntrar.push(BloqEntr.slice(i, 40 + i));
}

for (let i = 0; i < colisionesInterior.length; i += 12) {
    MapaColInt.push(colisionesInterior.slice(i, 12 + i));
}
for (let i = 0; i < EntrInt.length; i += 12) {
    EntradaInt.push(EntrInt.slice(i, i + 12));

}
for (let i = 0; i < Recuadros.length; i += 8) {
    mapaRecuadros.push(Recuadros.slice(i, i + 8));
}
for (let i = 0; i < hierbaAlta.length; i += 40) {
    bloqHierbaAlta.push(hierbaAlta.slice(i, 40 + i));
}
for (let i = 0; i < ColisionesCueva.length; i += 20) {
    MapaColCueva.push(ColisionesCueva.slice(i, 20 + i));
}
for (let i = 0; i < EntradasCueva.length; i += 20) {
    EntradaCueva.push(EntradasCueva.slice(i, 20 + i));
}

for(let i=0;i<PosCama.length;i+=20){
    mapaCama.push(PosCama.slice(i,i+20));
}

MapaColisiones.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo === 4097) {
            bordes.push(new Limite({
                posicion: {
                    x: j * Limite.width + offset.x,
                    y: i * Limite.height + offset.y
                }
            }
            ));
        }
    });
});

bloqEntrar.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo === 844) {
            entrar.push(new Entrada({
                posicion: {
                    x: j * Entrada.width + offset.x,
                    y: i * Entrada.height + offset.y
                },
                mapa1: mapa,
                mapa2: interior,
                direccion: 'casa'
            }))
        }
        if (simbolo == 877) {
            entrar.push(new Entrada({
                posicion: {
                    x: j * Entrada.width + offset.x,
                    y: i * Entrada.height + offset.y
                },
                mapa1: mapa,
                mapa2: cueva,
                direccion: 'cueva'
            }))
        }
    })
});

MapaColInt.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo === 4097) {
            bordesInt.push(new Limite({
                posicion: {
                    x: j * Limite.width + offset.x + 300,
                    y: i * Limite.height + offset.y
                }
            }
            ));
        }
    });
});

EntradaInt.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo === 844) {
            entrarInt.push(new Entrada({
                posicion: {
                    x: j * Entrada.width + offset.x + 300,
                    y: i * Entrada.height + offset.y + 380
                },
                mapa1: interior,
                mapa2: mapa,
                direccion: 'mundo'
            }))
        }
    })
});

mapaRecuadros.forEach((row, i) => {
    let letraColocar = '';
    if (i == 0) {
        letraColocar = 'A';
    }
    if (i == 1) {
        letraColocar = 'B';
    }
    if (i == 2) {
        letraColocar = 'C';
    }
    row.forEach((simbolo, j) => {
        if (simbolo === 14) {
            recuadros.push(new RecuadroBatalla({
                posicion: {
                    x: j * 128,
                    y: i * 128
                },
                letra: letraColocar,
                numero: j,
                imagen: recuadroImg
            }))
        }
    })
})

bloqHierbaAlta.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo == 1208) {
            altaHierba.push(new HierbaAlta({
                posicion: {
                    x: j * HierbaAlta.width + offset.x,
                    y: i * HierbaAlta.height + offset.y
                }
            }))
        }
    })
});

MapaColCueva.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if (simbolo == 4097) {
            bordesCueva.push(new Limite({
                posicion: {
                    x: j * Limite.width + offset.x ,
                    y: i * Limite.height + offset.y + 400
                }
            }));
        }
    })
});

EntradaCueva.forEach((row, i) => {
    row.forEach((simbolo, j) => {
        if(simbolo==844){
            entratCueva.push(new Entrada({
                posicion: {
                    x: j * Entrada.width + offset.x ,
                    y: i * Entrada.height + offset.y + 400
                },
                mapa1: cueva,
                mapa2: mapa,
                direccion: 'mundo'
            }));
        }
    })
});

mapaCama.forEach((row,i)=>{
    row.forEach((simbolo,j)=>{
        if(simbolo==877){
            bloqCama.push(new Cama({
                posicion:{
                    x: j * Cama.width + offset.x,
                    y:i* Cama.height + offset.y + 400
                }
            }))
        }
    })
})