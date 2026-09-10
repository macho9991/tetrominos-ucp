//    - describe: para agrupar pruebas
//    - it: para definir una prueba individual
//    - expect: para verificar que el resultado sea el esperado
import { describe, it, expect } from "vitest";

// Importamos la clase Celdas, que representa una posición del tablero.
import { Celdas } from "../src/Celdas";

// Agrupamos todas las pruebas de Celdas.
describe("Celdas", () => {

    // Test 1: Creación
    // La celda tiene que guardar tal cual los valores que recibe.
    it("debería guardar la fila y la columna pasadas al constructor", () => {
        const celda = new Celdas(2, 5);
        expect(celda.fila).toBe(2);
        expect(celda.columna).toBe(5);
    });

    // Test 2: Mismas coordenadas -> true
    // Son dos objetos distintos, pero equals compara la posición, no la identidad.
    it("debería devolver true cuando dos celdas tienen la misma posición", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(2, 5);
        expect(celda1.equals(celda2)).toBe(true);
    });
    // Test 3: Distinta fila -> false
    // Alcanza con que una de las dos coordenadas cambie.
    it("debería devolver false si tienen distinta fila", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(3, 5); // Cambia la fila
        expect(celda1.equals(celda2)).toBe(false);
    });
    // Test 4: Distinta columna -> false
    // El caso espejo del anterior, para cubrir las dos coordenadas.
    it("debería devolver false si tienen distinta columna", () => {
        const celda1 = new Celdas(2, 5);
        const celda2 = new Celdas(2, 6); // Cambia la columna
        expect(celda1.equals(celda2)).toBe(false);
    });

})

