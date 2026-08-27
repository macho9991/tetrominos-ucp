// Solo se importa "test": este archivo no usa describe ni expect,
// porque no verifica nada, solo imprime.
import { test } from "vitest";
import { PiezaL } from "../src/piezaL";

/**
 * Archivo temporal de inspeccion visual.
 *
 * No es un test real: no tiene ningun expect(), asi que siempre pasa.
 * Sirve para ver en la consola como va girando la pieza y confirmar
 * con los ojos que la formula de rotacion funciona.
 *
 * Conviene borrarlo cuando ya se comprobo lo que se queria ver.
 */
test("ver como gira la L", () => {

  // Se crea la pieza en su estado inicial.
  const pieza = new PiezaL();

  // Cinco vueltas y no cuatro a proposito:
  // las primeras cuatro muestran los cuatro estados distintos,
  // y la quinta confirma que volvio al estado inicial.
  for (let i = 0; i < 5; i++) {

    // Template literal: van entre backticks (`), no comillas.
    // El ${i} inserta el valor de la variable dentro del texto.
    // El \n es un salto de linea, para separar cada dibujo.
    console.log(`\n--- Rotacion ${i} ---`);

    // dibujar() devuelve la pieza como texto con X y puntos.
    console.log(pieza.dibujar());

    // Se rota DESPUES de imprimir.
    // Si se rotara antes, nunca se veria el estado inicial.
    pieza.rotarDerecha();
  }
});