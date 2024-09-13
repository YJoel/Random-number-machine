/**
 * 
 * @param {String} _tipo 
 * @param {Number[]} _valores 
 */
function validar(_tipo, _valores) {
  switch (_tipo) {
    case "CMI":
      const x = _valores[0];
      const a = _valores[1];
      const c = _valores[2];
      const m = _valores[3];

      let validarA = true ? a % 2 != 0 && a % 3 != 0 && a % 5 != 0 : false;
      if (!validar) {
        a.classList.add(["border-danger-subtle", "text-danger"]);
      } else {
        a.classList.remove(["border-danger-subtle", "text-danger"]);
      }
      // return true ?
      break;
    case "CMU":
      break;
    case "CME":
      break;
    case "FI":
      break;
    case "XS":
      break;
    default:
      break;
  }
}

export { validar };
