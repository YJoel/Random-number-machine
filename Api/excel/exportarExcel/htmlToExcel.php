<?php
// Datos estáticos que queremos exportar
$datos = [
    ["Nombre", "Apellido", "Edad"],
    ["Juan", "Pérez", 30],
    ["María", "Gómez", 25],
    ["Pedro", "López", 35]
];

// Nombre del archivo Excel
$filename = "datos_estaticos.xls";

// Encabezados para forzar la descarga del archivo Excel
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=\"$filename\"");

// Abrimos la salida estándar para escribir los datos
$salida = fopen('php://output', 'w');

// Escribimos los datos en el archivo Excel
foreach ($datos as $fila) {
    fputcsv($salida, $fila, "\t");
}

// Cerramos la salida
fclose($salida);
exit();
