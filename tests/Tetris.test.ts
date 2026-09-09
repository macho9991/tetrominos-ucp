import { describe, it, expect, test } from "vitest";

// Importamos la clase Tetris.
import { Tetris } from "../src/Tetris";

// Importamos Celdas para comprobar las posiciones.
import { Celdas } from "../src/Celdas";
// 
import { PiezaPalo } from "../src/piezas/PiezaPalo";
// 
import { PiezaL } from "../src/piezas/PiezaL";
// 
import { PiezaCuadrado } from "../src/piezas/PiezaCuadrado";

// Tope de seguridad: si la lógica falla, el test corta en vez de colgarse.
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

        console.log(`¡Ganaste! ${miJuego.lineasBorradas} líneas borradas con ${miJuego.piezasColocadas} piezas en ${miJuego.turnos} turnos`);
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

        console.log(`Game Over: las L taparon la entrada con ${miJuego.piezasColocadas} piezas en ${miJuego.turnos} turnos`);
    });


    it("no debería avanzar turnos si el juego ya terminó", () => {

        const miJuego = new Tetris();

        miJuego.juegoTerminado = true;

        const turnosAntes = miJuego.turnos;

        miJuego.avanzarTurno();

        expect(miJuego.turnos).toBe(turnosAntes);
        expect(miJuego.juegoTerminado).toBe(true);
    });

});



 /*
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
 
    // Forzamos al tablero a que siempre responda que NO hay lugar valido.
    (tetris as any).tablero.esPosicionValida = () => false;

    // 3. Al fijar la pieza, el juego intentara crear una nueva.
    // El tablero hackeado le dirá que chocó, forzando el Game Over.
    tetris.fijarPieza();

    // 4. Comprobamos que el Tetris reaccionó correctamente
    expect(tetris.juegoTerminado).toBe(true);
});

test("debe cambiar juegoGanado y juegoTerminado a true al borrar 40 líneas (Victoria)", () => {
    const tetris = new Tetris();

    // 1. Al inicio, el juego no está ganado ni terminado
    // (TypeScript se va a quejar acá porque juegoGanado todavía no existe)
    expect((tetris as any).juegoGanado).toBe(false);
    expect(tetris.juegoTerminado).toBe(false);

    // 2. Simulamos mágicamente que el jugador fue buenísimo y borró 40 líneas de golpe
    (tetris as any).lineasBorradas = 40;

    // 3. Forzamos la actualización del estado (lo enganchamos con fijarPieza)
    // Para que el juego detecte la victoria en este turno
    (tetris as any).fijarPieza();

    // 4. Comprobamos matemáticamente la victoria
    expect((tetris as any).juegoGanado).toBe(true);
    
    // Si ganamos, el juego lógicamente también tiene que estar terminado
    expect(tetris.juegoTerminado).toBe(true);
});
test("debe cambiar juegoGanado y juegoTerminado a true al borrar 40 líneas (Victoria)", () => {
    const tetris = new Tetris();

   
    expect((tetris as any).juegoGanado).toBe(false);
    expect(tetris.juegoTerminado).toBe(false);

   
    (tetris as any).lineasBorradas = 40;

    (tetris as any).fijarPieza();

    expect((tetris as any).juegoGanado).toBe(true);
    
    // Si ganamos, el juego lógicamente también tiene que estar terminado
    expect(tetris.juegoTerminado).toBe(true);
     
}); */
