import { PiezaBase } from "./piezaBase";

/**
 *   X .
 *   X .
 *   X X
 */
export class PiezaL extends PiezaBase {
  constructor() {
    super("L", PiezaBase.desdeMatriz([
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]));
  }
}