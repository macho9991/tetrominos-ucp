import { Piezabase } from "./PiezaBase";

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