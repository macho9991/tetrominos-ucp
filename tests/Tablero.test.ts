import { describe, it, expect } from 'vitest'; // Cambiá a '@jest/globals' si usás Jest
import { Tablero } from '../src/Tablero';

describe('Tablero', () => {
  // 1. Creamos un solo tablero de 10x20 para usar en todas las pruebas
  const tablero = new Tablero(10, 20);

  it('adentro: devuelve true si la posición es válida', () => {
    expect(tablero.esPosicionValida(5, 5)).toBe(true); // Centro de la cancha
    expect(tablero.esPosicionValida(0, 0)).toBe(true); // Esquina superior
  });

  it('afuera: devuelve false si choca con las paredes o el fondo', () => {
    expect(tablero.esPosicionValida(5, -1)).toBe(false); // Choca a la izquierda
    expect(tablero.esPosicionValida(5, 10)).toBe(false); // Choca a la derecha
    expect(tablero.esPosicionValida(20, 5)).toBe(false); // Pasa el fondo
  });
});