import { Piezabase } from "./PiezaBase";

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