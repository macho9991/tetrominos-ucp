import { describe, it, expect } from "vitest";

import { PiezaCuadrado } from "../../src/piezas/PiezaCuadrado";
import { Celdas } from "../../src/Celdas";

describe("PiezaCuadrado", () => {

    it("debería llamarse 'Cuadrado'", () => {

        const pieza = new PiezaCuadrado();

        expect(pieza.getNombre()).toBe("Cuadrado");
    });

    it("debería tener 4 celdas formando un cuadrado", () => {

        const pieza = new PiezaCuadrado();

        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);
    });

    it("debería mantener su forma después de rotar", () => {

        const pieza = new PiezaCuadrado();

        pieza.rotarDerecha();

        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);
    });

});