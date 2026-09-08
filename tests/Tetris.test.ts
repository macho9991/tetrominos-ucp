import { describe, it, expect, test } from "vitest";

// Importamos la clase Tetris.
import { Tetris } from "../src/Tetris";

// Importamos Celdas para comprobar las posiciones.
import { Celdas } from "../src/Celdas";


describe("Pruebas de Tetris", () => {

  // Comprueba que el juego comience activo.
  it("debería empezar con el juego activo", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // El juego no debe estar terminado.
    expect(miJuego.juegoTerminado).toBe(false);

  });


  // Comprueba que el juego terminado no avance.
  it("debería detener el turno si el juego ya terminó", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // Marcamos el juego como terminado.
    miJuego.juegoTerminado = true;

    // Intentamos avanzar.
    miJuego.avanzarTurno();

    // El juego sigue terminado.
    expect(miJuego.juegoTerminado).toBe(true);

  });


  // Comprueba que un tick produzca un turno.
  it("debería avanzar un turno cuando se hace tick", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // Iniciamos el reloj.
    miJuego.iniciar();

    // Hacemos un tick manual.
    miJuego.tick();

    // El contador debe aumentar.
    expect(miJuego.turnos).toBe(1);

  });


  // Comprueba que la pieza se mueva.
  it("debería mover la pieza una fila hacia abajo", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // Iniciamos el reloj.
    miJuego.iniciar();

    // Hacemos un tick.
    miJuego.tick();

    // Esperamos que el palo haya bajado una fila.
    const formaEsperada = [
      new Celdas(1, 0),
      new Celdas(2, 0),
      new Celdas(3, 0),
      new Celdas(4, 0)
    ];

    // Comprobamos las nuevas posiciones.
    expect(miJuego.piezaActual.tieneForma(formaEsperada)).toBe(true);

  });
});

test("debe cambiar juegoTerminado a true cuando las piezas llegan al tope (Game Over)", () => {
    const tetris = new Tetris();

    // 1. Verificamos que al inicio el juego está activo
    expect(tetris.juegoTerminado).toBe(false);

    // 2. TRUCO TDD (Mocking): 
    // Forzamos al tablero a que siempre responda que NO hay lugar válido.
    (tetris as any).tablero.esPosicionValida = () => false;

    // 3. Al fijar la pieza, el juego intentará crear una nueva.
    // El tablero hackeado le dirá que chocó, forzando el Game Over.
    tetris.fijarPieza();

    // 4. Comprobamos que el Tetris reaccionó correctamente
    expect(tetris.juegoTerminado).toBe(true);
});