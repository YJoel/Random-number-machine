class Fibonacci {
  /**
   *
   * @param {Number[]} _arrParams
   */
  constructor(_arrParams) {
    this.x1 = _arrParams[0];
    this.x2 = _arrParams[1];
    this.modulo = _arrParams[2];
    this.x = [];
    this.r = [];
  }

  getX1() {
    return this.x1;
  }

  /**
   *
   * @param {Number} _x1
   */
  setX1(_x1) {
    this.x1 = _x1;
  }

  getX2() {
    return this.x2;
  }

  /**
   *
   * @param {Number} _x2
   */
  setX2(_x2) {
    this.n = _x2;
  }

  getModulo() {
    return this.modulo;
  }

  /**
   *
   * @param {Number} _modulo
   */
  setModulo(_modulo) {
    this.modulo = _modulo;
  }

  generarNumerosAleatorios() {
    this.x = [this.x1, this.x2];
    this.r = [];
    for (let i = 0; i < this.modulo; i++) {
      let x_i = (this.x[i] + this.x[i + 1]) % this.modulo;
      this.x.push(x_i);
      this.r.push(parseFloat((x_i / this.modulo).toFixed(8)));
    }
    return this.r;
  }
}

export { Fibonacci };
