import { test, expect } from "vitest";
import { Reloj } from "../src/Reloj";

test("debe poder crearse", () => {

    const reloj = new Reloj(1000);

    expect(reloj).toBeDefined();

});