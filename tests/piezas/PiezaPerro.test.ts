import { test, expect } from "vitest";

import { PiezaPerro } from "../../src/piezas/PiezaPerro";
import { Celdas } from "../../src/Celdas";

test("debe tener la forma inicial de perro", () => {

    const pieza = new PiezaPerro();

    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(1, 0),
        new Celdas(1, 1)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});

test("debe rotar 90 grados", () => {

    const pieza = new PiezaPerro();

    pieza.rotarDerecha();

    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 0)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);
});