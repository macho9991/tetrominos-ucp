/**
 * Representa un elemento individual de una pieza del Tetris.
 * Cada pieza se arma con 4 celdas.
 */
export class Celda{
    // El constructor recibe la posicion de la celda dentro de la pieza.
  // "public" declara la propiedad y la asigna en un solo paso.
  // "readonly" impide modificarla despues: una celda es una posicion fija.
    constructor(
        public readonly fila: number,
        public readonly columna: number
    ){}

    /**
   * Dos celdas son iguales si ocupan la misma posicion.
   *
   * Hace falta este metodo porque en JavaScript dos objetos distintos
   * nunca son iguales con ===, aunque tengan el mismo contenido:
   *
   *   new Celda(1,1) === new Celda(1,1)        --> false
   *   new Celda(1,1).equals(new Celda(1,1))    --> true
   */

    equals(otra: Celda): boolean{

    // "this" es esta celda, "otra" es la que llega por parametro.
    // === compara valor y tipo (nunca usar == en TypeScript).
    // && exige que las dos condiciones se cumplan.
    return this.fila === otra.fila && this.columna === otra.columna;
    }
}

 
  



