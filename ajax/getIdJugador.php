<?php

$servidor  = "containers-us-west-41.railway.app";
$basedatos = "railway";
$usuario   = "root";
$password  = "EeRul1MhYOf0jIKMUyCS";
$puerto = "6801";

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
