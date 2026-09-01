import { test, expect } from "vitest";

// Importamos la pieza Perro.
import { PiezaPerro } from "../../src/piezas/PiezaPerro";

// Importamos Celdas para definir las posiciones esperadas.
import { Celdas } from "../../src/Celdas";


test("debe tener la forma inicial de perro", () => {

    // Creamos la pieza.
    const pieza = new PiezaPerro();

    // Forma inicial:
    //
    //   X X
    // X X
    //
    const formaEsperada = [
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(1, 0),
        new Celdas(1, 1)
    ];

    // Comprobamos la forma inicial.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la derecha", () => {

    // Creamos la pieza.
    const pieza = new PiezaPerro();

    // Giramos a la derecha.
    pieza.rotarDerecha();

    // Forma después del giro:
    //
    // X
    // X X
    //   X
    //
    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 1)
    ];

    // Comprobamos la nueva forma.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la izquierda", () => {

    // Creamos la pieza.
    const pieza = new PiezaPerro();

    // Giramos a la izquierda.
    pieza.rotarIzquierda();

    // Forma después del giro:
    //
    // X
    // X X
    //   X
    //
    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(2, 1)
    ];

    // Comprobamos la nueva forma.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});