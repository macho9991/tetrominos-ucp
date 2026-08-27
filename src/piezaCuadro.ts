import { PiezaBase } from "./piezaBase";

/**
 *   X X
 *   X X
 */
export class PiezaCuadrado extends PiezaBase {
  constructor() {
    super("Cuadrado", PiezaBase.desdeMatriz([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]));
  }
}