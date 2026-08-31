// Importamos nuestras dos clases compañeras
import { Tablero } from './Tablero';
import { Reloj } from './Reloj';

export class Tetris {
    tablero: Tablero;
    reloj: Reloj;
    juegoTerminado: boolean;

    constructor() {
        this.tablero = new Tablero(10, 20); // Creamos la cancha de 10x20
        this.reloj = new Reloj(1000);       // Suponiendo que el reloj baja cada 1 segundo (1000ms)
        this.juegoTerminado = false;        // Obviamente, empezamos vivos
    }

    iniciar() {
        // Le decimos al reloj: "Cada vez que hagas TIC, avanza un turno"
        this.reloj.iniciar(() => {
            this.avanzarTurno();
        });
    }

    avanzarTurno() {
        // AQUÍ ESTÁ NUESTRO ÚNICO "IF" PERMITIDO EN TETRIS (El 2do en total)
        // Si el juego ya terminó, cortamos la ejecución aquí mismo y no hacemos nada.
        if (this.juegoTerminado === true) {
            return; 
        }

        // Si la computadora llega a esta línea, significa que seguimos vivos
        console.log("El juego avanza: la pieza baja un casillero...");
        
        // (Aquí iría la lógica matemática para hacer que la pieza baje, sin usar más IFs)
    }
}