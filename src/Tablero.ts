import { Celdas } from "./Celdas";

export class Tablero {

    constructor(
        public ancho: number,
        public alto: number
    ) { }

    // Guarda todas las celdas que ya fueron colocadas en el tablero.
    private celdas: Celdas[] = [];


    // Comprueba si una posición está dentro de los límites del tablero.
    esPosicionValida(fila: number, columna: number): boolean {

        return (
            fila >= 0 &&
            fila < this.alto &&
            columna >= 0 &&
            columna < this.ancho
        );
    }


    // Agrega una pieza solamente si todas sus celdas están dentro del tablero.
    agregarPieza(celdas: Celdas[]): void {

        const posicionValida = celdas.every(celda =>
            this.esPosicionValida(celda.fila, celda.columna)
        );

        if (posicionValida) {
            this.celdas = this.celdas.concat(celdas);
        }
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

        if (this.puedeMoverAbajo(celdas)) {
            return this.moverAbajo(celdas);
        }

        this.agregarPieza(celdas);

        return celdas;
    }


    // Busca las líneas completas, las elimina
    // y hace bajar las celdas que estaban arriba.
    eliminarLineasCompletas(): number {

        const filasCompletas: number[] = [];

        // Recorremos todas las filas del tablero.
        for (let fila = 0; fila < this.alto; fila++) {

            // Contamos cuántas celdas hay en esta fila.
            const cantidad = this.celdas.filter(
                celda => celda.fila === fila
            ).length;

            // Si tiene tantas celdas como el ancho,
            // significa que la línea está completa.
            if (cantidad === this.ancho) {
                filasCompletas.push(fila);
            }
        }

        // Eliminamos las celdas que pertenecen a las líneas completas.
        this.celdas = this.celdas.filter(
            celda => !filasCompletas.includes(celda.fila)
        );

        // Hacemos bajar las celdas que estaban por encima
        // de alguna línea eliminada.
        this.celdas = this.celdas.map(celda => {

            const cantidadLineasDebajo = filasCompletas.filter(
                fila => fila > celda.fila
            ).length;

            return new Celdas(
                celda.fila + cantidadLineasDebajo,
                celda.columna
            );
        });

        // Devuelve cuántas líneas se eliminaron.
        return filasCompletas.length;
    }


    // Devuelve todas las celdas actuales del tablero.
    getCeldas(): Celdas[] {
        return this.celdas;
    }
}