/**
 *
 * @param {Numer[]} _arrNumber
 */

function kolmogorovSmirnov(_arrNumber) {
  let desV = [];
  let arrAux = [];
  _arrNumber.forEach((el, i) => {
    arrAux[i] = el
  });
  // Ordenar Arreglo de Menor a Mayor
  arrAux.sort((a, b) => {
    return a - b;
  });

  arrAux.forEach((randomNumber, index, array) => {
    desV.push(Math.abs(randomNumber - (index + 1) / array.length));
  });

  return { desV: desV, max: Math.max.apply(null, desV) };
}

export { kolmogorovSmirnov };
