

function animacionBatalla(enemigo) {
    console.log(enemigo);
    if(enemigo != ogro && enemigo != goblin){
        campoBatalla.imagen = mapBatallaHA;
    }else{
        campoBatalla.imagen = mapBatalla;
    }
    campoBatalla.draw();
    if (batallaEmpezada) {
        divBatInt.style.visibility = 'visible';
    }
    if (contTurnoHeroe > 1) {
        contTurnoHeroe = 1;
    }
    if (contTurnoHeroe == 1 && contTurnoEnemigo == 1) {
        contTurnoHeroe = 0;
        contTurnoEnemigo = 0;
    }
    let PartidaCompleta = 0;
    let delayX
    let delayY
    if (enemigo != ogro) {
        delayX = 15;
        delayY = 20;
    } else {
        delayX = 0;
        delayY = 0;
    }
    let enemigoDerrotado = false;

    recuadros.forEach(recuadro => {

        if (recuadro.letra == recuadroHeroe.letra && recuadro.numero == recuadroHeroe.numero) {
            player.posicion.x = recuadro.posicion.x + 15;
            player.posicion.y = recuadro.posicion.y + 20;
        }
        if (recuadro.letra == recuadroEnemigo.letra && recuadro.numero == recuadroEnemigo.numero) {
            enemigo.posicion.x = recuadro.posicion.x + delayX;
            enemigo.posicion.y = recuadro.posicion.y + delayY;
        }
        recuadro.draw();
    });
    participantesBatalla.forEach((participante, i) => {
        //console.log('Pintado ' + participante);
        if (!(arrayVidasPart.length == participantesBatalla.length)) {
            divCombatiente = document.createElement('div');
            divCombatiente.setAttribute('id', 'combatiente' + participante.desc)
            combatiente = document.createElement('img');
            recuadroVida = document.createElement('div');
            subVida = document.createElement('div');
            vida = document.createElement('div');
            recuadroVida.setAttribute('style', 'position:absolute;top:' + (participante.posicion.y + participante.height) + ';left:' + participante.posicion.x + ';');
            subVida.setAttribute('style', 'height:5px;visibility:visible;border:4px black solid;background-color:#FF0000;width:' + participante.width + ';');
            vida.setAttribute('style', 'background-color:#10450D;visibility:visible;width:' + participante.width + ';height:5px;margin-top:-9px;margin-left:4px;');
            vida.setAttribute('id', 'vida' + participante.desc);
            combatiente.setAttribute('id', 'imagen' + participante.desc);
            combatiente.setAttribute('src', participante.imagenBat.src);
            combatiente.setAttribute('style', 'position:absolute;top:' + participante.posicion.y + ';left:' + participante.posicion.x + ';');
            divCombatiente.appendChild(combatiente);
            divCombatiente.appendChild(recuadroVida);
            recuadroVida.appendChild(subVida);
            recuadroVida.appendChild(vida);
            divVidaBat.appendChild(divCombatiente);



            arrayVidasPart.push(recuadroVida);
            arrayPart.push(combatiente);
            if (participante.vida < participante.vidaMax) {
                let vidaRest = (participante.vida / participante.vidaMax);

                vida.setAttribute('style', 'background-color:#10450D;visibility:visible;width:' + (participante.width * vidaRest) + ';height:5px;margin-top:-9px;margin-left:4px;');
            }

        }
        else {
            arrayVidasPart.forEach((rVida, j) => {
                if (i == j) {
                    rVida.setAttribute('style', 'position:absolute;top:' + (participante.posicion.y + participante.height) + ';left:' + participante.posicion.x + ';');
                }
            });
            arrayPart.forEach((comb, j) => {
                if (i == j) {
                    comb.setAttribute('style', 'position:absolute;top:' + participante.posicion.y + ';left:' + participante.posicion.x + ';');
                }
            });

        }
        if (participante.vida <= 0) {
            if (participante.desc == 'Heroe') {
                batallaEmpezada = false;
                participantesBatalla.forEach((part, k) => {
                    let imgPart = document.getElementById('combatiente' + part.desc);
                    imgPart.remove();

                });
                GameOver();
            } else {
                batallaEmpezada = false;
                document.querySelector('#cajaDialogos').innerHTML = participante.desc + ' Derrotado';
                enemigoDerrotado = true;
                participantesBatalla.forEach((part, k) => {
                    let imgPart = document.getElementById('combatiente' + part.desc);
                    imgPart.remove();


                });
                player.exp += participante.expDada;

                if (participante.desc == 'Goblin') {
                    contTurnosBatGoblin = TurnoBatalla;
                }
                if (participante.desc == 'Ogro') {
                    contTurnosBatOgro = TurnoBatalla;

                }
                participantesBatalla.pop(participante);
                finBatalla();
            }
        }
            
        
    });

    if (contTurnoHeroe == 1 && contTurnoEnemigo < 1 && enemigoDerrotado==false) {
        AtaqueEnemigo(enemigo);
    }


}

function CombateHierba() {
    let quienBatalla = Math.random();
    batallaEmpezada = true;
    if (quienBatalla >= 0 && quienBatalla < 0.1) {
        if (loboAlphaEn.vida <= 0) {
            loboAlphaEn.vida = loboAlphaEn.vidaMax;
        }
        enemigo = loboAlphaEn;
        participantesBatalla.push(loboAlphaEn);
        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + loboAlphaEn.desc;
    } else if (quienBatalla >= 0.1 && quienBatalla < 0.35) {
        if (loboEn.vida <= 0) {
            loboEn.vida = loboEn.vidaMax;
        }
        enemigo = loboEn;
        participantesBatalla.push(loboEn);
        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + loboEn.desc;
    } else if (quienBatalla >= 0.35 && quienBatalla < 0.55) {
        if (serpienteEn.vida <= 0) {
            serpienteEn.vida = serpienteEn.vidaMax;
        }
        enemigo = serpienteEn;
        participantesBatalla.push(serpienteEn);
        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + serpienteEn.desc;
    } else if (quienBatalla >= 0.55 && quienBatalla < 0.75) {
        if (jabaliEn.vida <= 0) {
            jabaliEn.vida = jabaliEn.vidaMax;
        }
        enemigo = jabaliEn;
        participantesBatalla.push(jabaliEn);
        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + jabaliEn.desc;
    } else if (quienBatalla >= 0.75 && quienBatalla <= 1) {
        if (ratonEn.vida <= 0) {
            ratonEn.vida = ratonEn.vidaMax;
        }
        enemigo = ratonEn;
        participantesBatalla.push(ratonEn);
        document.querySelector('#cajaDialogos').innerHTML = 'Combate contra ' + ratonEn.desc;
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

function caractAtq(idAtq) {
    let espAtq = document.getElementById('atqMO');

    arrayAtaquesHeroe.forEach((atq, i) => {
        if (idAtq == atq.desc) {
            espAtq.innerHTML = atq.nombre + ': tipo:' + atq.tipo + '/ potencia:' + atq.potencia + '/ alcance:' + atq.alcance + '/';
            if (atq.tipo == 'magico') {
                espAtq.innerHTML += 'mana:' + atq.mana;
            }
        }
    });
}

function finBatalla() {
    console.log('Fin de batalla');
    player.posicion.x = canvas.width / 2;
    player.posicion.y = canvas.height / 2;

    if (player.exp >= player.expSigNvl) {
        player.levelUp();
        document.getElementById('mana').innerHTML = 'Mana:' + player.mana + '/' + player.manaMax;

    }
    if (!batAltaHierba) {
        batAltaHierba = true;
    }
    arrayPart = [];
    arrayVidasPart = [];
    TurnoBatalla = 0;
}

function GameOver() {
    gameOver = true;
    c.save();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();

    document.querySelector('#cajaDialogos').innerHTML = player.desc + ' Derrotado F5 para reiniciar';
}

document.querySelectorAll('button').forEach((boton) => {
    boton.addEventListener('click', () => {
        if (contTurnoHeroe == 1 && contTurnoEnemigo <= 1) {
            document.querySelector('#cajaDialogos').innerHTML = 'Turno Enemigo';
            return;
        } else {
            if (boton.id === "golpe") {
                imagenGolpe = document.createElement('img');
                golpe.atacar({
                    atacante: player,
                    atacado: enemigo,
                    recuadroAtaque: recuadroHeroe,
                    recuadroAtacado: recuadroEnemigo,
                    imagenATK: imagenGolpe
                });
                contTurnoHeroe++;
                TurnoBatalla++;

            } else if (boton.id == "bolaFuego") {
                imagenBola = document.createElement('img');
                bolaFuego.atacar({
                    atacante: player,
                    atacado: enemigo,
                    recuadroAtaque: recuadroHeroe,
                    recuadroAtacado: recuadroEnemigo,
                    imagenATK: imagenBola
                });
                contTurnoHeroe++;
                TurnoBatalla++;
            } else if (boton.id == "esquirlaHielo") {
                imagenTempano = document.createElement('img');
                esquirlaHelada.atacar({
                    atacante: player,
                    atacado: enemigo,
                    recuadroAtaque: recuadroHeroe,
                    recuadroAtacado: recuadroEnemigo,
                    imagenATK: imagenTempano
                });
                contTurnoHeroe++;
                TurnoBatalla++;
            }

        }

    });

});

function AtaqueEnemigo(enemigo) {
    contTurnoEnemigo++;
    TurnoBatalla++;
    let numeroAleatorio = Math.random();
    switch (enemigo) {
        case goblin:
            if (numeroAleatorio <= 0.5) {
                imagenGolpeGoblin = document.createElement('img');
                golpeGoblin.atacar({
                    atacante: goblin,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                    imagenATK: imagenGolpeGoblin
                });
            } else {
                imagenEscupitajo = document.createElement('img');
                escupitajoVenenoso.atacar({
                    atacante: goblin,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                    imagenATK: imagenEscupitajo
                });
            }
            break;
        case ogro:
            if (numeroAleatorio <= 0.4) {
                imagenAplastaGoblins = document.createElement('img');
                aplastaGoblins.atacar({
                    atacante: ogro,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                    imagenATK: imagenAplastaGoblins
                });
            } else {
                imagenPieOgro = document.createElement('img');
                patadaOgra.atacar({
                    atacante: ogro,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                    imagenATK: imagenPieOgro
                });
            }

            break;
        case loboEn:
        case loboAlphaEn:
        case serpienteEn:
        case ratonEn:
            if (numeroAleatorio <= 0.5) {
                placaje.atacar({
                    atacante: enemigo,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                });
            } else {
                imagenMordisco = document.createElement('img');
                mordisco.atacar({
                    atacante: enemigo,
                    atacado: player,
                    recuadroAtaque: recuadroEnemigo,
                    recuadroAtacado: recuadroHeroe,
                    imagenATK: imagenMordisco
                });
            }
            break;
        case jabaliEn:
            embitePorcino.atacar({
                atacante: enemigo,
                atacado: player,
                recuadroAtaque: recuadroEnemigo,
                recuadroAtacado: recuadroHeroe,
            })
            break;

    }
};