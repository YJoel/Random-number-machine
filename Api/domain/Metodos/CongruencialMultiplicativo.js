class CongruencialMultiplicativo{
  /**
   * 
   * @param {Number[]} _arrParams 
   */
  constructor(_arrParams){
    this.a = _arrParams[1];
    this.modulo = _arrParams[2];
    this.x = [_arrParams[0]];
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
    this.r = [];

    for (let i = 1; i < this.modulo; i++) {
      x_i = this.x[i - 1] * this.a;
      this.x.push(x_i % this.modulo);
      this.r.push(parseFloat((this.x[i] / this.modulo).toFixed(8)));
    }

    return this.r;
  }
}

export {CongruencialMultiplicativo}