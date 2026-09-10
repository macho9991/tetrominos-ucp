import { Piezabase } from "./PiezaBase";

// Pieza en forma de L: tres celdas verticales y una al pie, hacia la derecha.
// [HERENCIA] Extiende Piezabase igual que el resto de las piezas concretas.
export class PiezaL extends Piezabase {

    constructor() {
        super(
            "L",
            Piezabase.desdeMatriz([
                [1, 0],
                [1, 0],
                [1, 1]
            ])
        );
    }
}