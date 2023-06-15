<?php
$servidor  = "containers-us-west-41.railway.app";
$basedatos = "railway";
$usuario   = "root";
$password  = "EeRul1MhYOf0jIKMUyCS ";
$puerto = "6801";


$datosJSON = $_POST["id"];
$baja = json_decode($datosJSON);

$conexion = mysqli_connect($servidor, $usuario, $password, $basedatos,$puerto) or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");


$sql = "DELETE FROM jugador WHERE id='$baja'";

$resultado = mysqli_query($conexion, $sql);

if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Baja jugador realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de baja: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
