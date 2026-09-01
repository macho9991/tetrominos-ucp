import { Piezabase } from "./PiezaBase";

export class PiezaZ extends Piezabase {

    constructor() {
        super(
            "Z",
            Piezabase.desdeMatriz([
                [1, 1, 0],
                [0, 1, 1]
            ])
        );
    }
}