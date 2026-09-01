import { test, expect } from "vitest";

import { PiezaZ } from "../../src/piezas/PiezaZ";
import { Celdas } from "../../src/Celdas";

test("debe tener la forma inicial de Z", () => {

    const pieza = new PiezaZ();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(0, 1),
        new Celdas(1, 1),
        new Celdas(1, 2)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});

test("debe rotar 90 grados", () => {

    const pieza = new PiezaZ();

    pieza.rotarDerecha();

    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 0)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});