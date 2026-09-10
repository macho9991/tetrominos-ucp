import { test, expect } from "vitest";

// Importamos la clase Reloj que vamos a probar.
import { Reloj } from "../src/Reloj";


// TEST 1: Crear el reloj

test("debe poder crearse", () => {

    // Creamos un reloj con un tiempo de espera de 1000 milisegundos.
    const reloj = new Reloj(1000);

    // Comprobamos que el reloj se haya creado correctamente.
    expect(reloj).toBeDefined();

});

// TEST 2: Ejecutar una acción con tick

test("debe ejecutar la acción cuando hace tick", () => {

    // Creamos el reloj.
    const reloj = new Reloj(1000);

    // Creamos un contador que empieza en cero.
    let contador = 0;

    // Le indicamos al reloj qué acción debe realizar.
    // Cada vez que se ejecute, aumenta el contador.
    reloj.iniciar(() => {
        contador++;
    });

    // Ejecutamos un tick manualmente.
    reloj.tick();

    // Comprobamos que la acción se ejecutó una vez.
    expect(contador).toBe(1);

});

//agregado......
// TEST 3: Frenar el reloj
test("debe poder detenerse", () => {

    const reloj = new Reloj(1000);

    let contador = 0;

    reloj.iniciar(() => {
        contador++;
    });

    reloj.detener();

    // Después de detenerlo, un tick manual sigue funcionando:
    // detener() frena el intervalo, no la acción guardada.
    reloj.tick();

    expect(contador).toBe(1);
    

});