import { Piezabase } from "./PiezaBase";

// Pieza en forma de S: dos pares de celdas desplazados en escalón.
export class PiezaPerro extends Piezabase {

    constructor() {
        super(
            "Perro",
            Piezabase.desdeMatriz([
                [0, 1, 1],
                [1, 1, 0]
            ])
        );
    }
}