import {
  Fibonacci,
  CongruencialMixto,
  CongruencialMultiplicativo,
  CuadradosMedios,
} from "../Api/numerosPseudoaleatorios.js";

const Fi = new Fibonacci(4, 9, 20);
console.log("Fibonacci", Fi.generarNumerosAleatorios())
const CMi = new CongruencialMixto(4, 7, 13, 23);
console.log("Congruencial Mixto", CMi.generarNumerosAleatorios());
const CMu = new CongruencialMultiplicativo(4, 7, 23);
console.log("Congruencial Multiplicativo", CMu.generarNumerosAleatorios());
const CM = new CuadradosMedios(4);
console.log("Cuadrados Medios", CM.generarNumerosAleatorios(5));