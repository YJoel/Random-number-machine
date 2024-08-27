class Xorshift {
  constructor(_x0, _n_aleatorios) {
    this.x0 = _x0;
    this.numerosAleatorios = _n_aleatorios;
    this.x = [_x0];
    this.r = [];
  }

  /**
   *
   * @returns Valor de la semilla ingresada
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
   * @returns El valor de numeros aleatorios a generar ingresado
   */
  getNumerosAGenerar() {
    return this.numerosAleatorios;
  }

  /**
   *
   * @param {Number} _numeros_aleatorios
   */
  setNumerosAGenerar(_n_aleatorios) {
    this.numerosAleatorios = _n_aleatorios;
  }

  generarNumerosAleatorios() {
    if (this.x0 === undefined) {
      this.x0 = Date.now(); // Usa el tiempo actual como semilla por defecto
    }

    for (let i = 1; i <= this.numerosAleatorios; i++) {
      // Asegúrate de que la semilla es un número entero positivo
      let _x = this.x[i-1] >>> 0;

      // Constantes para el Xorshift
      const a = 13;
      const b = 17;
      const c = 5;

      // Aplica los desplazamientos y operaciones XOR
      _x ^= _x << a;
      _x ^= _x >> b;
      _x ^= _x << c;

      // Devuelve el valor resultante, asegurando que es un entero de 32 bits sin signo
      this.x.push(_x >>> 0)
      this.r.push(
        parseFloat(
            parseFloat(`0.${this.x[i-1]}`).toFixed(3)
        )
      )
    }

    return this.r
  }
}

export { Xorshift };
