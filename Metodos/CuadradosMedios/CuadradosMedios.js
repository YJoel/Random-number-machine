class CuadradosMedios {
  /**
   *
   * @param {Number} _x0 semilla
   */
  constructor(_x0) {
    this.x0 = _x0;
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
   *
   * @param {Number} n_aleatorios Cantidad de Numeros Aleatorios deseados
   * @returns {Number[]} Numero Aleatorio
   */
  generarNumerosAleatorios(n_aleatorios) {
    this.x = [this.x0]
    let x_i = ""
    for (let i = 1; i <= n_aleatorios; i++) {
        x_i = `${(this.x[i-1]**2)}`
        console.log(x_i)
    }

    return this.r
  }
}

export { CuadradosMedios };
