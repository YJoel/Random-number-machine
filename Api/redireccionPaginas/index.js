class RedireccionPaginas {
  /**
   *
   * @param {String} _ruta ruta del archivo a solicitar
   * @param {HTMLElement} _elDestino elemento html de dstino de la información obtenida
   */
  constructor(_ruta, _elDestino) {
    this.ruta = _ruta;
    this.destino = _elDestino
  }

  /**
   *
   * @returns retorna la ruta suministrada
   */
  getRuta() {
    return this.ruta;
  }

  /**
   *
   * @param {String} _ruta
   */
  setRuta(_ruta) {
    this.ruta = _ruta;
  }
  /**
   *
   * @returns retorna la información contenida en el documento
   */
  realizarPeticion() {
    fetch(this.ruta, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        this.destino.innerHTML = data
      });
  }
}

export {RedireccionPaginas}
