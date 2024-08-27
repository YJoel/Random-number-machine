class CuadradosMedios {
  /**
   *
   * @param {Number} _x0 semilla
   * @param {Number} _n_aleatorios Cantidad de Numeros Aleatorios deseados
   */
  constructor(_x0, _n_aleatorios) {
    this.x0 = _x0;
    this.numerosAleatorios = _n_aleatorios
    this.x = [_x0];
    this.r = [];
  }

  /**
   *
   * @returns {Number} Valor de la semilla Ingresada
   */

  getX0() {
    return this.x0;
  }

  /**
   *
   * @param {Number} _x0
   */
  setX0(_x0) {
    this.x0 = _x0;
  }

  /**
   * Extrae el cuadrado medio de la cadena o la porción que se encuentre en el centro
   * @param {String} _cadena Cadena de la que se extraerá el cuadrado medio
   * @returns {String}
   */
  extraerCuadradoMedio(_cadena) {
    return _cadena.slice(_cadena.length / 2 - 2, _cadena.length / 2 + 2);
  }

  /**
   * Genera Numeros PseudoAleatorios
   * @param {Number} n_aleatorios Cantidad de Numeros Aleatorios deseados
   * @returns {Number[]} Numero Aleatorio
   */
  generarNumerosAleatorios() {
    this.x = [this.x0];
    let x_i = "";
    let cMedio = 0;
    let randomNumber = 0;
    for (let i = 1, j = 0; i <= this.numerosAleatorios; i++,  j++) {
      x_i = `${this.x[i - 1] ** 2}`;
      cMedio = this.extraerCuadradoMedio(x_i);
      this.x.push(parseFloat(cMedio));
      randomNumber = parseFloat(`0.${cMedio}`);
      this.r.push(randomNumber);
    }

    return this.r;
  }
}

export { CuadradosMedios };
