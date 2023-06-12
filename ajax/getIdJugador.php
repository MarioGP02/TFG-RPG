<?php

$servidor  = "containers.railway.app";
$basedatos = "railway";
$usuario   = "root";
$password  = "Ofv0F6dbrYrSGrAY0zgN";
$puerto = "5696";

$nombre = $_GET["nombre"];

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos,$puerto) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "SELECT id FROM jugador WHERE nombre= '".$nombre."'";
$datos = mysqli_query($conexion,$sql);

$ids = mysqli_fetch_array($datos);

echo $ids['id'];
header("Content-Type: text");
mysqli_close($conexion);

?>
