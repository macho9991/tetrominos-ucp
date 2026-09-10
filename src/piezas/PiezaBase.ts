import { Celdas } from "../Celdas";

/**
  [ABSTRACCIÓN] Concepto general de "pieza de Tetris": celdas, rotación, alto y ancho,
  sin decidir la forma concreta. Al ser abstract no se instancia: es la raíz de la
  [HERENCIA] de PiezaPalo, PiezaT, PiezaL, PiezaCuadrado y PiezaPerro.
 */
export abstract class Piezabase {

    // Nombre de la pieza.
    // [ENCAPSULAMIENTO] protected: el código externo solo accede vía getNombre/getCeldas.
    // Las subclases podrían tocarlo, pero ninguna lo hace: todas pasan por super().
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

        // Recorremos cada fila y columna de la matriz
        matriz.forEach((fila, f) => {

            fila.forEach((valor, c) => {

                // Si encontramos un 1, creamos una celda.
                valor === 1 && celdas.push(new Celdas(f, c));

            });
        });

        // Normalizamos: la pieza queda pegada al origen (0,0) sin importar
        // dónde estaba dibujada en la matriz. Así todas arrancan igual.
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

    // Compara la pieza con una forma esperada, sin importar el orden de las celdas.
    tieneForma(esperadas: Celdas[]): boolean {

        const mismoTamano = this.celdas.length === esperadas.length;

        const todasCoinciden = esperadas.every(celdaEsperada =>
            this.celdas.some(celdaActual =>
                celdaActual.equals(celdaEsperada)
            )
        );

        return mismoTamano && todasCoinciden;
    }

    // Gira 90° a la derecha: la columna pasa a ser la fila,
    // y la fila se invierte contra el alto para que no queden posiciones negativas.
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