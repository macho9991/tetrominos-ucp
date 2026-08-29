import { describe, it, expect } from "vitest";
import { PiezaCuadrado } from "../../src/piezas/PiezaCuadrado";
import { Celdas } from "../../src/Celdas";

describe("PiezaCuadrado", () => {

    it("debería llamarse 'Cuadrado'", () => {
        const pieza = new PiezaCuadrado();
        expect(pieza.getNombre()).toBe("Cuadrado");
    });

    it("debería tener exactamente 4 celdas formando un cuadrado de 2x2", () => {
        const pieza = new PiezaCuadrado();

        // Como 'desdeMatriz' recorta los ceros y la pega a la esquina superior izquierda,
        // esperamos que las 4 celdas ocupen (0,0), (0,1), (1,0) y (1,1).
        const formaEsperada = [
            new Celdas(0, 0), new Celdas(0, 1),
            new Celdas(1, 0), new Celdas(1, 1)
        ];

        // Usamos el método tieneForma que heredó de la base
        expect(pieza.tieneForma(formaEsperada)).toBe(true);
    });

    it("debería seguir teniendo la misma forma después de rotar", () => {
        const pieza = new PiezaCuadrado();

        // Hacemos que gire
        pieza.rotarDerecha();

        const formaEsperada = [
            new Celdas(0, 0), new Celdas(0, 1),
            new Celdas(1, 0), new Celdas(1, 1)
        ];

        // Un cuadrado girado sigue siendo exactamente igual
        expect(pieza.tieneForma(formaEsperada)).toBe(true);
    });

});
