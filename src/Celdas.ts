export class Celdas {
    constructor(
        public readonly fila: number,
        public readonly columna: number
    ) { }
    //definicion de clase

    //compara si las cendas estan en la misma posicion
    equals(otra: Celdas): boolean {
        return this.fila === otra.fila && this.columna === otra.columna;
    }
}

/*
 * ============================================================================
 * NOTA PARA EL EQUIPO:
 * 
 *  Cómo se relaciona con las matrices?
 *    Al armar las piezas (T, L, Palo, etc.) podemos seguir diseñándolas
 *    visualmente con matrices de 0s y 1s. Luego, el método `desdeMatriz()`
 *    de `PiezaBase` recorre esa matriz y genera automáticamente este
 *    array de 4 celdas.
 * 
 * Cómo se usa en el Tablero?
 *    Para mover, rotar o chequear colisiones contra la grilla del tablero,
 *    solo trabajamos con las 4 celdas ocupadas, lo cual hace el código
 *    mucho más directo y rápido.
 * ============================================================================
 */
