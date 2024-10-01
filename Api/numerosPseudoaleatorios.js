import { FactoryMetodos } from "./domain/Metodos/FactoryMetodos.js";
import { cousinNumbers } from "./numerosPrimos/numerosPrimos.js";
import { chiCuadrado } from "./chi-cuadrado/chi-cuadrado.js";

function periodoCompleto(_arr){
    let firstValue = _arr[0]

    for(let i = 1; i < _arr.length; i++){
        if(_arr[i] == firstValue){
            return false
        }
    }

    return true
}

export { FactoryMetodos, cousinNumbers , chiCuadrado, periodoCompleto};
