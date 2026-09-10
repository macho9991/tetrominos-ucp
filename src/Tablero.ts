import { Celdas } from "./Celdas";

export class Tablero {

    constructor(
        public ancho: number,
        public alto: number
    ) { }

    // Guarda todas las celdas que ya fueron colocadas en el tablero.
    private celdas: Celdas[] = [];


    // Comprueba si una celda del tablero está libre.
    estaLibre(fila: number, columna: number): boolean {

        return !this.celdas.some(
            celda => celda.fila === fila && celda.columna === columna
        );
    }


    // Una posición sirve si está dentro del tablero y además está libre.
    esPosicionValida(fila: number, columna: number): boolean {

        const dentroDelTablero =
            fila >= 0 &&
            fila < this.alto &&
            columna >= 0 &&
            columna < this.ancho;

        return dentroDelTablero && this.estaLibre(fila, columna);
    }


    // Agrega una pieza solamente si todas sus celdas están libres y dentro del tablero.
    agregarPieza(celdas: Celdas[]): void {

        const posicionValida = celdas.every(celda =>
            this.esPosicionValida(celda.fila, celda.columna)
        );

        this.celdas = posicionValida ? this.celdas.concat(celdas) : this.celdas;
    }


    // Mueve una pieza una fila hacia abajo.
    moverAbajo(celdas: Celdas[]): Celdas[] {

        return celdas.map(celda =>
            new Celdas(
                celda.fila + 1,
                celda.columna
            )
        );
    }


    // Comprueba si todas las celdas de una pieza pueden bajar una fila.
    puedeMoverAbajo(celdas: Celdas[]): boolean {

        return celdas.every(celda =>
            this.esPosicionValida(
                celda.fila + 1,
                celda.columna
            )
        );
    }


    // Si la pieza puede bajar, la mueve.
    // Si no puede bajar, la deja colocada en el tablero.
    moverPieza(celdas: Celdas[]): Celdas[] {

        const puedeBajar = this.puedeMoverAbajo(celdas);
        !puedeBajar && this.agregarPieza(celdas);
        return puedeBajar ? this.moverAbajo(celdas) : celdas;
    }


    // Busca las líneas completas (filas y columnas), las elimina
    // y hace bajar las celdas que estaban arriba.
    eliminarLineasCompletas(): number {

        const filasCompletas: number[] = [];
        const columnasCompletas: number[] = [];

        // Una fila está completa si tiene tantas celdas como el ancho del tablero.
        for (let fila = 0; fila < this.alto; fila++) {

            const cantidad = this.celdas.filter(
                celda => celda.fila === fila
            ).length;

            (cantidad === this.ancho) && filasCompletas.push(fila);
        }

        // Una columna está completa si tiene tantas celdas como el alto del tablero.
        for (let columna = 0; columna < this.ancho; columna++) {

            const cantidad = this.celdas.filter(
                celda => celda.columna === columna
            ).length;

            (cantidad === this.alto) && columnasCompletas.push(columna);
        }

        // Eliminamos las celdas que pertenecen a una fila o a una columna completa.
        this.celdas = this.celdas.filter(celda =>
            !filasCompletas.includes(celda.fila) &&
            !columnasCompletas.includes(celda.columna)
        );

        // Hacemos bajar las celdas que estaban por encima
        // de alguna fila eliminada. Las columnas no desplazan nada.
        this.celdas = this.celdas.map(celda => {

            const cantidadLineasDebajo = filasCompletas.filter(
                fila => fila > celda.fila
            ).length;

            return new Celdas(
                celda.fila + cantidadLineasDebajo,
                celda.columna
            );
        });

        // Devuelve cuántas líneas se eliminaron, sumando filas y columnas.
        return filasCompletas.length + columnasCompletas.length;
    }
    
    /*
    //modificado
    // Devuelve una copia de las celdas del tablero.
    // Copiamos para que nadie pueda modificar el estado interno desde afuera.
    getCeldas(): Celdas[] {
        return [...this.celdas];
    }
    */


    // Devuelve una copia de las celdas del tablero.
    // Copiamos para que nadie pueda modificar el estado interno desde afuera.
    getCeldas(): Celdas[] {
        return this.celdas;
    }
    
}