import { Piezabase } from "./PiezaBase";

export class PiezaT extends Piezabase {

    constructor() {

        super(
            "T",
            Piezabase.desdeMatriz([
                [0, 1, 0],
                [1, 1, 1]
            ])
        );

    }

}