export class Reloj {

    // Cada cuánto tiempo se repite la acción.
    private tiempoDeEspera: number;

    // Qué hace el reloj en cada vuelta.
    private accion: () => void;

    // Referencia al intervalo activo, para poder frenarlo.
    private intervalo: ReturnType<typeof setInterval> | null;//agregado.....

    constructor(milisegundos: number) {

        // Guardamos cada cuánto tiempo funciona el reloj.
        this.tiempoDeEspera = milisegundos;

        // Hasta que alguien llame a iniciar, el reloj no hace nada.
        this.accion = () => { };

        this.intervalo = null;//agregado......
    }

    // Engancha una acción y la repite cada tiempoDeEspera.
    iniciar(accion: () => void): void {

        // Guardamos la acción que recibimos.
        this.accion = accion;

        // Ejecutamos la acción cada cierto tiempo.
        setInterval(accion, this.tiempoDeEspera);
    }
    //agregado......
    // Frena el reloj. Sin esto, el intervalo sigue corriendo para siempre.
    detener(): void {

        this.intervalo !== null && clearInterval(this.intervalo);
        this.intervalo = null;
    }

    // Ejecuta la acción una sola vez, sin esperar al intervalo.
    // Es lo que usan los tests para avanzar turnos de forma controlada.
    tick(): void {

        // Ejecutamos la acción una vez manualmente.
        this.accion();
    }

}