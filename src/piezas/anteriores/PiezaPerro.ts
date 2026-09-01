import { PiezaBase } from "./PiezaBase"
export class PiezaPerro extends PiezaBase {
    constructor() {
        super();
        this.matriz = [
            [0, 1, 1],
            [1, 1, 0]
        ];
    }
}