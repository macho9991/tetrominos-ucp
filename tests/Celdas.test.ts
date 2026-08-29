//    - describe: para agrupar pruebas
//    - it: para definir una prueba individual
//    - expect: para verificar que el resultado sea el esperado
import { describe, it, expect } from "vitest";

import { Celdas } from "../src/Celdas";

describe("Celdas", () => {
    // Test 1: Creación
    it("debería guardar la fila y la columna pasadas al constructor", () => {
        const celda = new Celdas(2, 5);
        expect(celda.fila).toBe(2);
        expect(celda.columna).toBe(5);
    });
    // Test 2: Mismas coordenadas -> true
    it("debería devolver true cuando dos celdas tienen la misma posición", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(2, 5);
        expect(celda1.equals(celda2)).toBe(true);
    });
    // Test 3: Distinta fila -> false
    it("debería devolver false si tienen distinta fila", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(3, 5); // Cambia la fila
        expect(celda1.equals(celda2)).toBe(false);
    });
    // Test 4: Distinta columna -> false
    it("debería devolver false si tienen distinta columna", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(2, 6); // Cambia la columna
        expect(celda1.equals(celda2)).toBe(false);
    });

})

