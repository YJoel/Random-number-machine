import {
  Fibonacci,
  CongruencialMixto,
  CongruencialMultiplicativo,
  CuadradosMedios,
  Xorshift,
} from "../Api/numerosPseudoaleatorios.js";

import { randomNumbersToHTML } from "../Api/randomNumbersToHTML/index.js";
import { RedireccionPaginas } from "../Api/redireccionPaginas/index.js";

document.querySelectorAll(".dropdown-item").forEach((elHTML) => {
  elHTML.addEventListener("click", (el) => {
    el.preventDefault();
    const redir = new RedireccionPaginas(
      `${el.target.href}`,
      document.getElementById("body")
    );
    redir.realizarPeticion();
    setTimeout(() => {
      document.forms[0].addEventListener("submit", (form) => {
        form.preventDefault();
        let datos = new FormData(document.forms[0]);
        if (document.forms[0].id == "congruencialMixto") {
          const CMi = new CongruencialMixto(
            datos.get("X"),
            datos.get("a"),
            datos.get("c"),
            datos.get("m")
          );
          const rNoHTML = new randomNumbersToHTML(
            CMi.generarNumerosAleatorios()
          );
          rNoHTML.render();
        } else if (document.forms[0].id == "congruencialMultiplicativo") {
          const CMu = new CongruencialMultiplicativo(
            datos.get("X"),
            datos.get("a"),
            datos.get("m")
          );
          const rNoHTML = new randomNumbersToHTML(
            CMu.generarNumerosAleatorios()
          );
          rNoHTML.render();
        } else if (document.forms[0].id == "cuadradosMedios") {
          const CM = new CuadradosMedios(datos.get("x0"), datos.get("n"));
          const rNoHTML = new randomNumbersToHTML(
            CM.generarNumerosAleatorios()
          );
          rNoHTML.render();
        } else if (document.forms[0].id == "fibonacci") {
          const Fi = new Fibonacci(
            datos.get("x0"),
            datos.get("x1"),
            datos.get("m")
          );
          const rNoHTML = new randomNumbersToHTML(
            Fi.generarNumerosAleatorios()
          );
          rNoHTML.render();
        } else if (document.forms[0].id == "xorShift") {
          const XS = new Xorshift(datos.get("x0"), datos.get("n"));
          const rNoHTML = new randomNumbersToHTML(
            XS.generarNumerosAleatorios()
          );
          rNoHTML.render();
        }
      });
    }, 500);
    // formActive = document.forms[0];
    // formActive.addEventListener("submit", (elHTML) => {
    //   elHTML.preventDefault();
    //   console.log(elHTML.target.id);
    // });
  });
});

document.getElementById("inicio").addEventListener("click", (elHTML) => {
  elHTML.preventDefault();
  const redir = new RedireccionPaginas(
    `${elHTML.target.parentNode.href}`,
    document.getElementById("body")
  );
  redir.realizarPeticion();
});
