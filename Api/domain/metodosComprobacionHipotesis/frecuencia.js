/**
 *
 * @param {Number[]} _arrNumber
 * @param {Number} _intervals
 */

function frecuencia(_arrNumber) {
  const intervals = 5;
  let sumXo = 0;
  let FE = _arrNumber.length / intervals;
  let matrizIntervalos = [
    [FE, 0, 0.2, 0],
    [FE, 0, 0.4, 0],
    [FE, 0, 0.6, 0],
    [FE, 0, 0.8, 0],
    [FE, 0, 1.0, 0],
  ];

  _arrNumber.forEach((numeroAleatorio) => {
    for (let i = 0; i < intervals; i++) {
      if (i == 0) {
        if (numeroAleatorio < matrizIntervalos[i][2]) {
          // Frecuencia Obtenida Acumulado
          matrizIntervalos[i][1] += 1;

          // Xo
          matrizIntervalos[i][3] =
            Math.pow(matrizIntervalos[i][0] - matrizIntervalos[i][1], 2) /
            matrizIntervalos[i][0];
        }
      } else {
        if (
          numeroAleatorio >= matrizIntervalos[i - 1][2] &&
          numeroAleatorio < matrizIntervalos[i][2]
        ) {
          // Frecuencia Obtenida Acumulado
          matrizIntervalos[i][1] += 1;

          // Xo
          matrizIntervalos[i][3] =
            Math.pow(matrizIntervalos[i][0] - matrizIntervalos[i][1], 2) /
            matrizIntervalos[i][0];
        }
      }
    }
  });
  for (let i = 0; i < matrizIntervalos.length; i++) {
    sumXo += matrizIntervalos[i][3];
  }

  return { matrizIntervalos, sumXo };
}

export { frecuencia };
