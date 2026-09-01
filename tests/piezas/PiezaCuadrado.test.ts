import { describe, it, expect } from "vitest";

// Importamos la pieza Cuadrado.
import { PiezaCuadrado } from "../../src/piezas/PiezaCuadrado";

// Importamos Celdas para definir la forma esperada.
import { Celdas } from "../../src/Celdas";


describe("PiezaCuadrado", () => {

    // Comprueba que tenga el nombre correcto.
    it("debería llamarse 'Cuadrado'", () => {

        const pieza = new PiezaCuadrado();

        expect(pieza.getNombre()).toBe("Cuadrado");

    });


    // Comprueba la forma inicial.
    it("debería tener 4 celdas formando un cuadrado", () => {

        const pieza = new PiezaCuadrado();

        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });


    // Comprueba la rotación a la derecha.
    it("debería mantener su forma después de rotar a la derecha", () => {

        const pieza = new PiezaCuadrado();

        pieza.rotarDerecha();

        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });


    // Comprueba la rotación a la izquierda.
    it("debería mantener su forma después de rotar a la izquierda", () => {

        const pieza = new PiezaCuadrado();

        pieza.rotarIzquierda();

        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });

});