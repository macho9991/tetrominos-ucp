import { test, expect } from "vitest";

// Importamos la pieza T.
import { PiezaT } from "../../src/piezas/PiezaT";

// Importamos Celdas.
import { Celdas } from "../../src/Celdas";


test("debe tener la forma inicial de T", () => {

    // Creamos la pieza.
    const pieza = new PiezaT();

    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(1, 2)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la derecha", () => {

    // Creamos la pieza.
    const pieza = new PiezaT();

    // Giramos a la derecha.
    pieza.rotarDerecha();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 0)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la izquierda", () => {

    // Creamos la pieza.
    const pieza = new PiezaT();

    // Giramos a la izquierda.
    pieza.rotarIzquierda();

    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 1)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});