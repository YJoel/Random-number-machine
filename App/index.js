import {
  FactoryMetodos,
  cousinNumbers,
  chiCuadrado,
} from "../Api/numerosPseudoaleatorios.js";
import { randomNumbersToHTML } from "../Api/domain/randomNumbersToHTML/index.js";
import { RedireccionPaginas } from "../Api/domain/redireccionPaginas/index.js";
import {
  promedio,
  frecuencia,
  kolmogorovSmirnov,
} from "../Api/verificacionHipotesis.js";

let randomNumbers = []; // Se inicializa el arreglo de números aleatorios
let vDistribucion = [];
let M = undefined;

document.querySelectorAll(".dropdown-item").forEach((elHTML) => {
  elHTML.addEventListener("click", (el) => {
    el.preventDefault();
    const redir = new RedireccionPaginas(
      `${el.target.href}`,
      document.getElementById("body")
    );
    redir.realizarPeticion();
    // Hasta aquí actualiza la página con el  metodo seleccionado
    setTimeout(() => {
      const buttonAñadiInputExcel = document.getElementById("importarExcel"); // Boton Importar Archivo
      buttonAñadiInputExcel.addEventListener("click", (button) => {
        const input = document.createElement("input");
        input.id = "input-excel";
        input.type = "file";

        // IMPORTAR ARCHIVO
        input.addEventListener("change", function (event) {
          randomNumbers = [];

          const file = event.target.files[0];
          const reader = new FileReader();

          reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            json.forEach((el, i) => {
              if (i != 0) {
                randomNumbers[i - 1] = el.r;
              }
            });

            const rNoHTML = new randomNumbersToHTML(randomNumbers);
            rNoHTML.render();
          };

          reader.readAsArrayBuffer(file);

          // PRUEBAS ESTADISTICAS
          document.querySelectorAll(".pruebasEstadisticas").forEach((forms) => {
            forms.removeEventListener(
              "submit",
              pruebasEstadisticasSubmit,
              true
            );
            forms.addEventListener("submit", pruebasEstadisticasImportar, true);
          });

          // DISTRIBUCIONES

          const distribuciones = document.createElement("div");
          distribuciones.id = "distribuciones";
          distribuciones.classList.add("row");
          document.getElementById("body").append(distribuciones);
          if (distribuciones.parentNode.children.length == 4) {
            distribuciones.parentNode.removeChild(
              distribuciones.parentNode.children[3]
            );
          }

          redir.setDestino(document.getElementById("distribuciones"));
          redir.setRuta("./templateDistribuciones/distribuciones.html");
          redir.realizarPeticion();

          setTimeout(() => {
            let distribucionesHTML = document.querySelectorAll(".distribucion");
            distribucionesHTML.forEach((distribucion) => {
              distribucion.removeEventListener(
                "submit",
                distribucionesSubmit,
                true
              );
              distribucion.addEventListener(
                "submit",
                distribucionesImportar,
                true
              );
            });
          }, 500);
        });

        const lim = 4;
        if (buttonAñadiInputExcel.parentNode.children.length == lim) {
          buttonAñadiInputExcel.parentNode.removeChild(
            buttonAñadiInputExcel.parentNode.children[lim - 1]
          );
        }
        buttonAñadiInputExcel.parentNode.append(input);
      });

      // VALIDAR ENTRADAS
      if (document.forms[0].id == "congruencialMixto") {
        const variables = [
          document.getElementById("X"),
          document.getElementById("a"),
          document.getElementById("c"),
          document.getElementById("m"),
        ];

        variables.forEach((el, i) => {
          // CONDICIONES PARA X
          if (i == 0) {
            el.addEventListener("input", () => {
              if (el.value != "") {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
          // CONDICIONES PARA A
          else if (i == 1) {
            el.addEventListener("input", () => {
              if (el.value % 2 != 0 && el.value % 3 != 0 && el.value % 5 != 0) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
          // CONDICIONES PARA C
          else if (i == 2) {
            el.addEventListener("input", () => {
              if (el.value % 8 == 5) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
          // CONDICIONES PARA M
          else if (i == 3) {
            el.addEventListener("input", () => {
              if (cousinNumbers.indexOf(parseInt(el.value)) != -1) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
        });
      } else if (document.forms[0].id == "congruencialMultiplicativo") {
        const variables = [
          document.getElementById("X"),
          document.getElementById("a"),
          document.getElementById("m"),
        ];

        variables.forEach((el, i) => {
          // CONDICIONES PARA X
          if (i == 0) {
            el.addEventListener("input", () => {
              if (el.value % 2 != 0) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
          // CONDICIONES PARA A
          else if (i == 1) {
            el.addEventListener("input", () => {
              if ((el.value % 8) + 3 == 8 || (el.value % 8) - 3 == 0) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
          // CONDICIONES PARA M
          else if (i == 2) {
            el.addEventListener("input", () => {
              if (cousinNumbers.indexOf(parseInt(el.value)) != -1) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
        });
      } else if (document.forms[0].id == "cuadradosMedios") {
        const variables = [
          document.getElementById("x0"),
          document.getElementById("n"),
        ];
        variables.forEach((el, i) => {
          if (i == 0) {
            el.addEventListener("input", () => {
              if (el.value != 0) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          } else {
            el.addEventListener("input", () => {
              if (el.value != 0) {
                el.classList.add("text-bg-success");
                el.classList.remove("text-bg-danger");
              } else {
                el.classList.add("text-bg-danger");
                el.classList.remove("text-bg-success");
              }
            });
          }
        });
      } else if (document.forms[0].id == "fibonacci") {
        const variables = [
          document.getElementById("x0"),
          document.getElementById("x1"),
          document.getElementById("m"),
        ];
        variables.forEach((el, i) => {
          el.addEventListener("input", () => {
            if (el.value != 0) {
              el.classList.add("text-bg-success");
              el.classList.remove("text-bg-danger");
            } else {
              el.classList.add("text-bg-danger");
              el.classList.remove("text-bg-success");
            }
          });
        });
      } else if (document.forms[0].id == "xorShift") {
        const variables = [
          document.getElementById("x0"),
          document.getElementById("n"),
        ];
        variables.forEach((el) => {
          el.addEventListener("input", () => {
            if (el.value != 0) {
              el.classList.add("text-bg-success");
              el.classList.remove("text-bg-danger");
            } else {
              el.classList.add("text-bg-danger");
              el.classList.remove("text-bg-success");
            }
          });
        });
      }

      // CAPTURA EVENTO SUBMIT

      document.forms[0].addEventListener("submit", (form) => {
        randomNumbers = [];
        form.preventDefault();

        let datos = new FormData(document.forms[0]);
        if (document.forms[0].id == "congruencialMixto") {
          M = new FactoryMetodos("CMI", [
            datos.get("X"),
            datos.get("a"),
            datos.get("c"),
            datos.get("m"),
          ]).getInstance();
          randomNumbers = M.generarNumerosAleatorios();
          const rNoHTML = new randomNumbersToHTML(randomNumbers);
          rNoHTML.render();
        } else if (document.forms[0].id == "congruencialMultiplicativo") {
          M = new FactoryMetodos("CMU", [
            datos.get("X"),
            datos.get("a"),
            datos.get("m"),
          ]).getInstance();
          randomNumbers = M.generarNumerosAleatorios();
          const rNoHTML = new randomNumbersToHTML(randomNumbers);
          rNoHTML.render();
        } else if (document.forms[0].id == "cuadradosMedios") {
          M = new FactoryMetodos("CME", [
            datos.get("x0"),
            datos.get("n"),
          ]).getInstance();
          randomNumbers = M.generarNumerosAleatorios();
          const rNoHTML = new randomNumbersToHTML(randomNumbers);
          rNoHTML.render();
        } else if (document.forms[0].id == "fibonacci") {
          M = new FactoryMetodos("FI", [
            datos.get("x0"),
            datos.get("x1"),
            datos.get("m"),
          ]).getInstance();
          randomNumbers = M.generarNumerosAleatorios();
          const rNoHTML = new randomNumbersToHTML(randomNumbers);
          rNoHTML.render();
        } else if (document.forms[0].id == "xorShift") {
          M = new FactoryMetodos("XS", [
            datos.get("x0"),
            datos.get("n"),
          ]).getInstance();
          randomNumbers = M.generarNumerosAleatorios();
          const rNoHTML = new randomNumbersToHTML(randomNumbers);
          rNoHTML.render();
        }

        const buttonExportarExcel = document.getElementById("exportarExcel");
        buttonExportarExcel.classList.remove("disabled");
        buttonExportarExcel.addEventListener("click", exportarXLSX, true);

        //PRUEBAS ESTADISTICAS
        document.querySelectorAll(".pruebasEstadisticas").forEach((forms) => {
          forms.removeEventListener(
            "submit",
            pruebasEstadisticasImportar,
            true
          );
          forms.addEventListener("submit", pruebasEstadisticasSubmit, true);
        });

        // DISTRIBUCIONES

        const distribuciones = document.createElement("div");
        distribuciones.id = "distribuciones";
        distribuciones.classList.add("row");
        document.getElementById("body").append(distribuciones);
        if (distribuciones.parentNode.children.length == 4) {
          distribuciones.parentNode.removeChild(
            distribuciones.parentNode.children[3]
          );
        }

        redir.setDestino(document.getElementById("distribuciones"));
        redir.setRuta("./templateDistribuciones/distribuciones.html");
        redir.realizarPeticion();

        setTimeout(() => {
          let distribucionesHTML = document.querySelectorAll(".distribucion");
          distribucionesHTML.forEach((distribucion) => {
            distribucion.removeEventListener(
              "submit",
              distribucionesImportar,
              true
            );
            distribucion.addEventListener("submit", distribucionesSubmit, true);
          });
        }, 500);
      });
    }, 500);
  });
});

function analizarDigitosCadena(numeroStr) {
  // Creamos un objeto para contar las ocurrencias de cada dígito
  let contadorDigitos = {};
  for (let char of numeroStr) {
    if (contadorDigitos[char]) {
      contadorDigitos[char]++;
    } else {
      contadorDigitos[char] = 1;
    }
  }

  // Contamos las ocurrencias de cada cantidad de repeticiones
  let ocurrencias = {};
  for (let count of Object.values(contadorDigitos)) {
    if (ocurrencias[count]) {
      ocurrencias[count]++;
    } else {
      ocurrencias[count] = 1;
    }
  }

  // Analizamos las ocurrencias para determinar la combinación
  if (
    Object.keys(ocurrencias).length === 1 &&
    ocurrencias[1] === numeroStr.length
  ) {
    return "TD";
  } else if (ocurrencias[5]) {
    return "Q";
  } else if (ocurrencias[4]) {
    return "P";
  } else if (ocurrencias[3] && ocurrencias[2]) {
    return "TP";
  } else if (ocurrencias[3]) {
    return "T";
  } else if (ocurrencias[2] && ocurrencias[2] === 2) {
    return "2P";
  } else if (ocurrencias[2]) {
    return "1P";
  } else {
    return "Combinación no identificada";
  }
}

function pruebasEstadisticasImportar(form) {
  form.preventDefault();
  if (form.target.id == "promedios") {
    let prom = promedio(randomNumbers);
    let z0 =
      ((prom - 1 / 2) * Math.sqrt(randomNumbers.length)) / Math.sqrt(1 / 12);
    const targetReferencia = document.getElementById("refPromedios");
    const targetResultado = document.getElementById("resPromedios");
    targetResultado.value = Math.abs(z0);
    if (z0 < targetReferencia.value) {
      targetResultado.classList.add("text-bg-success");
      targetResultado.classList.remove("text-bg-danger");
    } else {
      targetResultado.classList.add("text-bg-danger");
      targetResultado.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "frecuencia") {
    let res = frecuencia(randomNumbers);

    const table = document.createElement("table");
    table.classList.add("table");

    res.matrizIntervalos.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((col) => {
        const td = document.createElement("td");
        td.innerHTML = col;
        tr.append(td);
      });
      table.append(tr);
    });
    const resXo = document.getElementById("resValuePromedios");
    const estadisticoChiCuadrado = document.getElementById("estChiCuad");
    resXo.value = res.sumXo;
    if (res.sumXo < estadisticoChiCuadrado.value) {
      resXo.classList.add("text-bg-success");
      resXo.classList.remove("text-bg-danger");
    } else {
      resXo.classList.add("text-bg-danger");
      resXo.classList.remove("text-bg-success");
    }
    document.getElementById("resFrecuencia").innerHTML = "";
    document.getElementById("resFrecuencia").append(table);
  } else if (form.target.id == "kolmogorovSmirnov") {
    let res = kolmogorovSmirnov(randomNumbers);
    const dn = 1.36 / Math.sqrt(res.desV.length);

    const resK = document.getElementById("resKolmogorov");
    resK.value = res.max;
    const refK = document.getElementById("refKolmogorov");
    refK.value = dn;
    if (res.max < dn) {
      resK.classList.add("text-bg-success");
      resK.classList.remove("text-bg-danger");
    } else {
      resK.classList.add("text-bg-danger");
      resK.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "series") {
    let intervalos = Math.round(Math.sqrt(randomNumbers.length));
    let tamMatriz = Math.round(Math.sqrt(intervalos));
    intervalos = tamMatriz ** 2;

    let valueIntervals = 1 / tamMatriz;
    let xLimits = Array(tamMatriz);
    let yLimits = Array(tamMatriz);

    for (let i = 0; i < tamMatriz; i++) {
      if (i == 0) {
        xLimits[i] = valueIntervals;
        yLimits[i] = valueIntervals;
      } else {
        xLimits[i] = xLimits[i - 1] + valueIntervals;
        yLimits[i] = yLimits[i - 1] + valueIntervals;
      }
    }

    let matrizSeries = Array(tamMatriz);

    for (let i = 0; i < matrizSeries.length; i++) {
      matrizSeries[i] = Array(tamMatriz);
      for (let j = 0; j < matrizSeries.length; j++) {
        matrizSeries[i][j] = 0;
      }
    }

    let parejasAleatorias = Array(randomNumbers.length - 1);
    for (let i = 0; i < randomNumbers.length - 1; i++) {
      parejasAleatorias[i] = [randomNumbers[i], randomNumbers[i + 1]];
    }

    for (let row = 0; row < matrizSeries.length; row++) {
      for (let col = 0; col < row.length; col++) {
        matrizSeries[row][col] = 0;
      }
    }

    parejasAleatorias.forEach((par) => {
      for (let x = 0; x < xLimits.length; x++) {
        for (let y = 0; y < yLimits.length; y++) {
          if (x == 0 && y == 0) {
            if (par[0] < xLimits[x] && par[1] < yLimits[y]) {
              matrizSeries[x][y] += 1;
            }
          } else if (x == 0 && y != 0) {
            if (
              par[0] < xLimits[x] &&
              par[1] > yLimits[y - 1] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          } else if (x != 0 && y == 0) {
            if (
              par[0] > xLimits[x - 1] &&
              par[0] < xLimits[x] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          } else {
            if (
              par[0] > xLimits[x - 1] &&
              par[0] < xLimits[x] &&
              par[1] > yLimits[y - 1] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          }
        }
      }
    });

    let frecuenciaEsperada = (randomNumbers.length - 1) / intervalos;
    let estadisticoChiCuadrado = [];
    let inputIntervalos = document.getElementById("intervalosSeries");
    let estChiCuadrado = document.getElementById("estChiCuadSeries");
    let FE = document.getElementById("frecuenciaEsperadaSeries");
    FE.value = frecuenciaEsperada;
    let res = document.getElementById("resSeries");
    let resValue = document.getElementById("resValueSeries");

    inputIntervalos.value = intervalos;
    estChiCuadrado.value = chiCuadrado[intervalos - 2];

    const table = document.createElement("table");
    table.classList.add("table");

    matrizSeries.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((col) => {
        const td = document.createElement("td");
        td.innerHTML = col;
        tr.append(td);
      });
      table.append(tr);
    });

    matrizSeries.forEach((row) => {
      row.forEach((col) => {
        estadisticoChiCuadrado.push(
          Math.pow(frecuenciaEsperada - col, 2) / frecuenciaEsperada
        );
      });
    });

    let acumuladoChiCuadrado = 0;
    estadisticoChiCuadrado.forEach((el) => {
      acumuladoChiCuadrado += el;
    });
    res.innerHTML = "";
    res.append(table);
    resValue.value = acumuladoChiCuadrado;

    if (acumuladoChiCuadrado < chiCuadrado[intervalos - 2]) {
      resValue.classList.add("text-bg-success");
      resValue.classList.remove("text-bg-danger");
    } else {
      resValue.classList.add("text-bg-danger");
      resValue.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "poker") {
    const pokerResArr = Array(randomNumbers.length);
    for (let el = 0; el < pokerResArr.length; el++) {
      if (parseInt(randomNumbers[el] * 100000) >= 10000) {
        pokerResArr[el] = analizarDigitosCadena(
          `${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 1000) {
        pokerResArr[el] = analizarDigitosCadena(
          `0${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 100) {
        pokerResArr[el] = analizarDigitosCadena(
          `00${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 10) {
        pokerResArr[el] = analizarDigitosCadena(
          `000${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 1) {
        pokerResArr[el] = analizarDigitosCadena(
          `0000${parseInt(randomNumbers[el] * 100000)}`
        );
      } else {
        pokerResArr[el] = analizarDigitosCadena(`00000`);
      }
    }

    const probabilidadesPoker = [
      0.3024, 0.504, 0.108, 0.072, 0.009, 0.0045, 0.0001,
    ];
    const FE = [0, 0, 0, 0, 0, 0, 0];
    probabilidadesPoker.forEach((prob, i) => {
      FE[i] = parseFloat((randomNumbers.length * prob).toFixed(1));
    });

    const FO = [0, 0, 0, 0, 0, 0, 0];
    pokerResArr.forEach((prob) => {
      if (prob == "TD") {
        FO[0] += 1;
      } else if (prob == "1P") {
        FO[1] += 1;
      } else if (prob == "2P") {
        FO[2] += 1;
      } else if (prob == "T") {
        FO[3] += 1;
      } else if (prob == "TP") {
        FO[4] += 1;
      } else if (prob == "P") {
        FO[5] += 1;
      } else if (prob == "Q") {
        FO[6] += 1;
      }
    });

    let estadisticoChiCuadrado = [];

    let acumuladoChiCuadrado = 0;

    probabilidadesPoker.forEach((el, i) => {
      if (FE[i] != 0) {
        estadisticoChiCuadrado.push(Math.pow(FE[i] - FO[i], 2) / FE[i]);
      } else {
        estadisticoChiCuadrado.push(0);
      }

      acumuladoChiCuadrado += estadisticoChiCuadrado[i];
    });

    const intervalosInput = document.getElementById("intervalosPoker");
    intervalosInput.value = 7;

    let noMatter = ["TD", "1P", "2P", "T", "TP", "P", "Q"];
    let noMatter1 = [];
    const frecuenciaEsperadaInput = document.getElementById(
      "frecuenciaEsperadaPoker"
    );
    for (let i = 0; i < noMatter.length; i++) {
      noMatter1.push(`${noMatter[i]}:${FE[i]};`);
    }
    frecuenciaEsperadaInput.value = noMatter1;

    const estChiCuadInput = document.getElementById("estChiCuadPoker");
    estChiCuadInput.value = chiCuadrado[7 - 2];

    const resValueInput = document.getElementById("resValuePoker");
    resValueInput.value = acumuladoChiCuadrado;

    const resPoker = document.getElementById("resPoker");
    const table = document.createElement("table");
    table.classList.add("table");

    noMatter.forEach((el, i) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      td1.innerHTML = el;
      td2.innerHTML = FO[i];
      tr.append(td1, td2);
      table.append(tr);
    });

    resPoker.innerHTML = "";
    resPoker.append(table);

    const resValuePoker = document.getElementById("resValuePoker");
    if (acumuladoChiCuadrado < chiCuadrado[7 - 2]) {
      resValuePoker.classList.add("text-bg-success");
      resValuePoker.classList.remove("text-bg-danger");
    } else {
      resValuePoker.classList.add("text-bg-danger");
      resValuePoker.classList.remove("text-bg-success");
    }
  }
}

function pruebasEstadisticasSubmit(form) {
  form.preventDefault();
  randomNumbers = [];
  randomNumbers = M.generarNumerosAleatorios();
  if (form.target.id == "promedios") {
    let prom = promedio(randomNumbers);
    let z0 = Math.abs(
      ((prom - 1 / 2) * Math.sqrt(randomNumbers.length)) / Math.sqrt(1 / 12)
    );

    const targetReferencia = document.getElementById("refPromedios");
    const targetResultado = document.getElementById("resPromedios");
    targetResultado.value = Math.abs(z0);
    if (z0 < targetReferencia.value) {
      targetResultado.classList.add("text-bg-success");
      targetResultado.classList.remove("text-bg-danger");
    } else {
      targetResultado.classList.add("text-bg-danger");
      targetResultado.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "frecuencia") {
    let res = frecuencia(randomNumbers);

    const table = document.createElement("table");
    table.classList.add("table");

    res.matrizIntervalos.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((col) => {
        const td = document.createElement("td");
        td.innerHTML = col;
        tr.append(td);
      });
      table.append(tr);
    });
    const resXo = document.getElementById("resValuePromedios");
    const estadisticoChiCuadrado = document.getElementById("estChiCuad");
    resXo.value = res.sumXo;
    if (res.sumXo < estadisticoChiCuadrado.value) {
      resXo.classList.add("text-bg-success");
      resXo.classList.remove("text-bg-danger");
    } else {
      resXo.classList.add("text-bg-danger");
      resXo.classList.remove("text-bg-success");
    }
    document.getElementById("resFrecuencia").innerHTML = "";
    document.getElementById("resFrecuencia").append(table);
  } else if (form.target.id == "kolmogorovSmirnov") {
    let res = kolmogorovSmirnov(randomNumbers);
    const dn = 1.36 / Math.sqrt(res.desV.length);

    const resK = document.getElementById("resKolmogorov");
    resK.value = res.max;
    const refK = document.getElementById("refKolmogorov");
    refK.value = dn;
    if (res.max < dn) {
      resK.classList.add("text-bg-success");
      resK.classList.remove("text-bg-danger");
    } else {
      resK.classList.add("text-bg-danger");
      resK.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "series") {
    let intervalos = Math.round(Math.sqrt(randomNumbers.length));
    let tamMatriz = Math.round(Math.sqrt(intervalos));
    intervalos = tamMatriz ** 2;

    let valueIntervals = 1 / tamMatriz;
    let xLimits = Array(tamMatriz);
    let yLimits = Array(tamMatriz);

    for (let i = 0; i < tamMatriz; i++) {
      if (i == 0) {
        xLimits[i] = valueIntervals;
        yLimits[i] = valueIntervals;
      } else {
        xLimits[i] = xLimits[i - 1] + valueIntervals;
        yLimits[i] = yLimits[i - 1] + valueIntervals;
      }
    }

    let matrizSeries = Array(tamMatriz);

    for (let i = 0; i < matrizSeries.length; i++) {
      matrizSeries[i] = Array(tamMatriz);
      for (let j = 0; j < matrizSeries.length; j++) {
        matrizSeries[i][j] = 0;
      }
    }

    let parejasAleatorias = Array(randomNumbers.length - 1);
    for (let i = 0; i < randomNumbers.length - 1; i++) {
      parejasAleatorias[i] = [randomNumbers[i], randomNumbers[i + 1]];
    }

    for (let row = 0; row < matrizSeries.length; row++) {
      for (let col = 0; col < row.length; col++) {
        matrizSeries[row][col] = 0;
      }
    }

    parejasAleatorias.forEach((par) => {
      for (let x = 0; x < xLimits.length; x++) {
        for (let y = 0; y < yLimits.length; y++) {
          if (x == 0 && y == 0) {
            if (par[0] < xLimits[x] && par[1] < yLimits[y]) {
              matrizSeries[x][y] += 1;
            }
          } else if (x == 0 && y != 0) {
            if (
              par[0] < xLimits[x] &&
              par[1] > yLimits[y - 1] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          } else if (x != 0 && y == 0) {
            if (
              par[0] > xLimits[x - 1] &&
              par[0] < xLimits[x] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          } else {
            if (
              par[0] > xLimits[x - 1] &&
              par[0] < xLimits[x] &&
              par[1] > yLimits[y - 1] &&
              par[1] < yLimits[y]
            ) {
              matrizSeries[x][y] += 1;
            }
          }
        }
      }
    });

    let frecuenciaEsperada = (randomNumbers.length - 1) / intervalos;
    let estadisticoChiCuadrado = [];
    let inputIntervalos = document.getElementById("intervalosSeries");
    let estChiCuadrado = document.getElementById("estChiCuadSeries");
    let FE = document.getElementById("frecuenciaEsperadaSeries");
    FE.value = frecuenciaEsperada;
    let res = document.getElementById("resSeries");
    let resValue = document.getElementById("resValueSeries");

    inputIntervalos.value = intervalos;
    estChiCuadrado.value = chiCuadrado[intervalos - 2];

    const table = document.createElement("table");
    table.classList.add("table");

    matrizSeries.forEach((row) => {
      const tr = document.createElement("tr");
      row.forEach((col) => {
        const td = document.createElement("td");
        td.innerHTML = col;
        tr.append(td);
      });
      table.append(tr);
    });

    matrizSeries.forEach((row) => {
      row.forEach((col) => {
        estadisticoChiCuadrado.push(
          Math.pow(frecuenciaEsperada - col, 2) / frecuenciaEsperada
        );
      });
    });

    let acumuladoChiCuadrado = 0;
    estadisticoChiCuadrado.forEach((el) => {
      acumuladoChiCuadrado += el;
    });
    res.innerHTML = "";
    res.append(table);
    resValue.value = acumuladoChiCuadrado;

    if (acumuladoChiCuadrado < chiCuadrado[intervalos - 2]) {
      resValue.classList.add("text-bg-success");
      resValue.classList.remove("text-bg-danger");
    } else {
      resValue.classList.add("text-bg-danger");
      resValue.classList.remove("text-bg-success");
    }
  } else if (form.target.id == "poker") {
    const pokerResArr = Array(randomNumbers.length);
    for (let el = 0; el < pokerResArr.length; el++) {
      if (parseInt(randomNumbers[el] * 100000) >= 10000) {
        pokerResArr[el] = analizarDigitosCadena(
          `${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 1000) {
        pokerResArr[el] = analizarDigitosCadena(
          `0${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 100) {
        pokerResArr[el] = analizarDigitosCadena(
          `00${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 10) {
        pokerResArr[el] = analizarDigitosCadena(
          `000${parseInt(randomNumbers[el] * 100000)}`
        );
      } else if (parseInt(randomNumbers[el] * 100000) >= 1) {
        pokerResArr[el] = analizarDigitosCadena(
          `0000${parseInt(randomNumbers[el] * 100000)}`
        );
      } else {
        pokerResArr[el] = analizarDigitosCadena(`00000`);
      }
    }

    const probabilidadesPoker = [
      0.3024, 0.504, 0.108, 0.072, 0.009, 0.0045, 0.0001,
    ];
    const FE = [0, 0, 0, 0, 0, 0, 0];
    probabilidadesPoker.forEach((prob, i) => {
      FE[i] = parseFloat((randomNumbers.length * prob).toFixed(1));
    });

    const FO = [0, 0, 0, 0, 0, 0, 0];
    pokerResArr.forEach((prob) => {
      if (prob == "TD") {
        FO[0] += 1;
      } else if (prob == "1P") {
        FO[1] += 1;
      } else if (prob == "2P") {
        FO[2] += 1;
      } else if (prob == "T") {
        FO[3] += 1;
      } else if (prob == "TP") {
        FO[4] += 1;
      } else if (prob == "P") {
        FO[5] += 1;
      } else if (prob == "Q") {
        FO[6] += 1;
      }
    });

    let estadisticoChiCuadrado = [];

    let acumuladoChiCuadrado = 0;

    probabilidadesPoker.forEach((el, i) => {
      if (FE[i] != 0) {
        estadisticoChiCuadrado.push(Math.pow(FE[i] - FO[i], 2) / FE[i]);
      } else {
        estadisticoChiCuadrado.push(0);
      }

      acumuladoChiCuadrado += estadisticoChiCuadrado[i];
    });

    const intervalosInput = document.getElementById("intervalosPoker");
    intervalosInput.value = 7;

    let noMatter = ["TD", "1P", "2P", "T", "TP", "P", "Q"];
    let noMatter1 = [];
    const frecuenciaEsperadaInput = document.getElementById(
      "frecuenciaEsperadaPoker"
    );
    for (let i = 0; i < noMatter.length; i++) {
      noMatter1.push(`${noMatter[i]}:${FE[i]};`);
    }
    frecuenciaEsperadaInput.value = noMatter1;

    const estChiCuadInput = document.getElementById("estChiCuadPoker");
    estChiCuadInput.value = chiCuadrado[7 - 2];

    const resValueInput = document.getElementById("resValuePoker");
    resValueInput.value = acumuladoChiCuadrado;

    const resPoker = document.getElementById("resPoker");
    const table = document.createElement("table");
    table.classList.add("table");

    noMatter.forEach((el, i) => {
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");

      td1.innerHTML = el;
      td2.innerHTML = FO[i];
      tr.append(td1, td2);
      table.append(tr);
    });

    resPoker.innerHTML = "";
    resPoker.append(table);

    const resValuePoker = document.getElementById("resValuePoker");
    if (acumuladoChiCuadrado < chiCuadrado[7 - 2]) {
      resValuePoker.classList.add("text-bg-success");
      resValuePoker.classList.remove("text-bg-danger");
    } else {
      resValuePoker.classList.add("text-bg-danger");
      resValuePoker.classList.remove("text-bg-success");
    }
  }
}

function distribucionesImportar(form) {
  form.preventDefault();

  vDistribucion = [];
  let id = form.target.id;
  console.log(id);
  if (id == "dExponencial") {
    let datos = new FormData(form.target);
    let seleccionMedia = parseInt(datos.get("mediaExp"));
    let mediaExp = parseFloat(datos.get("valorExponencial"));

    if (seleccionMedia == 1) {
      for (let i in randomNumbers) {
        if (randomNumbers[i] != 0) {
          vDistribucion[i] = parseFloat(
            (-mediaExp * Math.log(randomNumbers[i])).toFixed(4)
          );
        } else {
          vDistribucion[i] = mediaExp;
        }
      }
    } else {
      for (let i in randomNumbers) {
        if (randomNumbers[i] != 0) {
          vDistribucion[i] = parseFloat(
            ((-1 / mediaExp) * Math.log(randomNumbers[i])).toFixed(4)
          );
        } else {
          vDistribucion[i] = parseFloat((1 / mediaExp).toFixed(4));
        }
      }
    }

    // EXPORTAR A HTML LAS VARIABLES ALEATORIAS
    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      vDistribucion,
      "Variable Exponencial",
      form.target
    );
  } else if (id == "dUniforme") {
    let datos = new FormData(form.target);
    let limInf = parseFloat(datos.get("limInf"));
    let limSup = parseFloat(datos.get("limSup"));

    let variableUniforme = [];
    for (let i in randomNumbers) {
      variableUniforme[i] = limInf + (limSup - limInf) * randomNumbers[i];
    }

    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      variableUniforme,
      "Variable Uniforme",
      form.target
    );
  } else if (id == "dNormal") {
  } else if (id == "dPoisson") {
    let datos = new FormData(form.target);
    let mediaPoisson = parseFloat(datos.get("valorPoisson"));

    let numeroIntervaloPoisson = mediaPoisson * 3;

    let variablePoisson = [];
    for (let i = 0; i < numeroIntervaloPoisson; i++) {
      variablePoisson[i] =
        (Math.E ** -mediaPoisson * mediaPoisson ** i) / factorial(i);
    }

    let variablePoissonAcumulada = [];
    for (let i = 0, j = -1; i < variablePoisson.length; i++, j++) {
      if (i == 0) {
        variablePoissonAcumulada[i] = variablePoisson[i];
      } else {
        variablePoissonAcumulada[i] =
          variablePoissonAcumulada[j] + variablePoisson[i];
      }
    }

    let variablePoissonConjunto = [];

    for (let r in randomNumbers) {
      for (let inter in variablePoissonAcumulada) {
        if (inter == 0) {
          if (
            randomNumbers[r] >= 0 &&
            randomNumbers[r] < variablePoissonAcumulada[inter]
          ) {
            variablePoissonConjunto[r] = inter;
            break;
          }
        } else {
          if (
            randomNumbers[r] >= variablePoissonAcumulada[inter - 1] &&
            randomNumbers[r] < variablePoissonAcumulada[inter]
          ) {
            variablePoissonConjunto[r] = inter;
            break;
          }
        }
      }
    }

    // EXPORTAR A HTML LAS VARIABLES ALEATORIAS
    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      variablePoissonConjunto,
      "Variable Poisson",
      form.target
    );
  }
}

function distribucionesSubmit(form) {
  form.preventDefault();
  console.log(randomNumbers);
  vDistribucion = [];
  let id = form.target.id;
  console.log(id);
  if (id == "dExponencial") {
    let datos = new FormData(form.target);
    let seleccionMedia = parseInt(datos.get("mediaExp"));
    let mediaExp = parseFloat(datos.get("valorExponencial"));

    if (seleccionMedia == 1) {
      for (let i in randomNumbers) {
        if (randomNumbers[i] != 0) {
          vDistribucion[i] = parseFloat(
            (-mediaExp * Math.log(randomNumbers[i])).toFixed(4)
          );
        } else {
          vDistribucion[i] = mediaExp;
        }
      }
    } else {
      for (let i in randomNumbers) {
        if (randomNumbers[i] != 0) {
          vDistribucion[i] = parseFloat(
            ((-1 / mediaExp) * Math.log(randomNumbers[i])).toFixed(4)
          );
        } else {
          vDistribucion[i] = parseFloat((1 / mediaExp).toFixed(4));
        }
      }
    }

    // EXPORTAR A HTML LAS VARIABLES ALEATORIAS
    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      vDistribucion,
      "Variable Exponencial",
      form.target
    );
  } else if (id == "dUniforme") {
    let datos = new FormData(form.target);
    let limInf = parseFloat(datos.get("limInf"));
    let limSup = parseFloat(datos.get("limSup"));

    let variableUniforme = [];
    for (let i in randomNumbers) {
      variableUniforme[i] = limInf + (limSup - limInf) * randomNumbers[i];
    }

    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      variableUniforme,
      "Variable Uniforme",
      form.target
    );
  } else if (id == "dNormal") {
  } else if (id == "dPoisson") {
    let datos = new FormData(form.target);
    let mediaPoisson = parseFloat(datos.get("valorPoisson"));

    let numeroIntervaloPoisson = mediaPoisson * 3;

    let variablePoisson = [];
    for (let i = 0; i < numeroIntervaloPoisson; i++) {
      variablePoisson[i] =
        (Math.E ** -mediaPoisson * mediaPoisson ** i) / factorial(i);
    }

    let variablePoissonAcumulada = [];
    for (let i = 0, j = -1; i < variablePoisson.length; i++, j++) {
      if (i == 0) {
        variablePoissonAcumulada[i] = variablePoisson[i];
      } else {
        variablePoissonAcumulada[i] =
          variablePoissonAcumulada[j] + variablePoisson[i];
      }
    }

    let variablePoissonConjunto = [];

    for (let r in randomNumbers) {
      for (let inter in variablePoissonAcumulada) {
        if (inter == 0) {
          if (
            randomNumbers[r] >= 0 &&
            randomNumbers[r] < variablePoissonAcumulada[inter]
          ) {
            variablePoissonConjunto[r] = inter;
            break;
          }
        } else {
          if (
            randomNumbers[r] >= variablePoissonAcumulada[inter - 1] &&
            randomNumbers[r] < variablePoissonAcumulada[inter]
          ) {
            variablePoissonConjunto[r] = inter;
            break;
          }
        }
      }
    }

    // EXPORTAR A HTML LAS VARIABLES ALEATORIAS
    exportarXLSXConVariablesAleatorias(
      randomNumbers,
      variablePoissonConjunto,
      "Variable Poisson",
      form.target
    );
  }
}

function factorial(r) {
  if (r == 0 || r == 1) {
    return 1;
  } else {
    for (let i = r - 1; i > 0; i--) {
      r *= i;
    }
    return r;
  }
}

function exportarXLSXConVariablesAleatorias(
  randomNumbers,
  randomVariables,
  _text,
  _target
) {
  // EXPORTAR A HTML LAS VARIABLES ALEATORIAS

  let table = document.createElement("table");

  let cabeceras = ["#", "Número Aleatorio", _text];
  let tH = document.createElement("tr");
  cabeceras.forEach((el) => {
    let td = document.createElement("td");
    td.innerHTML = el;
    tH.append(td);
  });
  table.append(tH);

  randomVariables.forEach((el, i) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    td1.innerHTML = i + 1;
    td2.innerHTML = randomNumbers[i];
    td3.innerHTML = el;
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    table.append(tr);
  });

  _target.parentNode.children[1].innerHTML = "";
  _target.parentNode.children[1].append(table);
  _target.parentNode.children[1].classList.add("overflow-y-scroll");
  _target.parentNode.children[1].style.height = "500px";

  const rows = [];

  randomNumbers.forEach((el, i) => {
    rows[i] = {
      "#": i + 1,
      r: el,
      v: randomVariables[i],
    };
  });

  /* generate worksheet and workbook */
  const worksheetEx = XLSX.utils.json_to_sheet(rows);
  const workbookEx = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookEx, worksheetEx, document.forms[0].id);

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheetEx, [["#", "r", _text]], {
    origin: "A1",
  });

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbookEx, `${_text}.xlsx`, {
    compression: true,
  });
}

async function exportarXLSX() {
  const rows = [];
  randomNumbers = M.generarNumerosAleatorios();
  randomNumbers.forEach((el, i) => {
    rows[i] = {
      "#": i + 1,
      r: randomNumbers[i],
    };
  });

  /* generate worksheet and workbook */
  const worksheetEx = XLSX.utils.json_to_sheet(rows);
  const workbookEx = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbookEx, worksheetEx, document.forms[0].id);

  /* fix headers */
  XLSX.utils.sheet_add_aoa(worksheetEx, [["#", "r"]], {
    origin: "A1",
  });

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(workbookEx, "randomNumbers.xlsx", {
    compression: true,
  });
}
