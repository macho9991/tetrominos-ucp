import { test, expect } from "vitest";
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";

// Verifica que la pieza expone los dos métodos de rotación.
// El comportamiento de cada rotación se prueba en los tests de cada pieza.
test("debe tener los métodos de rotación", () => {

    const pieza = new PiezaCuadrado();

    expect(pieza.rotarDerecha).toBeDefined();
    expect(pieza.rotarIzquierda).toBeDefined();

});