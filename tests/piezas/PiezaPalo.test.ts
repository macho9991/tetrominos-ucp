import { test, expect } from "vitest";

import { PiezaPalo } from "../../src/piezas/PiezaPalo";
import { Celdas } from "../../src/Celdas";

test("debe tener la forma inicial de palo", () => {

    const pieza = new PiezaPalo();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(2, 0),
        new Celdas(3, 0)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});

test("debe rotar 90 grados", () => {

    const pieza = new PiezaPalo();

    pieza.rotarDerecha();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(0, 3)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});