import { test, expect } from "vitest";
import { PiezaPerro } from "../src/piezas/anteriores/PiezaPerro";

test("debe tener la matriz inicial con forma de perro", () => {
    const pieza = new PiezaPerro();
    const formaEsperada = [
        [0, 1, 1],
        [1, 1, 0]
    ];
    expect(pieza.matriz).toEqual(formaEsperada);
});
test("debe rotar 90 grados", () => {
    const pieza = new PiezaPerro();
    pieza.rotarderecha();
    const formaEsperada = [
        [1, 0],
        [1, 1],
        [0, 1]
    ];
    expect(pieza.matriz).toEqual(formaEsperada);

})