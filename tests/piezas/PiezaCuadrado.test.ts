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
        // Forma inicial:
        //
        // X X
        // X X
        //
        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });

    // Comprueba las dos rotaciones en un solo test.
    it("debería mantener su forma después de rotar en cualquier dirección", () => {

        const pieza = new PiezaCuadrado();

        // El cuadrado es simétrico: ninguna rotación lo cambia,
        // así que las dos direcciones esperan la misma forma.
        //
        // X X
        // X X
        //
        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        pieza.rotarDerecha();
        expect(pieza.tieneForma(formaEsperada)).toBe(true);

        pieza.rotarIzquierda();
        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });

    /*
    // Comprueba la rotación a la derecha.
    it("debería mantener su forma después de rotar a la derecha", () => {

        const pieza = new PiezaCuadrado();
        // Es la única pieza que no cambia al rotar: el cuadrado
        // es simétrico, así que las 4 orientaciones son idénticas.
        //
        // X X
        // X X
        //
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
        // Mismo caso que la rotación a la derecha.
        //
        // X X
        // X X
        //
        const formaEsperada = [
            new Celdas(0, 0),
            new Celdas(0, 1),
            new Celdas(1, 0),
            new Celdas(1, 1)
        ];

        expect(pieza.tieneForma(formaEsperada)).toBe(true);

    });*/

});