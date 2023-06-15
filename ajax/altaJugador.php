<?php
$servidor = "containers-us-west-41.railway.app";
$basedatos = "railway";
$usuario = "root";
$password = "EeRul1MhYOf0jIKMUyCS";
$puerto = "6801";

//datos de entrada
$datosJSON = $_POST["datosJugador"];

//Decodificamos el Jugador
$jugador = json_decode($datosJSON);

//Creamos la conexion del servidor
$conexion = new mysqli("containers-us-west-41.railway.app","root","EeRul1MhYOf0jIKMUyCS","railway","6801");
$conexion->set_charset("utf8");

$sql = "INSERT INTO jugador (nombre,email) VALUES ('$jugador->nombre','$jugador->email');";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

mysqli_close($conexion);

echo json_encode($respuesta);


?>
