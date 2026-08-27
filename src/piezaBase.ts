// Trae la clase Celda del archivo celda.ts.
// El "./" significa "en esta misma carpeta". La extension .ts no se escribe.
import { Celda } from "./Celda";

/**
 * Clase base de todas las piezas del Tetris.
 *
 * Es abstracta: no se puede hacer new PiezaBase(), solo heredar de ella.
 * Tiene sentido porque en el juego no existe "una pieza" generica:
 * existen la L, el cuadrado, la T.
 *
 * Aca vive TODA la logica. Las piezas concretas solo definen su forma inicial.
 */
export abstract class PiezaBase {

  // "protected": accesible desde esta clase y desde las que heredan,
  // pero no desde afuera. Asi nadie puede romper la forma de la pieza.
  // "Celda[]" significa "un array de celdas".
  protected celdas: Celda[];

  constructor(
    protected nombre: string,   // con "protected": se declara y asigna solo
    celdas: Celda[]             // sin modificador: hay que asignarlo a mano
  ) {
    this.celdas = celdas;
  }

    /**
   * Convierte una matriz de 0 y 1 en la lista de celdas ocupadas.
   *
   * Acepta matrices con relleno (ceros alrededor) y normaliza el
   * resultado: la pieza siempre queda pegada a la esquina (0,0).
   *
   * "static" significa que pertenece a la clase, no a las instancias:
   * se llama con PiezaBase.desdeMatriz(...), sin necesidad de un objeto.
   * Hace falta asi porque se usa DENTRO del super(), antes de que
   * el objeto exista.
   */
  protected static desdeMatriz(matriz: number[][]): Celda[] {
    const enBruto: Celda[] = [];

    // forEach entrega el elemento y su indice.
    // En la matriz exterior el indice es la fila, en la interior la columna.
    matriz.forEach((fila, f) => {
      fila.forEach((valor, c) => {
        if (valor === 1) {
          enBruto.push(new Celda(f, c));
        }
      });
    });

    // Se busca la fila y columna mas chicas que ocupa la pieza
    const minFila = Math.min(...enBruto.map(c => c.fila));
    const minColumna = Math.min(...enBruto.map(c => c.columna));

    // Se resta ese minimo para correr la pieza a la esquina
    return enBruto.map(c => new Celda(c.fila - minFila, c.columna - minColumna));
  }//ultimo agregado

  /** Getter: expone el nombre sin permitir que lo modifiquen desde afuera. */
  getNombre(): string {
    return this.nombre;
  }

  getCeldas(): Celda[] {
    return this.celdas;
  }

  /**
   * Cuantas filas ocupa la pieza.
   *
   * Se lee de adentro hacia afuera:
   *   1. .map(c => c.fila)  transforma [Celda(0,0), Celda(1,0), Celda(2,1)]
   *                         en [0, 1, 2] (se queda solo con las filas)
   *   2. ...                desarma el array en argumentos sueltos,
   *                         porque Math.max(0,1,2) funciona pero
   *                         Math.max([0,1,2]) no
   *   3. + 1                porque las filas arrancan en 0: si la ultima
   *                         es la fila 2, hay 3 filas en total
   */
  alto(): number {
    return Math.max(...this.celdas.map(c => c.fila)) + 1;
  }

  /** Lo mismo que alto(), pero con las columnas. */
  ancho(): number {
    return Math.max(...this.celdas.map(c => c.columna)) + 1;
  }

  /**
   * Compara la forma actual con una lista de celdas esperadas,
   * sin importar el orden en que esten.
   *
   * .every(...) --> true si TODOS los elementos cumplen la condicion
   * .some(...)  --> true si AL MENOS UNO la cumple
   *
   * Juntos se leen: "para cada celda esperada, existe alguna celda mia
   * que sea igual". El orden no importa, y eso es clave: al rotar, las
   * celdas quedan en otro orden dentro del array pero la forma es la misma.
   */
  tieneForma(esperadas: Celda[]): boolean {
    return esperadas.every(e => this.celdas.some(c => c.equals(e)));
  }

  /**
   * Gira la pieza 90 grados a la derecha.
   *
   * La formula: una celda en (fila, columna) pasa a (columna, alto-1-fila).
   * La columna vieja se convierte en la fila nueva, y la fila vieja se
   * invierte para volverse columna.
   *
   * Ejemplo con la L, que mide 3 de alto:
   *   (0,0) --> (0, 3-1-0) = (0,2)
   *   (1,0) --> (0, 3-1-1) = (0,1)
   *   (2,0) --> (0, 3-1-2) = (0,0)
   *   (2,1) --> (1, 3-1-2) = (1,0)
   *
   *   Resultado:  X X X
   *               X . .      la L quedo acostada
   *
   * Lo bueno es que se auto-normaliza: el resultado siempre arranca
   * en (0,0), sin tener que reacomodar nada despues.
   *
   * ": void" significa que no devuelve nada: modifica el objeto.
   */
  rotarDerecha(): void {
    // Se guarda ANTES de rotar. Si se calculara dentro del map,
    // cambiaria a mitad de camino y el resultado saldria mal.
    const alto = this.alto();
    this.celdas = this.celdas.map(c => new Celda(c.columna, alto - 1 - c.fila));
  }

  /** Gira 90 grados a la izquierda: la operacion inversa. */
  rotarIzquierda(): void {
    const ancho = this.ancho();
    this.celdas = this.celdas.map(c => new Celda(ancho - 1 - c.columna, c.fila));
  }

  //analisis de prueba de giro para ver por consola
  /**
 * Dibuja la pieza como texto, para poder verla en la consola.
 * Devuelve algo como:
 *
 *   X .
 *   X .
 *   X X
 *
 * No es parte de la logica del juego: sirve para inspeccionar
 * visualmente que la rotacion este funcionando bien.
 */
dibujar(): string { //implemento para ver el dibujo

  // Array donde se va guardando cada linea del dibujo.
  // "string[]" es el tipo: un array de textos.
  const filas: string[] = [];

  // Recorre las filas de la pieza, de arriba hacia abajo.
  //   let f = 0        arranca en la fila 0
  //   f < this.alto()  sigue mientras no llegue al alto de la pieza
  //   f++              suma uno en cada vuelta
  for (let f = 0; f < this.alto(); f++) {

    // Se arma una linea vacia y se le van pegando caracteres.
    // Va con "let" y no "const" porque cambia en cada vuelta del for interno.
    let linea = "";

    // Recorre las columnas de esa fila, de izquierda a derecha.
    for (let c = 0; c < this.ancho(); c++) {

      // Pregunta: entre las celdas de la pieza, hay alguna en esta posicion?
      // .some(...) devuelve true si AL MENOS UNA cumple la condicion.
      const ocupada = this.celdas.some(
        celda => celda.fila === f && celda.columna === c
      );

      // Operador ternario: condicion ? valorSiTrue : valorSiFalse
      // Si esta ocupada agrega "X ", si no agrega ". "
      // El "+=" pega el texto al final de lo que ya habia.
      linea += ocupada ? "X " : ". ";
    }

    // Termino la fila: se guarda en el array.
    filas.push(linea);
  }

  // .join("\n") une todas las lineas separandolas con un salto de linea.
  // ["X . ", "X . ", "X X "] se convierte en "X . \nX . \nX X "
  return filas.join("\n");
}

}