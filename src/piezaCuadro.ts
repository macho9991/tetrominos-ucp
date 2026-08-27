import { Celda } from "./Celda";
import { PiezaBase } from "./piezaBase";

/**
 * Pieza cuadrada.
 *
 *   X X      celdas: (0,0) (0,1)
 *   X X              (1,0) (1,1)
 *
 * Es la pieza mas simetrica: al rotarla queda igual.
 * No necesita codigo especial para eso, la formula de PiezaBase
 * ya devuelve las mismas cuatro posiciones.
 */
export class PiezaCuadrado extends PiezaBase {

  // El constructor no recibe nada: la forma es siempre la misma.
  constructor() {
    // super() llama al constructor de PiezaBase.
    // Le pasa el nombre y las 4 celdas que definen la forma.
    // Tiene que ser la primera linea del constructor.
    super("Cuadrado", [
      new Celda(0, 0), new Celda(0, 1),
      new Celda(1, 0), new Celda(1, 1)
    ]);
  }
}