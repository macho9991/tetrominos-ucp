// Importamos el tablero del tetris.
import { Tablero } from "./Tablero";

// Importamos el reloj.
import { Reloj } from "./Reloj";

// Importamos una pieza.
import { PiezaPalo } from "./piezas/PiezaPalo";

export class Tetris {

    // Tablero donde se desarrolla el juego.
    tablero: Tablero;

    // Reloj que controla los turnos.
    reloj: Reloj;

    // Pieza que actualmente está cayendo.
    piezaActual: PiezaPalo;

    // Indica si el juego terminó.
    juegoTerminado: boolean;

    // Cuenta los turnos realizados.
    turnos: number;

    constructor() {

        // Creamos el tablero de 10 columnas y 20 filas.
        this.tablero = new Tablero(10, 20);

        // Creamos el reloj con un segundo de espera.
        this.reloj = new Reloj(1000);

        // Creamos la pieza inicial.
        this.piezaActual = new PiezaPalo();

        // El juego comienza activo.
        this.juegoTerminado = false;

        // Comenzamos con cero turnos.
        this.turnos = 0;
    }

    iniciar(): void {

        // Le indicamos al reloj qué debe hacer.
        this.reloj.iniciar(() => {
            this.avanzarTurno();
        });
    }

    tick(): void {

        // Permite hacer un tick manualmente.
        this.reloj.tick();
    }

    // Gira la pieza una cantidad aleatoria de veces.
    rotarAleatoriamente(): void {

        // Elegimos un número entre 0 y 3.
        const giros = Math.floor(Math.random() * 4);

        // Realizamos los giros.
        for (let i = 0; i < giros; i++) {
            this.piezaActual.rotarDerecha();
        }
    }

    avanzarTurno(): void {
        // 1. Cortocircuito: Sumamos un turno SOLO si el juego NO ha terminado
        !this.juegoTerminado && this.turnos++;

        // Obtenemos las celdas actuales de la pieza
        const celdasActuales = this.piezaActual.getCeldas();

        // 2. Comprobamos si puede bajar, condicionándolo a que el juego siga activo
        const puedeBajar = !this.juegoTerminado && this.tablero.puedeMoverAbajo(celdasActuales);

        // 3. Cortocircuito + Ternario para reemplazar el if...else
        !this.juegoTerminado && (
            puedeBajar
                ? this.piezaActual.actualizarCeldas(this.tablero.moverAbajo(celdasActuales))
                : this.tablero.agregarPieza(celdasActuales)
        );
    }

    }