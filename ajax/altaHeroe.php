<?php
$servidor  = "localhost";
$basedatos = "tfg-rpg";
$usuario   = "root";
$password  = "";

$datosJSON = $_GET["heroe"];

$heroe = json_decode($datosJSON);

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "INSERT INTO heroe (id_jugador, nivel, vidaMax, manaMax,ataque,velocidad,exp,ptosAtrib) VALUES ('$heroe->id','$heroe->nivel','$heroe->vd','$heroe->mn','$heroe->atq','$heroe->vl','$heroe->xp','$heroe->ptos');";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}
echo json_encode($respuesta);

mysqli_close($conexion);

?>