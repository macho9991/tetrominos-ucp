// Importamos nuestro reloj
import { Reloj } from '../src/Reloj';

// 1. Creamos un reloj de 1 segundo (1000 ms)
const miReloj = new Reloj(1000);

// 2. Creamos una variable normal para llevar la cuenta
let contadorDeTics = 0;

console.log(" Arrancando el reloj...");

// 3. Lo iniciamos
miReloj.iniciar(() => {
    contadorDeTics = contadorDeTics + 1;
    console.log("¡Tic tac! Han pasado " + contadorDeTics + " segundos.");
});