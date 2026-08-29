import { Celdas } from "../Celdas";

/*Clase abstracta que define la estructura y comportamiento común
 * de todas las piezas del juego Tetris.*/

export abstract class Piezabase {
    // Atributos protegidos: accesibles por las clases hijas 
    protected nombre: string;
    protected celdas: Celdas[];

    /**
     El constructor asigna los valores iniciales.
     Quien herede de esta clase (ej: PiezaCuadrado) deberá llamar a super() 
     pasándole el nombre y su arreglo de celdas inicial.
     */

    constructor(nombre: string, celdas: Celdas[]) {
        this.nombre = nombre;
        this.celdas = celdas;
    }

    // ==========================================
    // MÉTODOS DE CONSTRUCCIÓN
    // ==========================================

    /**
     * Convierte una matriz de 0 y 1 en la lista de celdas ocupadas.
     * "static" significa que pertenece a la clase, no a las instancias.
     */
    protected static desdeMatriz(matriz: number[][]): Celdas[] {
        const enBruto: Celdas[] = [];

        // Buscamos los 1s usando corto circuito
        matriz.forEach((fila, f) => {
            fila.forEach((valor, c) => {
                valor === 1 && enBruto.push(new Celdas(f, c));
            });
        });

        if (enBruto.length === 0) return [];

        // Buscamos la fila y columna mínimas para pegarla a la esquina (0,0)
        const minFila = Math.min(...enBruto.map(c => c.fila));
        const minColumna = Math.min(...enBruto.map(c => c.columna));

        return enBruto.map(c => new Celdas(c.fila - minFila, c.columna - minColumna));
    }

    //(encapsulamiento)
    // Expone el nombre de forma segura (solo lectura) 

    getNombre(): string {
        return this.nombre;
    }

    //Expone la lista de celdas de forma segura (solo lectura)
    getCeldas(): Celdas[] {
        return this.celdas;
    }

    // Métodos de utilidad
    /*
      Calcula dinámicamente el alto actual de la pieza.
      
      Explicación:
      1. .map(c => c.fila) extrae solo las filas de las 4 celdas.
      2. Math.max(...) busca la fila más grande.
      3. Se suma + 1 porque las filas empiezan a contarse desde 0.
     */

    alto(): number {
        return Math.max(...this.celdas.map(c => c.fila)) + 1;
    }

    /**
     Calcula dinámicamente el ancho actual de la pieza.
      
      Explicación:
      1. .map(c => c.columna) extrae solo las columnas.
      2. Math.max(...) encuentra la columna más grande.
      3. Se suma + 1 porque las columnas también empiezan en 0.
     */

    ancho(): number {
        return Math.max(...this.celdas.map(c => c.columna)) + 1;
    }

    /**
      Comprueba si la pieza tiene una forma específica, independientemente de su posición.
      
      Útil para identificar la forma base de una pieza (por ejemplo, si es una 'S' o una 'T').
      
      esperadas Un array de Celdas que representan la forma a comparar (normalmente relativas a (0,0)).
      returns True si la forma coincide, false en caso contrario.

     */

    tieneForma(esperadas: Celdas[]): boolean {
        // Guardamos las comprobaciones booleanas en constantes para mayor legibilidad
        const mismoTamano = this.celdas.length === esperadas.length;

        const todasCoinciden = esperadas.every(celdaEsperada =>
            this.celdas.some(celdaActual =>
                celdaActual.equals(celdaEsperada)
            )
        );

        // Retorna true SOLO SI tienen el mismo tamaño Y todas coinciden.
        return mismoTamano && todasCoinciden;
    }

    /** Gira la pieza 90 grados a la derecha. */
    rotarDerecha(): void {
        const alto = this.alto(); // Se guarda ANTES de rotar
        this.celdas = this.celdas.map(c => new Celdas(c.columna, alto - 1 - c.fila));
    }

    /** Gira 90 grados a la izquierda. */
    rotarIzquierda(): void {
        const ancho = this.ancho(); // Se guarda ANTES de rotar
        this.celdas = this.celdas.map(c => new Celdas(ancho - 1 - c.columna, c.fila));
    }

}

