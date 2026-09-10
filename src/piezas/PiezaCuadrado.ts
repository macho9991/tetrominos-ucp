import { Piezabase } from "./PiezaBase";

// Pieza cuadrada de 2x2. Es la única que no cambia al rotar.
// [HERENCIA] Extiende Piezabase igual que el resto de las piezas concretas.
export class PiezaCuadrado extends Piezabase {

    constructor() {
        super(
            "Cuadrado",
            Piezabase.desdeMatriz([
                [1, 1],
                [1, 1]
            ])
        );
    }
}