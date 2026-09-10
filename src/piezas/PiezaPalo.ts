import { Piezabase } from "./PiezaBase";

// Pieza recta de 4 celdas. Es la más larga y la única que llega a 4 de alto.
export class PiezaPalo extends Piezabase {

    constructor() {
        super(
            "Palo",
            Piezabase.desdeMatriz([
                [1],
                [1],
                [1],
                [1]
            ])
        );
    }
}