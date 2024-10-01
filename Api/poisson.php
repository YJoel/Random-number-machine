<?php

$mediaPoisson = (float) $_POST["valorPoisson"];
$numeroIntervaloPoisson = $mediaPoisson * 3;

$variablePoisson = [];
$variablePoissonAcumulada = [];
$console = [];

// for ($i = 0; $i < $numeroIntervaloPoisson; $i++) {

// }

$flag_para_salir = false;

for ($i = 0, $j = -1; $i < $numeroIntervaloPoisson; $i++, $j++) {
    # code...
    $val = (pow(2.718281828459045, -$mediaPoisson) * pow($mediaPoisson, $i)) / factorial($i);
    if ($val < 1) {
        // Se asigna valores a la variable Poisson
        array_push($variablePoisson, $val);
        // } else {
        //     $flag_para_salir = true;
        // }

        if ($i == 0) {
            array_push($variablePoissonAcumulada, $variablePoisson[$i]);
        } else {
            // if ($variablePoissonAcumulada[$j] + $variablePoisson[$i] > 1) {
            //     $flag_para_salir = true;
            // }
            // Se asigna valores a la variable Poisson Acumulada
            array_push($variablePoissonAcumulada, $variablePoissonAcumulada[$j] + $variablePoisson[$i]);
            // if ($i != count($variablePoisson) - 1) {
            // } else {
            //   $variablePoissonAcumulada[$i] = $variablePoisson[$i];
            // }
        }

        if ($flag_para_salir) {
            break;
        }
        array_push($console, ["val" => $val]);
    }
}

function factorial($r)
{
    if ($r == 0 || $r == 1) {
        return 1;
    } else {
        for ($i = $r - 1; $i > 0; $i--) {
            $r *= $i;
        }
        return $r;
    }
}

echo json_encode(
    [
        "console" => $console,
        "vp" => $variablePoisson,
        "vpa" => $variablePoissonAcumulada,
        "vpalength" => count($variablePoissonAcumulada),
        "vplength" => count($variablePoisson)
    ]
);