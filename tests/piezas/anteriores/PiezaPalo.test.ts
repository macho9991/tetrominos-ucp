import { test, expect } from "vitest";
import { PiezaPalo } from "../../../src/piezas/anteriores/PiezaPalo";
test("debe tener la matriz inicial con forma de palo", () => { //Comprueba cómo nace la pieza cuando arranca el juego
    const pieza = new PiezaPalo();
    const formaEsperada = [
        [1],
        [1],
        [1],
        [1]
    ];
    expect(pieza.matriz).toEqual(formaEsperada);
})
test("debe rotar 90 grados", () => {
    const pieza = new PiezaPalo();
    pieza.rotarderecha();
    const formaEsperada = [[1, 1, 1, 1]];
    expect(pieza.matriz).toEqual(formaEsperada);

})