const amarillo = document.getElementById('amarillo');
const rojo = document.getElementById('rojo');
const azul = document.getElementById('azul');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor() {        
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia(); //Generamos la secuencia de colores
        setTimeout(() => this.siguienteNivel(), 500);
    }

    inicializar() {        
        this.elegirColor = this.elegirColor.bind(this);
        this.toogleBtnEmpezar();
        this.nivel = 1;
        this.colores = { //Guardo los colores
            amarillo,
            rojo,
            azul,
            verde
        }
    }

    toogleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }

    generarSecuencia() {
        //Generamos un array de tamaño de 10 y lo rellenamos de 0´s, n del parametro es 0
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'amarillo';
            case 1:
                return 'rojo';

            case 2:
                return 'azul';
            case 3:
                return 'verde';
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'amarillo':
                return 0;
            case 'rojo':
                return 1;

            case 'azul':
                return 2;
            case 'verde':
                return 3;
        }
    }


    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    iluminarSecuencia() {
        //El ciclo va hasta el numero de repeticiones que tiene que hacer
        //Esto lo toma con base al nivel en el que se encuentra el usuario
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);            
            console.log(color);
            setTimeout(() => this.iluminarColor(color), 1000 * (i+1)); //           
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.rojo.addEventListener('click', this.elegirColor);
        this.colores.azul.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.rojo.removeEventListener('click', this.elegirColor);
        this.colores.azul.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick();
                if (this.nivel === ULTIMO_NIVEL + 1) {
                    this.ganoElJuego();
                } else {
                    setTimeout(this.siguienteNivel(), 3000);
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Felicidades', 'Ganaste el juego', 'success')
            .then(() => {
                this.inicializar();
            });
    }

    perdioElJuego() {
        swal('Lastimita', 'Perdiste el juego :(', 'error')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }
}

function empezarJuego() {
    var juego = new Juego();
}