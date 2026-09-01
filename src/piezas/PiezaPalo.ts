import { Piezabase } from "./PiezaBase";

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