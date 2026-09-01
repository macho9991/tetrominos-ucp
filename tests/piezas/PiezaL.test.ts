import { test, expect } from "vitest";

// Importamos la pieza L.
import { PiezaL } from "../../src/piezas/PiezaL";

// Importamos Celdas para definir las posiciones esperadas.
import { Celdas } from "../../src/Celdas";


test("debe poder crearse como una instancia", () => {

    // Creamos una pieza L.
    const pieza = new PiezaL();

    // Comprobamos que la pieza exista.
    expect(pieza).toBeDefined();

});


test("debe tener la forma inicial de L", () => {

    // Creamos la pieza.
    const pieza = new PiezaL();

    // Forma inicial:
    //
    // X
    // X
    // X X
    //
    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(1, 0),
        new Celdas(2, 0),
        new Celdas(2, 1)
    ];

    // Comprobamos que la forma sea correcta.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la derecha", () => {

    // Creamos la pieza.
    const pieza = new PiezaL();

    // Giramos la pieza a la derecha.
    pieza.rotarDerecha();

    // Forma después del giro:
    //
    // X X X
    // X
    //
    const formaEsperada = [
        new Celdas(0, 0),
        new Celdas(0, 1),
        new Celdas(0, 2),
        new Celdas(1, 0)
    ];

    // Comprobamos la nueva forma.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});


test("debe rotar 90 grados a la izquierda", () => {

    // Creamos la pieza.
    const pieza = new PiezaL();

    // Giramos la pieza a la izquierda.
    pieza.rotarIzquierda();

    // Forma después del giro:
    //
    //   X
    //   X
    //   X X
    //
    const formaEsperada = [
        new Celdas(0, 2),
        new Celdas(1, 0),
        new Celdas(1, 1),
        new Celdas(1, 2)
    ];

    // Comprobamos la nueva forma.
    expect(pieza.tieneForma(formaEsperada)).toBe(true);

});