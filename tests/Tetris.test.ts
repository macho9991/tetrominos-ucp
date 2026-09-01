import { describe, it, expect } from "vitest";

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


  // Comprueba la rotación aleatoria.
  /* it("debería poder rotar la pieza aleatoriamente", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // Rotamos la pieza.
    miJuego.rotarAleatoriamente();

    // Una pieza Palo siempre debe seguir teniendo 4 celdas.
    expect(miJuego.piezaActual.getCeldas().length).toBe(4);

  });
  */

});