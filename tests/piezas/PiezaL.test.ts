import { describe, expect, test } from "vitest";

import { PiezaL } from "../../src/piezas/PiezaL";

describe("Pruebas de la pieza L", () => {

    test("debe poder crearse como una instancia", () => {

        const pieza = new PiezaL();

        expect(pieza).toBeDefined();
    });

    test("debe tener la forma inicial de L", () => {

        const pieza = new PiezaL();

        const celdasEsperadas = [
            { fila: 0, columna: 0 },
            { fila: 1, columna: 0 },
            { fila: 2, columna: 0 },
            { fila: 2, columna: 1 }
        ];

        expect(pieza.getCeldas()).toEqual(celdasEsperadas);
    });

});