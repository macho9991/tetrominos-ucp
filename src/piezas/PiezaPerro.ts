import { Piezabase } from "./PiezaBase";

// Pieza en forma de S: dos pares de celdas desplazados en escalón.
// [HERENCIA] Extiende Piezabase igual que el resto de las piezas concretas.
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