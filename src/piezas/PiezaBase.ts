import { Celdas } from "../Celdas";

export abstract class Piezabase {

    protected nombre: string;
    protected celdas: Celdas[];

    constructor(nombre: string, celdas: Celdas[]) {
        this.nombre = nombre;
        this.celdas = celdas;
    }

    public static desdeMatriz(matriz: number[][]): Celdas[] {

        const celdas: Celdas[] = [];

        matriz.forEach((fila, f) => {
            fila.forEach((valor, c) => {
                valor === 1 && celdas.push(new Celdas(f, c));
            });
        });

        const minFila = Math.min(...celdas.map(c => c.fila));
        const minColumna = Math.min(...celdas.map(c => c.columna));

        return celdas.map(celda =>
            new Celdas(
                celda.fila - minFila,
                celda.columna - minColumna
            )
        );
    }

    getNombre(): string {
        return this.nombre;
    }

    getCeldas(): Celdas[] {
        return this.celdas;
    }

    alto(): number {
        return Math.max(...this.celdas.map(c => c.fila)) + 1;
    }

    ancho(): number {
        return Math.max(...this.celdas.map(c => c.columna)) + 1;
    }

    tieneForma(esperadas: Celdas[]): boolean {

        const mismoTamano = this.celdas.length === esperadas.length;

        const todasCoinciden = esperadas.every(celdaEsperada =>
            this.celdas.some(celdaActual =>
                celdaActual.equals(celdaEsperada)
            )
        );

        return mismoTamano && todasCoinciden;
    }

    rotarDerecha(): void {

        const alto = this.alto();

        this.celdas = this.celdas.map(celda =>
            new Celdas(
                celda.columna,
                alto - 1 - celda.fila
            )
        );
    }

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