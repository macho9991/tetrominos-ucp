import { Piezabase } from "./PiezaBase";

/**
 * Representa la pieza Cuadrado (también conocida como tetromino 'O').
 * 
 * Forma geométrica:
 *   X X
 *   X X
 */
export class PiezaCuadrado extends Piezabase {
    constructor() {
        // Llamamos a 'super' (el constructor de Piezabase)
        // Le pasamos el nombre de la pieza y usamos desdeMatriz para generar las celdas.
        super("Cuadrado", Piezabase.desdeMatriz([
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]));
    }
}
