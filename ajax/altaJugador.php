<?php
$servidor = "containers.railway.app";
$basedatos = "railway";
$usuario = "root";
$password = "Ofv0F6dbrYrSGrAY0zgN";
$puerto = "5696";

//datos de entrada
$datosJSON = $_POST["datosJugador"];

//Decodificamos el Jugador
$jugador = json_decode($datosJSON);

//Creamos la conexion del servidor
$conexion = mysqli_connect($servidor,$usuario,$password,$basedatos,$puerto) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

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
