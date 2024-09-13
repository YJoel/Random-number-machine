/**
 *
 * @param {Number[]} _arrNumber
 */

function promedio(_arrNumber) {
  let sum = 0;
  let val = 0;
  let tam = _arrNumber.length;
  _arrNumber.forEach((el) => {
    sum += el;
  });

  val = sum / tam;
  return val;
}

export { promedio };
