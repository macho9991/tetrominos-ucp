import { describe, it, expect, test } from "vitest";

// Importamos la clase Tetris.
import { Tetris } from "../src/Tetris";

// Importamos Celdas para comprobar las posiciones.
import { Celdas } from "../src/Celdas";

// El palo cae siempre en la columna 0: sirve para los tests de movimiento y de columna.
import { PiezaPalo } from "../src/piezas/PiezaPalo";

// La L deja huecos al apilarse: la usamos para forzar el Game Over.
import { PiezaL } from "../src/piezas/PiezaL";

// El cuadrado completa dos filas de una: la usamos para contar líneas y ganar.
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";

/**
 * Tope de seguridad: corta el bucle si la lógica falla. Nunca debería alcanzarse.
 * Mínimo razonable 500 (la partida más larga medida usó 380 turnos); sin máximo,
 * un número alto no cuesta nada porque el bucle corta apenas el juego termina.
 */
const MAX_VUELTAS = 2000;


/**
 * Hace bajar la pieza actual hasta que se apoya.
 * Nos damos cuenta porque el juego reemplaza piezaActual por una nueva.
 */
function bajarHastaApoyar(juego: Tetris): void {

    const piezaQueEstabaCayendo = juego.piezaActual;
    let vueltas = 0;

    while (juego.piezaActual === piezaQueEstabaCayendo
           && !juego.juegoTerminado
           && vueltas < MAX_VUELTAS) {
        juego.avanzarTurno();
        vueltas++;
    }
}


/**
 * Llena las dos filas del fondo dejando libres las columnas 0 y 1,
 * que son las que va a completar el cuadrado cuando caiga.
 */
function prepararBaseParaElCuadrado(juego: Tetris): void {

    const celdas: Celdas[] = [];

    for (let fila = 18; fila <= 19; fila++) {
        for (let columna = 2; columna <= 9; columna++) {
            celdas.push(new Celdas(fila, columna));
        }
    }

    juego.tablero.agregarPieza(celdas);
}

/**
 * Llena la columna 0 desde la fila 4 hasta el fondo.
 * Le quedan libres las cuatro de arriba, que son las que ocupa el palo.
 */
function prepararColumnaParaElPalo(juego: Tetris): void {

    const celdas: Celdas[] = [];

    for (let fila = 4; fila <= 19; fila++) {
        celdas.push(new Celdas(fila, 0));
    }

    juego.tablero.agregarPieza(celdas);
}



describe("Pruebas de Tetris", () => {

  // Comprueba que el juego comience activo.
  it("debería empezar con el juego activo", () => {

    // Creamos una partida.
    const miJuego = new Tetris();

    // El juego no debe estar terminado.
    expect(miJuego.juegoTerminado).toBe(false);

  });
    it("debería avanzar un turno cuando el reloj hace tick", () => {

        const miJuego = new Tetris(() => new PiezaPalo());

        // El reloj queda enganchado a avanzarTurno.
        miJuego.iniciar();

        // Un tick manual equivale a un turno.
        miJuego.tick();

        expect(miJuego.turnos).toBe(1);
    });

     // --- Estructura del bloque ---
    it("debería empezar con un palo de 4 celdas en la columna 0", () => {

        const miJuego = new Tetris(() => new PiezaPalo());

        const formaInicial = [
            new Celdas(0, 0),
            new Celdas(1, 0),
            new Celdas(2, 0),
            new Celdas(3, 0)
        ];

        expect(miJuego.piezaActual.getCeldas().length).toBe(4);
        expect(miJuego.piezaActual.tieneForma(formaInicial)).toBe(true);
    });

    // --- Rotación ---
    it("debería mantener las 4 celdas después de rotar al azar", () => {

        const miJuego = new Tetris(() => new PiezaPalo());

        // Gira una cantidad aleatoria de veces: la forma cambia, la cantidad no.
        miJuego.rotarAleatoriamente();

        expect(miJuego.piezaActual.getCeldas().length).toBe(4);
    });

    // --- Jugar ---
    it("debería bajar la pieza una fila por turno", () => {

        const miJuego = new Tetris(() => new PiezaPalo());

        miJuego.avanzarTurno();
        miJuego.avanzarTurno();
        miJuego.avanzarTurno();

        // El palo arranca en las filas 0 a 3, así que ahora va de la 3 a la 6.
        const formaEsperada = [
            new Celdas(3, 0),
            new Celdas(4, 0),
            new Celdas(5, 0),
            new Celdas(6, 0)
        ];

        expect(miJuego.piezaActual.tieneForma(formaEsperada)).toBe(true);
        expect(miJuego.turnos).toBe(3);
        expect(miJuego.juegoTerminado).toBe(false);
    });

    // --- Contador de líneas: fila ---
    it("debería contar la línea cuando el cuadrado completa las filas del fondo", () => {

        const miJuego = new Tetris(() => new PiezaCuadrado());

        // Dejamos el fondo lleno salvo las columnas 0 y 1.
        prepararBaseParaElCuadrado(miJuego);

        // El cuadrado cae en ese hueco y completa las dos filas.
        bajarHastaApoyar(miJuego);

        expect(miJuego.lineasBorradas).toBe(2);
        expect(miJuego.piezasColocadas).toBe(1);
    });

    // --- Contador de líneas: columna ---
    it("debería contar la línea cuando el palo completa la columna", () => {

        const miJuego = new Tetris(() => new PiezaPalo());

        // Dejamos la columna 0 llena salvo las cuatro filas de arriba.
        prepararColumnaParaElPalo(miJuego);

        // El palo tapa ese hueco y completa las 20 celdas de la columna.
        bajarHastaApoyar(miJuego);

        expect(miJuego.lineasBorradas).toBe(1);
        expect(miJuego.piezasColocadas).toBe(1);
    });

    // --- Ganar ---
    it("debería ganar al llegar a las 40 líneas con cuadrados", () => {

        const miJuego = new Tetris(() => new PiezaCuadrado());

        // Cada cuadrado completa 2 filas, así que 20 cuadrados dan 40 líneas.
        const CUADRADOS = 20;

        for (let i = 0; i < CUADRADOS; i++) {
            prepararBaseParaElCuadrado(miJuego);
            bajarHastaApoyar(miJuego);
        }

        expect(miJuego.lineasBorradas).toBe(40);
        expect(miJuego.juegoGanado).toBe(true);
        expect(miJuego.juegoTerminado).toBe(true);
        expect(miJuego.piezasColocadas).toBe(20);

    });

    // --- Perder ---
    it("debería perder cuando las L se apilan hasta el tope", () => {

        const miJuego = new Tetris(() => new PiezaL());

        let vueltas = 0;

        // Las L caen siempre en las mismas columnas: dejan huecos,
        // nunca completan una fila y terminan tapando la entrada.
        while (!miJuego.juegoTerminado && vueltas < MAX_VUELTAS) {
            miJuego.avanzarTurno();
            vueltas++;
        }

        expect(miJuego.juegoTerminado).toBe(true);

        // Perdimos, no ganamos.
        expect(miJuego.juegoGanado).toBe(false);

    });

    // --- Extra: el juego no sigue después de terminar ---
    it("no debería avanzar turnos si el juego ya terminó", () => {

        const miJuego = new Tetris();

        miJuego.juegoTerminado = true;

        const turnosAntes = miJuego.turnos;

        miJuego.avanzarTurno();

        expect(miJuego.turnos).toBe(turnosAntes);
        expect(miJuego.juegoTerminado).toBe(true);
    });

});
