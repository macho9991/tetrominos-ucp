import { test, expect } from "vitest";

// Importamos la pieza Palo.
import { PiezaPalo } from "../../src/piezas/PiezaPalo";

// Importamos Celdas.
import { Celdas } from "../../src/Celdas";


test("debe tener la forma inicial de palo", () => {

    // Creamos el palo.
    const pieza = new PiezaPalo();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(2, 0),
        new Celdas(3, 0)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la derecha", () => {

    // Creamos el palo.
    const pieza = new PiezaPalo();

    // Giramos a la derecha.
    pieza.rotarDerecha();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(0, 3)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la izquierda", () => {

    // Creamos el palo.
    const pieza = new PiezaPalo();

    // Giramos a la izquierda.
    pieza.rotarIzquierda();

    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(0, 3)
    ];

    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});