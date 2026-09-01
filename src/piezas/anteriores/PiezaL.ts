import {PiezaBase} from "./PiezaBase"
 
export class PiezaL extends PiezaBase{
    constructor() {
        super();
        this.matriz=[
            [1,0],
            [1,0],
            [1,1]
        ]
    }


}

























// export class PiezaL(){
//     private rotacion: number;
//     private Rot: number[][][]=[
//         [ [-1,0], [0,0], [0,1], [1,1] ],   // Rot 0 
//         [ [0,-1], [0,0], [-1,0], [-1,1] ], // Rot 1    
//         [ [1,0], [0,0], [0,-1], [-1,-1] ], // Rot 2 
//         [ [0,1], [0,0], [1,0], [1,-1] ]    // Rot 3

//     ];
//     constructor ( {
//         this.rot = 0;
//     })
//     public setRot(rot:Number): void{ 
//         this.rot=((rot %4)+4)%4;

//     }
//     public getShape(rot:Number): void{ 
//         this.rot=((rot %4)+4)%4;
        
//     }
// }




// export class Alumno extends Persona{
//   constructor(
//     public nombre: string,
//     public edad: number,
//     public legajo: number
//   ) {
//     super(nombre, legajo);
//   }

//   esMayorDeEdad(): boolean {
//     return this.edad >= 18;
//   }

//   obtenerEstado(): string {
//     return this.edad >= 18 ? "Mayor de edad" : "Menor de edad";
//   }
// }


// export class Persona {
//   constructor(
//     public nombre: string,
//     public legajo: number
//   ) {}
// }