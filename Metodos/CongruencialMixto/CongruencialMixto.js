class CongruencialMixto {
  /**
   * @param {Number} _x0
   * @param {Number} _a
   * @param {Number} _c
   * @param {Number} _modulo
   */
  constructor(_x0, _a, _c, _modulo) {
    this.a = _a;
    this.c = _c;
    this.modulo = _modulo;
    this.x = [_x0];
    this.r = []
  }

  getX0() {
    return this.x[0];
  }

  /**
   *
   * @param {Number} _x0
   */
  setX0(_x0) {
    this.x[0] = _x0;
  }

  getA() {
    return this.a;
  }

  /**
   *
   * @param {Number} _a
   */
  setA(_a) {
    this.a = _a;
  }

  getC() {
    return this.c;
  }

  /**
   *
   * @param {Number} _c
   */
  setC(_c) {
    this.c = _c;
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
    let x_i = 0;

    for (let i = 1; i < this.modulo; i++) {
      x_i = this.x[i - 1] * this.a + this.c;
      this.x.push(x_i % this.modulo);
      this.r.push(parseFloat((this.x[i] / this.modulo).toFixed(3)));
    }

    return this.r;
  }
}

export { CongruencialMixto };
