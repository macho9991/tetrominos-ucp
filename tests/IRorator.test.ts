import { test, expect } from "vitest";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";

test("debe tener los métodos de rotación", () => {

    const pieza = new PiezaCuadrado();

    expect(pieza.rotarDerecha).toBeDefined();
    expect(pieza.rotarIzquierda).toBeDefined();

});