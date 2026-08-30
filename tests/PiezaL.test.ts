import {describe, expect, test} from "vitest"
import {PiezaL} from "../src/PiezaL";


describe("Puebas de la pieza L",()=>{
    test("debe poder crearse como una instancia",()=>{
        const pieza=new PiezaL();
        expect(pieza).toBeDefined()
    })
    test("debe tener la matriz inicial con forma de L", ()=>{
        const pieza = new PiezaL();
        const formaEsperada = [
            [1,0],
            [1,0],
            [1,1],
        ];
        expect(pieza.matriz).toEqual(formaEsperada);
    })

});