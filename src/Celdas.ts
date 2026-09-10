// Una posición del tablero: fila y columna.
// Es inmutable: para mover una celda se crea una nueva, no se modifica esta.
export class Celdas {

    constructor(
        public readonly fila: number,
        public readonly columna: number
    ) { }

    // Dos celdas son iguales si están en la misma posición.
    equals(otra: Celdas): boolean {
        return this.fila === otra.fila && this.columna === otra.columna;
    }

}