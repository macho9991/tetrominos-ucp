import { Celda } from "./Celda";
import { PiezaBase } from "./piezaBase";

/**
 * Pieza en forma de L.
 *
 *   X .      celdas: (0,0)
 *   X .              (1,0)
 *   X X              (2,0) (2,1)
 *
 * Es la opuesta al cuadrado: no tiene simetria, asi que necesita
 * las 4 rotaciones para volver a su forma original.
 */
export class PiezaL extends PiezaBase {
  constructor() {
    super("L", [ //implemento por tuplas
      new Celda(0, 0),
      new Celda(1, 0),
      new Celda(2, 0),
      new Celda(2, 1)
    ]);
  }
}