import {IRotator} from "./IRotator";
export class PiezaBase implements IRotator {
    matriz: number[][]=[];
    rotar(){
        this.matriz = this.matriz[0].map((val, index) => this.matriz.map(row => row[index]).reverse());
    }
}