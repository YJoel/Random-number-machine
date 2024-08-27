class randomNumbersToHTML {
  /**
   * Recibe los números aleatorios para mostrarlos en el formato de HTML para el metodo Congruencial Mixto
   * @param {Number[]} _numerosAleatorios
   */
  constructor(_numerosAleatorios) {
    this.numerosAleatorios = _numerosAleatorios;
  }

  /**
   *
   * @returns Numeros aleatorios almacenados en el objeto
   */
  getNumerosAleatorios() {
    return this.numerosAleatorios;
  }

  /**
   *
   * @param {Number[]} _numerosAleatorios
   */
  setNumerosAleatorios(_numerosAleatorios) {
    this.numerosAleatorios = _numerosAleatorios;
  }

  render() {
    let table = document.getElementById("resRandomNumbers");
    table.innerHTML = "";
    const parametros = ["#", "Numeros Aleatorios"];

    let content = [];
    let tr = document.createElement("tr");
    parametros.forEach((el) => {
      let th = document.createElement("th");
      th.innerHTML = el;
      tr.append(th);
    });
    content.push(tr);

    this.numerosAleatorios.forEach((el, i) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      td1.innerHTML = i + 1;
      td2.innerHTML = el;
      tr.append(td1, td2);
      content.push(tr);
    });

    content.forEach((el) => {
      table.append(el);
    });
  }
}

export { randomNumbersToHTML };
