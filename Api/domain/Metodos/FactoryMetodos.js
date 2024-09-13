import { Fibonacci } from "./Fibonacci.js";
import { CongruencialMixto } from "./CongruencialMixto.js";
import { CongruencialMultiplicativo } from "./CongruencialMultiplicativo.js";
import { CuadradosMedios } from "./CuadradosMedios.js";
import { Xorshift } from "./XorShift.js";

class FactoryMetodos {
  /**
   *
   * @param {String} _chosenMethod
   * @param {Number[]} _values
   */
  constructor(_chosenMethod, _values) {
    this.chosenMethod = _chosenMethod;
    this.values = _values;
  }

  getInstance() {
    if (this.chosenMethod == "CMI") {
      return new CongruencialMixto(this.values);
    } else if (this.chosenMethod == "CMU") {
      return new CongruencialMultiplicativo(this.values);
    } else if (this.chosenMethod == "CME") {
      return new CuadradosMedios(this.values);
    } else if (this.chosenMethod == "FI") {
      return new Fibonacci(this.values);
    } else if (this.chosenMethod == "XS") {
      return new Xorshift(this.values);
    }
  }
}

export { FactoryMetodos };
