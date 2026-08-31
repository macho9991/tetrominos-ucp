export class Tablero {
    ancho: number;
    alto: number;

    constructor(ancho: number, alto: number) {
        this.ancho = ancho; // Clásico: 10
        this.alto = alto;   // Clásico: 20
    }

    // Nos dice si un bloque se salió del tablero
    esPosicionValida(fila: number, columna: number): boolean {
        
        // AQUÍ ESTÁ NUESTRO ÚNICO "IF" PERMITIDO EN EL TABLERO
        // Verificamos si tocamos la pared izquierda, la derecha, o el piso
        if (columna < 0 || columna >= this.ancho || fila >= this.alto) {
            return false; // Está afuera (chocó)
        }
        
        return true; // Está adentro (posición válida)
    }
}