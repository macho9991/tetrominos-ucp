import { Piezabase } from "./PiezaBase";

// Pieza en forma de T: una fila de tres celdas con una saliente en el medio.
// [HERENCIA] Extiende Piezabase igual que el resto de las piezas concretas.
export class PiezaT extends Piezabase {

    constructor() {

        super(
            "T",
            Piezabase.desdeMatriz([
                [0, 1, 0],
                [1, 1, 1]
            ])
        );

    }

}