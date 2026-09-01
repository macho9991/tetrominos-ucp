import { Piezabase } from "./PiezaBase";

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