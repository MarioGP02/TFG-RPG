class Heroe {
  constructor({ imagen, vida, posicion, ataque, mana, imagenBat, velocidad, width, height, frames = { max: 1, val }, direcciones = { val }, nivel, exp, expSigNvl, ptosAtrb }) {
    this.imagen = imagen,
      this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.mana = mana,
      this.velocidad = velocidad,
      this.imagen.onload = () => {
        this.width = this.imagen.width / this.frames.max,
          this.height = this.imagen.height / this.frames.max
      }
    this.frames = { ...frames, val: 0, lap: 0 },
      this.mov = false,
      this.direcciones = direcciones,
      this.imagenBat = imagenBat,
      this.desc = 'Heroe'
    this.enemigo = false,
      this.vidaMax = 100,
      this.manaMax = 35,
      this.enemigo = false,


      this.nivel = nivel,
      this.exp = exp,
      this.expSigNvl = expSigNvl,
      this.ptosAtrb = ptosAtrb

  }
  draw() {
    c.drawImage(this.imagen,
      this.frames.val * this.width,
      this.direcciones.val * this.height,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max
    );

    if (!this.mov) { return }
    else {
      if (this.frames.max > 1) {
        this.frames.lap++
      }
      if (this.frames.lap % 7 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++;
        } else {
          this.frames.val = 0;
        }
      }
    }
  }

  levelUp() {
    let nombreJug = getStorage('jugador');
    document.querySelector('#cajaDialogos').innerHTML = nombreJug + ' subio de nivel';
    this.nivel++;
    this.exp = 0;
    this.ptosAtrb += 5;
    this.expSigNvl = this.expSigNvl * 2;



    this.vidaMax += 10;
    this.manaMax += 5;
    this.ataque += this.nivel;
    this.velocidad += this.nivel;
  }


}

class Inmortal {
  constructor({ posicion, imagen, frames = { max: 1, val } }) {
    this.posicion = posicion,
      this.imagen = imagen,
      this.frames = frames,
      this.dibujado = false,
      this.lap


  }
  draw() {

    /*e.drawImage(this.imagen,
      0,
      0,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max
    );*/

    if (!this.dibujado) {
      let imagenA = document.createElement('img');
      imagenA.setAttribute('id', 'imginmortal');
      imagenA.setAttribute('src', this.imagen.src);
      imagenA.setAttribute('style', 'position:relative;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
      document.getElementById('espInmortal').appendChild(imagenA);
      this.dibujado = true;
      this.lap = 1;
    } else {
      this.lap++
      document.getElementById('imginmortal').setAttribute('src', './Imagenes/frameInmortal' + this.lap + '.png');

      if (this.lap == 4) {
        this.lap = 0;
      }

    }
    this.movLateral();

  }
  movLateral() {
    const tl = gsap.timeline();
    //Animacion1
    /*tl.to('#imgInmortal',{
      left:this.posicion.x + 35,
      top: this.posicion.y + 3,
      ease:"none",
    }).to('#imgInmortal',{
      top: this.posicion.y - 3,
      ease:"none",
    }).to('#imgInmortal',{
      left:this.posicion.x - 35,
      top: this.posicion.y + 3,
      ease:"none",
    }).to('#imgInmortal',{
      top: this.posicion.y - 3,
      ease:"none",
    }).to('#imgInmortal',{
      left:this.posicion.x,
      top:this.posicion.y,
      ease:"none",
      onComplete:()=>{
        this.draw();
      }
    })
    */
    //Animacion2
    tl.to('#imgInmortal', {
      top: this.posicion.y + 5,
      ease: "none",
      duration: 0.8
    }).to('#imgInmortal', {
      top: this.posicion.y - 5,
      ease: "none",
      duration: 1.1,
      onComplete: () => {
        this.draw();
      }
    })
  }
}

class Goblin {
  constructor({ imagen, vida, posicion, ataque, mana, velocidad, imagenBat }) {
    this.imagen = imagen,
      this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.mana = mana,
      this.velocidad = velocidad,
      this.imagen.onload = () => {
        this.width = this.imagen.width,
          this.height = this.imagen.height
      },
      this.imagenBat = imagenBat,
      this.desc = 'Goblin',
      this.enemigo = true,
      this.vidaMax = 65,
      this.manaMax = 16,

      this.expDada = 35


  }
  draw() {
    c.drawImage(this.imagen,
      0,
      0,
      this.imagen.width,
      this.imagen.height,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width,
      this.imagen.height
    );

  }
}

class Ogro {
  constructor({ imagen, vida, posicion, ataque, velocidad, imagenBat }) {
    this.imagen = imagen,
      this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagen.onload = () => {
        this.width = this.imagen.width,
          this.height = this.imagen.height
      },
      this.imagenBat = imagenBat,
      this.desc = 'Ogro',
      this.enemigo = true,
      this.vidaMax = 135,

      this.expDada = 65


  }
  draw() {
    c.drawImage(this.imagen,
      0,
      0,
      this.imagen.width,
      this.imagen.height,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width,
      this.imagen.height
    );

  }
}
class Lobo {
  constructor({ imagenBat, vida, posicion, ataque, velocidad }) {
    this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagenBat = imagenBat,
      this.imagenBat.onload = () => {
        this.width = this.imagenBat.width,
          this.height = this.imagenBat.height
      },
      this.desc = 'Lobo',
      this.enemigo = true,
      this.vidaMax = 85,

      this.expDada = 35
  }
}
class Alpha {
  constructor({ imagenBat, vida, posicion, ataque, velocidad }) {
    this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagenBat = imagenBat,
      this.desc = 'Alpha',
      this.enemigo = true,
      this.vidaMax = 105,

      this.expDada = 55
  }
}
class Serpiente {
  constructor({ imagenBat, vida, posicion, ataque, velocidad }) {
    this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagenBat = imagenBat,
      this.imagenBat.onload = () => {
        this.width = this.imagenBat.width,
          this.height = this.imagenBat.height
      },
      this.desc = 'Serpiente',
      this.enemigo = true,
      this.vidaMax = 65,

      this.expDada = 40
  }
}
class Jabali {
  constructor({ imagenBat, vida, posicion, ataque, velocidad }) {
    this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagenBat = imagenBat,
      this.imagenBat.onload = () => {
        this.width = this.imagenBat.width,
          this.height = this.imagenBat.height
      },
      this.desc = 'Jabali',
      this.enemigo = true,
      this.vidaMax = 125,

      this.expDada = 45
  }
}
class Rata {
  constructor({ imagenBat, vida, posicion, ataque, velocidad }) {
    this.vida = vida,
      this.posicion = posicion,
      this.ataque = ataque,
      this.velocidad = velocidad,
      this.imagenBat = imagenBat,
      this.imagenBat.onload = () => {
        this.width = this.imagenBat.width,
          this.height = this.imagenBat.height
      },
      this.desc = 'Rata',
      this.enemigo = true,
      this.vidaMax = 45,

      this.expDada = 15
  }
}

class Ataque {
  constructor({ imagen, nombre, posicion, potencia, alcance, mana, tipo, desc }) {
    this.imagen = imagen,
      this.nombre = nombre,
      this.potencia = potencia,
      this.posicion = posicion,
      this.alcance = alcance,
      this.mana = mana,
      this.tipo = tipo,
      this.desc = desc
  }

  atacar({ atacante, atacado, recuadroAtaque, recuadroAtacado, imagenATK }) {
    let porVRest;
    const tl = gsap.timeline();


    if (!atacante.enemigo) {
      if ((recuadroAtaque.numero + this.alcance) >= recuadroAtacado.numero && recuadroAtaque.letra == recuadroAtacado.letra) {
        atacado.vida -= (this.potencia + atacante.ataque);
        porVRest = (atacado.vida / atacado.vidaMax) * 100;

        if (this.tipo == 'magico') {
          if (atacante.mana >= this.mana) {
            atacante.mana -= this.mana;
            if (atacante.desc == 'Heroe') {
              document.getElementById('mana').innerHTML = 'Mana:' + atacante.mana + '/' + atacante.manaMax;
              let porManaRest = (atacante.mana / atacante.manaMax) * 100;
              gsap.to('#barraMana', {
                width: porManaRest
              });
            }
          } else {
            document.querySelector('#cajaDialogos').innerHTML = 'Mana insuficiente para realizar :' + this.nombre + '.';
            return;
          }
        }

        document.querySelector('#cajaDialogos').innerHTML = '-' + atacante.desc + ' uso ' + this.nombre + ': -' + (this.potencia + atacante.ataque) + 'HP';
        if (this.nombre == 'Golpe') {
          this.posicion.y = atacante.posicion.y;
          this.posicion.x = atacante.posicion.x + 35;
          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 15,
            duration: 0.8
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 20,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);

              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: 0.5,
                scale: 1.3,
                onComplete: () => {
                  imagenATK.remove();
                }
              });
              gsap.to('#vida' + atacado.desc, {
                width: porVRest + '%'
              });
              gsap.to('#imagen' + atacado.desc, {
                left: atacado.posicion.x + 10,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
              });
              gsap.to('#imagen' + atacado.desc, {
                opacity: 0.1,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
              });

            }
          }).to(this.posicion, {
            x: this.posicion.x + (atacado.posicion.x - atacante.posicion.x),
            duration: 0.5,
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.2
          }).to('#imagen' + atacado.desc, {
            opacity: 1,
            left: atacado.posicion.x,
            duration: 0.2
          })
        }
        if (this.nombre == 'BolaFuego') {



          this.posicion.y = atacante.posicion.y + 20;
          this.posicion.x = atacante.posicion.x + 75;

          let distancia = recuadroAtacado.numero - recuadroAtaque.numero;
          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 20,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);
              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: distancia,
                ease: "none",
                scale: 0.7,
                onComplete: () => {
                  imagenATK.remove();
                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    left: atacado.posicion.x + 10,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.2,
          })

        }

        if (this.nombre == 'Tempano') {
          this.posicion.y = atacante.posicion.y + 20;
          this.posicion.x = atacante.posicion.x + 75;

          let distancia = recuadroAtacado.numero - recuadroAtaque.numero;
          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 20,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);
              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: distancia,
                ease: "none",
                scale: 0.7,
                onComplete: () => {
                  imagenATK.remove();
                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    left: atacado.posicion.x + 10,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.2,
          })

        }



      } else {
        document.querySelector('#cajaDialogos').innerHTML = '-' + atacante.desc + ' uso ' + this.nombre + ': Fallo!!';

      }
    } else {

      if ((recuadroAtaque.numero - this.alcance) <= recuadroAtacado.numero && recuadroAtaque.letra == recuadroAtacado.letra) {
        atacado.vida -= (this.potencia + atacante.ataque);
        porVRest = (atacado.vida / atacado.vidaMax) * 100;
        document.querySelector('#cajaDialogos').innerHTML = '-' + atacante.desc + ' uso ' + this.nombre + ': -' + (this.potencia + atacante.ataque) + 'HP';
        if (this.nombre == 'GolpeGobin') {

          this.posicion.y = atacante.posicion.y;
          this.posicion.x = atacante.posicion.x + 35;
          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 15,
            duration: 0.8
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 20,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);

              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: 0.5,
                scale: 1.3,
                onComplete: () => {
                  imagenATK.remove();
                }
              });
              gsap.to('#vida' + atacado.desc, {
                width: porVRest + '%'
              });
              gsap.to('#imagen' + atacado.desc, {
                left: atacado.posicion.x - 10,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
              });
              gsap.to('#imagen' + atacado.desc, {
                opacity: 0.1,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
              });

            }
          }).to(this.posicion, {
            x: this.posicion.x + (atacado.posicion.x - atacante.posicion.x),
            duration: 0.5,
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.2
          }).to('#imagen' + atacado.desc, {
            opacity: 1,
            left: atacado.posicion.x,
            duration: 0.2
          })
        }
        if (this.nombre == 'EscupitajoVenenoso') {
          this.posicion.y = atacante.posicion.y + 10;
          this.posicion.x = atacante.posicion.x - 25;

          let distancia = recuadroAtaque.numero - recuadroAtacado.numero;
          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 20,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);
              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: distancia,
                ease: "none",
                onComplete: () => {
                  imagenATK.remove();
                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    left: atacado.posicion.x - 10,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.2,
          })
        }
        if (this.nombre == 'AplastaGoblins') {
          this.posicion.x = atacado.posicion.x;
          this.posicion.y = atacado.posicion.y;

          tl.to('#imagen' + atacante.desc, {
            top: atacante.posicion.y - 15,
            duration: 0.3,
          }).to('#imagen' + atacante.desc, {
            top: atacante.posicion.y,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);

              gsap.to('#img' + this.nombre, {
                top: this.posicion.y + atacado.height,
                duration: 1,
                onComplete: () => {
                  imagenATK.remove();
                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  })
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          });
        }
        if (this.nombre == 'PatadaOgra') {
          this.posicion.x = atacante.posicion.x;
          this.posicion.y = atacante.posicion.y;

          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 10,
            duration: 0.3
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 17,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);

              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: 1.3,
                onComplete: () => {
                  imagenATK.remove();
                  recuadroAtacado.numero--;
                  if (recuadroAtacado.numero < 0) {
                    recuadroAtacado.numero == 0;
                    recuadroAtaque.numero == 1;
                  }
                  player.posicion.x = recuadroAtacado.posicion.x + 15;
                  player.posicion.y = recuadroAtacado.posicion.y + 20;


                  participantesBatalla.forEach((participante, i) => {
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
                  });

                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  })
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.3
          })
        }
        if (this.nombre == 'Placaje') {

          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 10,
            duration: 0.3
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 19,
            duration: 0.3,
            onComplete: () => {
              gsap.to('#vida' + atacado.desc, {
                width: porVRest + '%'
              })
              gsap.to('#imagen' + atacado.desc, {
                opacity: 0.1,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
                onComplete: () => {
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 1,
                    duration: 0.2
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    left: atacado.posicion.x,
                    duration: 0.2
                  });
                }
              });

            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.3
          });



        }
        if (this.nombre == 'Mordisco') {
          this.posicion.x = atacante.posicion.x;
          this.posicion.y = atacante.posicion.y;

          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 5,
            duration: 0.3
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x - 10,
            duration: 0.3,
            onComplete: () => {
              imagenATK.setAttribute('id', 'img' + this.nombre);
              imagenATK.setAttribute('src', this.imagen.src);
              imagenATK.setAttribute('style', 'position:absolute;top:' + this.posicion.y + ';left:' + this.posicion.x + ';');
              document.getElementById('pantalla').appendChild(imagenATK);

              gsap.to('#img' + this.nombre, {
                left: atacado.posicion.x,
                duration: 1.3,
                onComplete: () => {
                  imagenATK.src = './Imagenes/mordiscoCerrado.png';


                  gsap.to('#vida' + atacado.desc, {
                    width: porVRest + '%'
                  })
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 0.1,
                    yoyo: true,
                    repeat: 4,
                    duration: 0.09,
                    onComplete: () => {
                      imagenATK.remove();
                      gsap.to('#imagen' + atacado.desc, {
                        opacity: 1,
                        duration: 0.2
                      });
                      gsap.to('#imagen' + atacado.desc, {
                        left: atacado.posicion.x,
                        duration: 0.2
                      });
                    }
                  });
                }
              });
            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.3
          })
        }
        if (this.nombre == 'Embite') {

          tl.to('#imagen' + atacante.desc, {
            left: atacante.posicion.x + 15,
            duration: 0.6
          }).to('#imagen' + atacante.desc, {
            left: atacado.posicion.x,
            duration: 0.4,
            onComplete: () => {
              recuadroAtaque.numero = recuadroAtacado.numero;
              recuadroAtacado.numero--;
              if (recuadroAtacado.numero < 0) {
                recuadroAtacado.numero == 0;
                recuadroAtaque.numero == 1;
              }
              player.posicion.x = recuadroAtacado.posicion.x + 15;
              player.posicion.y = recuadroAtacado.posicion.y + 20;

              atacado.posicion.x = recuadroAtaque.posicion.x + 15;
              atacado.posicion.y = recuadroAtaque.posicon.y + 20;

              participantesBatalla.forEach((participante, i) => {
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
              });

              gsap.to('#vida' + atacado.desc, {
                width: porVRest + '%'
              })
              gsap.to('#imagen' + atacado.desc, {
                opacity: 0.1,
                yoyo: true,
                repeat: 4,
                duration: 0.09,
                onComplete: () => {
                  gsap.to('#imagen' + atacado.desc, {
                    opacity: 1,
                    duration: 0.2
                  });
                  gsap.to('#imagen' + atacado.desc, {
                    left: atacado.posicion.x,
                    duration: 0.2
                  });
                }
              });

            }
          }).to('#imagen' + atacante.desc, {
            left: atacante.posicion.x,
            duration: 0.3
          });
        }
      }
      else {
        if (recuadroAtaque.letra == recuadroAtacado.letra) {
          recuadroAtaque.numero--;
        } else {
          if (recuadroAtaque.letra == 'B') {
            recuadroAtaque.letra = recuadroAtacado.letra;
          } else if (recuadroAtacado.letra == 'A' && recuadroAtaque.letra == 'C') {
            recuadroAtaque.letra = 'B';
          } else if (recuadroAtacado.letra == 'C' && recuadroAtaque.letra == 'A') {
            recuadroAtaque.letra = 'B';
          }
        }

      }
    }
  }

}

class Limite {
  static width = 64;
  static height = 64;
  constructor({ posicion }) {
    this.posicion = posicion;
    this.width = Limite.width;
    this.height = Limite.height;
  }

  draw() {
    c.fillStyle = 'rgba(255,0,0,0.1)';
    c.fillRect(this.posicion.x, this.posicion.y, Limite.width, Limite.height);
  }
}

class Entrada {
  static width = 64;
  static height = 64;
  constructor({ posicion, mapa1, mapa2 ,direccion}) {
    this.posicion = posicion;
    this.mapa1 = mapa1;
    this.mapa2 = mapa2;
    this.width = Entrada.width;
    this.height = Entrada.height;
    this.direccion = direccion;
  }
  draw() {
    c.fillStyle = 'rgba(0,0,255,0.1)';
    c.fillRect(this.posicion.x, this.posicion.y, Entrada.width, Entrada.height);
  }
}

class HierbaAlta {
  static width = 64;
  static height = 64;
  constructor({ posicion }) {
    this.posicion = posicion;
    this.width = HierbaAlta.width;
    this.height = HierbaAlta.height;
  }
  draw() {
    c.fillStyle = 'rgba(0,255,0,0.1)';
    c.fillRect(this.posicion.x, this.posicion.y, HierbaAlta.width, HierbaAlta.height);
  }
}

class Cama {
  static width = 64;
  static height = 64;
  constructor({posicion}){
    this.posicion = posicion;
    this.width = Cama.width;
    this.height = Cama.height;

  }
  draw(){
    c.fillStyle = 'rgba(255,255,0,0.1)';
    c.fillRect(this.posicion.x,this.posicion.y,Cama.width,Cama.height);
  }
}

class RecuadroBatalla {
  constructor({ posicion, letra, numero, imagen }) {
    this.posicion = posicion,
      this.letra = letra,
      this.numero = numero,
      this.imagen = imagen
  }
  draw() {
    c.drawImage(this.imagen,
      0,
      0,
      this.imagen.width,
      this.imagen.height,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width,
      this.imagen.height
    );
  }
}
class Cultivo {

}

class Sprite {
  constructor({ posicion, velocidad, imagen, frames = { max: 1 } }) {
    this.posicion = posicion;
    this.velocidad = velocidad;
    this.imagen = imagen;
    this.frames = frames;

  }
  draw() {

    c.drawImage(this.imagen,
      0,
      0,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max,
      this.posicion.x,
      this.posicion.y,
      this.imagen.width / this.frames.max,
      this.imagen.height / this.frames.max
    );
  }
}
