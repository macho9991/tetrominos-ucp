import { Celdas } from "../Celdas";

export abstract class Piezabase {

    // Nombre de la pieza.
    protected nombre: string;

    // Celdas que forman la pieza.
    protected celdas: Celdas[];

    constructor(nombre: string, celdas: Celdas[]) {

        // Guardamos el nombre.
        this.nombre = nombre;

        // Guardamos las celdas iniciales.
        this.celdas = celdas;
    }

    // Convierte una matriz de 0 y 1 en celdas.
    public static desdeMatriz(matriz: number[][]): Celdas[] {

        const celdas: Celdas[] = [];

        // Recorremos cada fila y columna de la matriz.
        matriz.forEach((fila, f) => {

            fila.forEach((valor, c) => {

                // Si encontramos un 1, creamos una celda.
                valor === 1 && celdas.push(new Celdas(f, c));

            });
        });

        // Buscamos la fila y columna más pequeñas.
        const minFila = Math.min(...celdas.map(c => c.fila));
        const minColumna = Math.min(...celdas.map(c => c.columna));

        // Ajustamos las posiciones para comenzar desde 0.
        return celdas.map(celda =>
            new Celdas(
                celda.fila - minFila,
                celda.columna - minColumna
            )
        );
    }

    // Devuelve el nombre de la pieza.
    getNombre(): string {
        return this.nombre;
    }

    // Devuelve las celdas de la pieza.
    getCeldas(): Celdas[] {
        return this.celdas;
    }

    // Actualiza las celdas de la pieza.
    actualizarCeldas(celdas: Celdas[]): void {

        // Reemplazamos las celdas actuales por las nuevas.
        this.celdas = celdas;
    }

    // Calcula el alto de la pieza.
    alto(): number {
        return Math.max(...this.celdas.map(c => c.fila)) + 1;
    }

    // Calcula el ancho de la pieza.
    ancho(): number {
        return Math.max(...this.celdas.map(c => c.columna)) + 1;
    }

    // Comprueba si la pieza tiene una forma determinada.
    tieneForma(esperadas: Celdas[]): boolean {

        const mismoTamano = this.celdas.length === esperadas.length;

        const todasCoinciden = esperadas.every(celdaEsperada =>
            this.celdas.some(celdaActual =>
                celdaActual.equals(celdaEsperada)
            )
        );

        return mismoTamano && todasCoinciden;
    }

    // Gira la pieza hacia la derecha.
    rotarDerecha(): void {

        const alto = this.alto();

        this.celdas = this.celdas.map(celda =>
            new Celdas(
                celda.columna,
                alto - 1 - celda.fila
            )
        );
    }

    // Gira la pieza hacia la izquierda.
    rotarIzquierda(): void {

        const ancho = this.ancho();

        this.celdas = this.celdas.map(celda =>
            new Celdas(
                ancho - 1 - celda.columna,
                celda.fila
            )
        );
    }
}