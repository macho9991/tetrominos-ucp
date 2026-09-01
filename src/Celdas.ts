export class Celdas {

    constructor(
        public readonly fila: number,
        public readonly columna: number
    ) { }

    equals(otra: Celdas): boolean {
        return this.fila === otra.fila && this.columna === otra.columna;
    }

}