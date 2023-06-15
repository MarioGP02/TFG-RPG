<?php
$servidor  = "containers-us-west-41.railway.app";
$basedatos = "railway";
$usuario   = "root";
$password  = "EeRul1MhYOf0jIKMUyCS";
$puerto = "6801";

$datosJSON = $_GET["heroe"];

$heroe = json_decode($datosJSON);

$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos,$puerto) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");


$sql = "UPDATE heroe SET nivel='$heroe->nivel',vidaMax='$heroe->vd',manaMax='$heroe->mn',ataque='$heroe->atq',velocidad='$heroe->vl',exp='$heroe->xp',ptosAtrib='$heroe->ptos' WHERE id_jugador = '$heroe->id';";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Update realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de update: ".mysqli_error($conexion);
}
echo json_encode($respuesta);

mysqli_close($conexion);

?>
