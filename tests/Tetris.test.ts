import { describe, it, expect } from 'vitest'; // Asegura que no salten errores en rojo
import { Tetris } from '../src/Tetris';

describe('Pruebas de Tetris', () => {

  it('debería empezar con el juego activo (no terminado)', () => {
    const miJuego = new Tetris();
    
    // Al arrancar, el juego no debe estar terminado
    expect(miJuego.juegoTerminado).toBe(false);
  });

  it('debería detener el turno si el juego ya terminó', () => {
    const miJuego = new Tetris();
    
    // Forzamos el final del juego
    miJuego.juegoTerminado = true;
    
    // Intentamos avanzar de turno
    miJuego.avanzarTurno();
    
    // Verificamos que el juego sigue marcado como terminado
    expect(miJuego.juegoTerminado).toBe(true);
  });

});