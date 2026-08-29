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

        // Retorna true SOLO SI tienen el mismo tamaño Y todas coinciden.
        return (this.celdas.length === esperadas.length) &&
            esperadas.every(celdaEsperada =>
                this.celdas.some(celdaActual =>
                    celdaActual.equals(celdaEsperada)
                )
            );
    }

}