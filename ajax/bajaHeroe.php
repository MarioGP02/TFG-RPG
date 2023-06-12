<?php
$servidor  = "containers.railway.app";
$basedatos = "railway";
$usuario   = "root";
$password  = "Ofv0F6dbrYrSGrAY0zgN";
$puerto = "5696";


$datosJSON = $_POST["idJug"];
$baja = json_decode($datosJSON);

$conexion = mysqli_connect($servidor, $usuario, $password, $basedatos,$puerto) or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");


$sql = "DELETE FROM heroe WHERE id_jugador='$baja'";

$resultado = mysqli_query($conexion, $sql);

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Baja heroe realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de baja: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
