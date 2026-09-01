import { test, expect } from "vitest";

// Importamos la clase Tablero que vamos a probar.
import { Tablero } from "../src/Tablero";

// Importamos Celdas para poder crear las posiciones de las piezas.
import { Celdas } from "../src/Celdas";

// Importamos PiezaL para probar que una pieza rotada
// se pueda agregar al tablero.
import { PiezaL } from "../src/piezas/PiezaL";


// ---------------------------------------------------------
// TEST 1: Crear un tablero
// ---------------------------------------------------------

test("debe crear un tablero de 10x20", () => {

  // Creamos un tablero con 10 columnas y 20 filas.
  const tablero = new Tablero(10, 20);

  // Comprobamos que el ancho sea 10.
  expect(tablero.ancho).toBe(10);

  // Comprobamos que el alto sea 20.
  expect(tablero.alto).toBe(20);

});


// ---------------------------------------------------------
// TEST 2: Posición válida
// ---------------------------------------------------------

test("debe aceptar una posición dentro del tablero", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // La posición fila 5, columna 5 está dentro del tablero.
  expect(tablero.esPosicionValida(5, 5)).toBe(true);

});


// ---------------------------------------------------------
// TEST 3: Posición fuera del tablero
// ---------------------------------------------------------

test("no debe aceptar una posición fuera del tablero", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // La fila 20 está fuera porque las filas van de 0 a 19.
  expect(tablero.esPosicionValida(20, 5)).toBe(false);

});


// ---------------------------------------------------------
// TEST 4: Agregar una pieza completa
// ---------------------------------------------------------

test("debe poder agregar una pieza completa", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Creamos una pieza de 4 celdas.
  // Forma:
  //
  // XX
  // XX
  //
  const pieza = [
    new Celdas(0, 0),
    new Celdas(0, 1),
    new Celdas(1, 0),
    new Celdas(1, 1)
  ];

  // Agregamos la pieza al tablero.
  tablero.agregarPieza(pieza);

  // Comprobamos que las celdas quedaron guardadas.
  expect(tablero.getCeldas()).toEqual(pieza);

});


// ---------------------------------------------------------
// TEST 5: No agregar una pieza fuera del tablero
// ---------------------------------------------------------

test("no debe agregar una pieza que salga del tablero", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Esta pieza tiene una celda en la columna 10.
  // Como el ancho es 10, las columnas válidas son 0 a 9.
  const pieza = [
    new Celdas(0, 0),
    new Celdas(0, 1),
    new Celdas(0, 2),
    new Celdas(0, 10)
  ];

  // Intentamos agregar la pieza.
  tablero.agregarPieza(pieza);

  // Como una de sus celdas está fuera,
  // esperamos que no se agregue nada.
  expect(tablero.getCeldas()).toEqual([]);

});


// ---------------------------------------------------------
// TEST 6: Agregar una pieza después de rotarla
// ---------------------------------------------------------

test("debe poder agregar una pieza después de rotarla", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Creamos una pieza L.
  const pieza = new PiezaL();

  // Giramos la pieza a la derecha.
  pieza.rotarDerecha();

  // Agregamos las celdas de la pieza ya rotada.
  tablero.agregarPieza(pieza.getCeldas());

  // Comprobamos que las celdas se hayan agregado correctamente.
  expect(tablero.getCeldas()).toEqual(pieza.getCeldas());

});


// ---------------------------------------------------------
// TEST 7: Mover una pieza hacia abajo
// ---------------------------------------------------------

test("debe mover la pieza una fila hacia abajo", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Creamos una pieza cuadrada.
  //
  // XX
  // XX
  //
  const pieza = [
    new Celdas(0, 0),
    new Celdas(0, 1),
    new Celdas(1, 0),
    new Celdas(1, 1)
  ];

  // Movemos la pieza una fila hacia abajo.
  const nuevaPieza = tablero.moverAbajo(pieza);

  // Estas son las posiciones que esperamos después del movimiento.
  const formaEsperada = [
    new Celdas(1, 0),
    new Celdas(1, 1),
    new Celdas(2, 0),
    new Celdas(2, 1)
  ];

  // Comprobamos que todas las celdas hayan bajado una fila.
  expect(nuevaPieza).toEqual(formaEsperada);

});


// ---------------------------------------------------------
// TEST 8: No permitir bajar fuera del tablero
// ---------------------------------------------------------

test("no debe permitir bajar una pieza fuera del tablero", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // La pieza ya está tocando la última fila.
  const pieza = [
    new Celdas(19, 0),
    new Celdas(19, 1),
    new Celdas(18, 0),
    new Celdas(18, 1)
  ];

  // Comprobamos que no pueda bajar otra fila.
  expect(tablero.puedeMoverAbajo(pieza)).toBe(false);

});


// ---------------------------------------------------------
// TEST 9: Dejar colocada la pieza cuando no puede bajar
// ---------------------------------------------------------

test("debe dejar la pieza colocada cuando no puede bajar", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Creamos una pieza que está en el fondo.
  const pieza = [
    new Celdas(19, 0),
    new Celdas(19, 1),
    new Celdas(18, 0),
    new Celdas(18, 1)
  ];

  // Intentamos mover la pieza.
  tablero.moverPieza(pieza);

  // Como no puede bajar, debe quedar colocada.
  expect(tablero.getCeldas()).toEqual(pieza);

});


// ---------------------------------------------------------
// TEST 10: Eliminar una línea completa
// ---------------------------------------------------------

test("debe eliminar una línea completa", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Creamos una línea completa de 10 celdas.
  // Las columnas van de 0 a 9.
  const linea = [
    new Celdas(19, 0),
    new Celdas(19, 1),
    new Celdas(19, 2),
    new Celdas(19, 3),
    new Celdas(19, 4),
    new Celdas(19, 5),
    new Celdas(19, 6),
    new Celdas(19, 7),
    new Celdas(19, 8),
    new Celdas(19, 9)
  ];

  // Agregamos la línea al tablero.
  tablero.agregarPieza(linea);

  // Eliminamos las líneas completas.
  const lineasEliminadas = tablero.eliminarLineasCompletas();

  // Comprobamos que se haya eliminado una línea.
  expect(lineasEliminadas).toBe(1);

  // Comprobamos que la línea ya no esté en el tablero.
  expect(tablero.getCeldas()).toEqual([]);

});


// TEST 11: Las celdas superiores bajan

test("debe hacer bajar las celdas después de eliminar una línea", () => {

  // Creamos el tablero.
  const tablero = new Tablero(10, 20);

  // Tenemos:
  //
  // Fila 18 -> XX
  // Fila 19 -> XXXXXXXXXX
  //
  // La fila 19 está completa y debe eliminarse.
  const piezas = [
    new Celdas(18, 0),
    new Celdas(18, 1),

    new Celdas(19, 0),
    new Celdas(19, 1),
    new Celdas(19, 2),
    new Celdas(19, 3),
    new Celdas(19, 4),
    new Celdas(19, 5),
    new Celdas(19, 6),
    new Celdas(19, 7),
    new Celdas(19, 8),
    new Celdas(19, 9)
  ];

  // Agregamos todas las celdas al tablero.
  tablero.agregarPieza(piezas);

  // Eliminamos la línea completa.
  tablero.eliminarLineasCompletas();

  // Las dos celdas que estaban en la fila 18
  // deben bajar a la fila 19.
  const formaEsperada = [
    new Celdas(19, 0),
    new Celdas(19, 1)
  ];

  // Comprobamos que hayan bajado correctamente.
  expect(tablero.getCeldas()).toEqual(formaEsperada);

});