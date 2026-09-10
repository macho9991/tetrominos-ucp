import { Piezabase } from "./PiezaBase";

// Pieza cuadrada de 2x2. Es la única que no cambia al rotar.
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