// Importamos el tablero del tetris.
import { Tablero } from "./Tablero";

// Importamos el reloj.
import { Reloj } from "./Reloj";

// Importamos una pieza.
import { PiezaPalo } from "./piezas/PiezaPalo";

//importamos pieza base
import { Piezabase } from "./piezas/PiezaBase";

//importamos celdas
import { Celdas } from "./Celdas";

const COLUMNAS = 10;
const FILAS = 20;
const MS_POR_TURNO = 1000; //significa que cada turno automático ocurre cada 1000 milisegundos = 1 segundo.
const LINEAS_PARA_GANAR = 40;//establece que el jugador gana cuando llega a 40 líneas borradas
const ROTACIONES_POSIBLES = 4;//representa las 4 orientaciones posibles de una pieza: 0°, 90°, 180° y 270°

/**
 [ABSTRACCIÓN] Abstrae "cómo se consigue la próxima pieza": Tetris no sabe
 ni le importa qué pieza concreta se crea, solo conoce esta función que
 le devuelve algo compatible con Piezabase.
 */
export type FabricaDePieza = () => Piezabase;

export class Tetris {

    // Tablero donde se desarrolla el juego.
    tablero: Tablero;

    // Reloj que controla los turnos.
    reloj: Reloj;

    // Pieza que actualmente está cayendo. Puede ser cualquiera de las cinco.
    // [ABSTRACCIÓN + POLIMORFISMO] Se declara con el tipo abstracto Piezabase,
    // no con una pieza concreta: en tiempo de ejecución puede ser un PiezaPalo,
    // PiezaT, PiezaL, PiezaCuadrado o PiezaPerro, y el resto de esta clase
    // (jugarTurno, fijarPieza, rotarAleatoriamente) no necesita distinguir cuál es.
    piezaActual: Piezabase;

    // Indica si el juego terminó.
    juegoTerminado: boolean;

    // Indica si la partida se ganó llegando a la meta de líneas.
    juegoGanado: boolean;

    // Acumula las líneas eliminadas en toda la partida.
    lineasBorradas: number;

    // Cuenta los turnos realizados.
    turnos: number;

    // Cuenta las piezas que quedaron fijas en el tablero.
    piezasColocadas: number;

    /**
     De dónde salen las piezas. Los tests le pasan la que necesitan.
     [ENCAPSULAMIENTO] Es privada: el resto del juego no sabe cómo
     se fabrica la próxima pieza, solo que this.fabrica() le da una.
     */
    private fabrica: FabricaDePieza;


   constructor(fabrica: FabricaDePieza = () => new PiezaPalo()) {

        // Armamos el juego: tablero, reloj, primera pieza y contadores en cero.
        this.fabrica = fabrica;

        this.tablero = new Tablero(COLUMNAS, FILAS);

        this.reloj = new Reloj(MS_POR_TURNO);
        
        this.piezaActual = this.fabrica();
        
        this.juegoTerminado = false;
        
        this.juegoGanado = false;
        
        this.lineasBorradas = 0;
        
        this.turnos = 0;
        
        this.piezasColocadas = 0;

    }

    iniciar(): void {
        this.reloj.iniciar(() => this.avanzarTurno());
    }

    tick(): void {
        this.reloj.tick();
    }

    /**
     Compuerta del juego: el turno se juega sólo si la partida sigue activa.
     Si ya terminó, la llamada no hace nada.
     */

    avanzarTurno(): void {
        !this.juegoTerminado && this.jugarTurno();
    }

    /**
     Un turno real: la pieza baja una fila.
     Si ya no puede bajar, queda fija y aparece la siguiente.
     */
    private jugarTurno(): void {

        this.turnos++;

        const celdas = this.piezaActual.getCeldas();

        // O la pieza baja una fila, o queda fija en el tablero.
        this.tablero.puedeMoverAbajo(celdas)
            ? this.piezaActual.actualizarCeldas(this.tablero.moverAbajo(celdas))
            : this.fijarPieza();
    }
   /**
     Apoya la pieza donde quedó, borra las líneas completas y trae una nueva.
     Si la nueva no entra en el tablero, se terminó la partida.
     */
fijarPieza(): void{
    // Corre una vez por cada pieza que deja de moverse.
    this.piezasColocadas++;
    
    this.tablero.agregarPieza(this.piezaActual.getCeldas()); 

    // eliminarLineasCompletas() devuelve cuántas líneas borró (filas + columnas).
    this.lineasBorradas += this.tablero.eliminarLineasCompletas();

    this.piezaActual=this.fabrica();
        
    // Ganamos al llegar a la meta de líneas.
    this.juegoGanado = this.lineasBorradas >= LINEAS_PARA_GANAR;

    // La pieza nueva entra sólo si todas sus celdas caen en lugares libres.
    const posicionLibre = this.piezaActual.getCeldas().every((celda: Celdas) =>
    this.tablero.esPosicionValida(celda.fila, celda.columna)
    );
    
    // Termina si la pieza no entra (perdimos) o si llegamos a la meta (ganamos).
    this.juegoTerminado = !posicionLibre || this.juegoGanado;
    }

    /**
       Gira la pieza actual entre 0 y 3 veces. Todavía no se usa en la partida.
       [POLIMORFISMO] No importa qué pieza concreta sea piezaActual: cada una
       ejecuta su propia rotarDerecha() heredada de Piezabase.
     */
    rotarAleatoriamente(): void {
        const giros = Math.floor(Math.random() * ROTACIONES_POSIBLES);

        for (let i = 0; i < giros; i++) {
            this.piezaActual.rotarDerecha();
        }
    }
}

/*Math.random() genera un número aleatorio, 
lo multiplicamos por 4 para obtener las cuatro 
posibilidades de rotación y Math.floor() 
elimina los decimales para quedarnos con 0, 1, 2 o 3
*/
//for gira la pieza esa cantidad de veces

    /*
     * Math.random() genera un número aleatorio entre 0 y casi 1.
     *
     * Por ejemplo:
     * Math.random() podría devolver:
     *
     * 0.12
     * 0.48
     * 0.73
     * 0.99
     *
     * Como ROTACIONES_POSIBLES vale 4, multiplicamos por 4:
     *
     * 0.12 * 4 = 0.48
     * 0.48 * 4 = 1.92
     * 0.73 * 4 = 2.92
     * 0.99 * 4 = 3.96
     *
     * Math.floor() redondea hacia abajo:
     *
     * 0.48 -> 0
     * 1.92 -> 1
     * 2.92 -> 2
     * 3.96 -> 3
     *
     * Por lo tanto, giros solamente puede valer 0, 1, 2 o 3.
     */

    /*
     * Repetimos la rotación según la cantidad de giros obtenida.
     *
     * giros = 0 -> no gira
     * giros = 1 -> gira 1 vez
     * giros = 2 -> gira 2 veces
     * giros = 3 -> gira 3 veces
     */
