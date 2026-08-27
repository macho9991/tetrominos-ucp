// Herramientas de Vitest:
//   describe - agrupa tests bajo un titulo
//   test     - define un caso de prueba
//   expect   - hace las verificaciones
import { describe, expect, test } from "vitest";

// Las clases a probar. El "../" sube de tests/ a la raiz, y despues entra a src/
import { Celda } from "../src/Celda";
import { PiezaBase } from "../src/piezaBase";
import { PiezaCuadrado } from "../src/piezaCuadro";
import { PiezaL } from "../src/piezaL";

describe("Piezas", () => {

  /**
   * Verifica que el constructor arme la pieza correctamente.
   * No alcanza con que el objeto exista: se comprueban sus medidas.
   */
  test("el cuadrado se crea con sus 4 celdas", () => {
    const pieza = new PiezaCuadrado();

    expect(pieza.getNombre()).toBe("Cuadrado");      // toBe: igualdad estricta
    expect(pieza.getCeldas()).toHaveLength(4);       // toHaveLength: largo del array
    expect(pieza.ancho()).toBe(2);
    expect(pieza.alto()).toBe(2);
  });

  /**
   * Verifica la forma exacta, celda por celda.
   * tieneForma() ignora el orden del array: lo que importa
   * es que esten ocupadas esas cuatro posiciones.
   */
  test("la L se crea con su forma correcta", () => {
    const pieza = new PiezaL();

    expect(pieza.tieneForma([
      new Celda(0, 0),
      new Celda(1, 0),
      new Celda(2, 0),
      new Celda(2, 1)
    ])).toBe(true);
  });

  /**
   * Verifica la herencia.
   * toBeInstanceOf pasa tanto con la clase propia como con cualquier ancestro:
   * un cuadrado es un PiezaCuadrado Y un PiezaBase a la vez.
   * Si faltara el "extends" o el "super()", este test falla.
   */
  test("las dos piezas heredan de PiezaBase", () => {
    expect(new PiezaCuadrado()).toBeInstanceOf(PiezaBase);
    expect(new PiezaL()).toBeInstanceOf(PiezaBase);
  });

  /**
   * El cuadrado es simetrico: rotarlo devuelve las mismas posiciones.
   * Se guarda la forma original ANTES de rotar para poder compararla despues.
   */
  test("el cuadrado no cambia al rotar", () => {
    const pieza = new PiezaCuadrado();
    const original = pieza.getCeldas();

    pieza.rotarDerecha();

    expect(pieza.tieneForma(original)).toBe(true);
  });

  /**
   * La L vertical mide 3 de alto y 2 de ancho.
   * Al rotarla se invierten: queda 2 de alto y 3 de ancho.
   * Comprobar las medidas alcanza para saber que giro.
   */
  test("la L rotada a la derecha queda acostada", () => {
    const pieza = new PiezaL();

    pieza.rotarDerecha();

    // X X X
    // X . .
    expect(pieza.ancho()).toBe(3);
    expect(pieza.alto()).toBe(2);
  });

  /**
   * La L no tiene simetria: necesita las 4 rotaciones para volver al inicio.
   * El for repite la rotacion cuatro veces:
   *   let i = 0    arranca el contador
   *   i < 4        sigue mientras sea menor a 4
   *   i++          suma uno en cada vuelta
   */
  test("la L vuelve a su forma original despues de 4 rotaciones", () => {
    const pieza = new PiezaL();
    const original = pieza.getCeldas();

    for (let i = 0; i < 4; i++) pieza.rotarDerecha();

    expect(pieza.tieneForma(original)).toBe(true);
  });
});