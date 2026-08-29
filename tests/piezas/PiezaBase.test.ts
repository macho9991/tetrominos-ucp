import { describe, it, expect } from "vitest";
import { Piezabase } from "../../src/piezas/PiezaBase";
import { Celdas } from "../../src/Celdas";

// 1. CLASE FICCIONAL PARA PRUEBAS
// Hereda de PiezaBase para que podamos instanciarla y probar sus métodos.
class PiezaPrueba extends Piezabase {
    constructor(celdas: Celdas[]) {
        super("Prueba", celdas);
    }
}

// 2. EMPIEZAN LOS TESTS
describe("PiezaBase", () => {

    it("debería calcular el alto y ancho dinámicamente", () => {
        // Armamos una pieza horizontal de 3x1 (ej: un palo acostado)
        const celdas = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(0, 2)
        ];
        const pieza = new PiezaPrueba(celdas);

        // Fila máxima es 0 (0 + 1 = 1) -> Alto debe ser 1
        expect(pieza.alto()).toBe(1);

        // Columna máxima es 2 (2 + 1 = 3) -> Ancho debe ser 3
        expect(pieza.ancho()).toBe(3);
    });

    describe("tieneForma", () => {
        it("debería devolver true si tienen la misma figura exacta", () => {
            // Pieza original en cierto orden
            const celdasOriginales = [
                new Celdas(0, 0), new Celdas(0, 1)
            ];
            const pieza = new PiezaPrueba(celdasOriginales);

            // Celdas esperadas (las mismas, pero pasadas en orden distinto para probar)
            const esperadas = [
                new Celdas(0, 1), new Celdas(0, 0)
            ];

            expect(pieza.tieneForma(esperadas)).toBe(true);
        });

        it("debería devolver false si tienen distinta forma o tamaño", () => {
            const pieza = new PiezaPrueba([new Celdas(0, 0)]);

            // Tratamos de compararlo con una pieza de 2 bloques
            const esperadas = [new Celdas(0, 0), new Celdas(0, 1)];

            expect(pieza.tieneForma(esperadas)).toBe(false);
        });
    });

});
