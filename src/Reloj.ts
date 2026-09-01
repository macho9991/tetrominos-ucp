export class Reloj {

    // Guarda el tiempo de espera del reloj.
    private tiempoDeEspera: number;

    // Guarda la acción que debe ejecutar el reloj.
    private accion: () => void;

    constructor(milisegundos: number) {

        // Guardamos cada cuánto tiempo funciona el reloj.
        this.tiempoDeEspera = milisegundos;

        // Inicialmente no hacemos ninguna acción.
        this.accion = () => { };
    }

    iniciar(accion: () => void): void {

        // Guardamos la acción que recibimos.
        this.accion = accion;

        // Ejecutamos la acción cada cierto tiempo.
        setInterval(accion, this.tiempoDeEspera);
    }

    tick(): void {

        // Ejecutamos la acción una vez manualmente.
        this.accion();
    }

}