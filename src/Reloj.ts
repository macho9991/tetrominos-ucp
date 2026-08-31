class Reloj {
    private tiempoDeEspera: number;

    constructor(milisegundos: number) {
        // Guardamos cada cuánto tiempo queremos que el reloj haga "tic"
        this.tiempoDeEspera = milisegundos; 
    }

    // Esta función recibe otra función (una acción) y la repite sin parar
    iniciar(accion: () => void): void {
        setInterval(accion, this.tiempoDeEspera);
    }
}