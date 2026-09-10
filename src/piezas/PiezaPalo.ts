import { Piezabase } from "./PiezaBase";

// Pieza recta de 4 celdas. Es la más larga y la única que llega a 4 de alto.
// [HERENCIA] Extiende Piezabase: reutiliza toda su lógica de rotación,
// medidas (alto/ancho) y comparación de forma. Solo aporta su propia forma
// llamando a super(nombre, celdas).
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