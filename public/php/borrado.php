<?php
session_start();
$con = mysqli_connect("localhost","root","","licor");

if(isset($_POST['boton_borrar'])){
    $id = $_POST['campo_venta'];

    $query= >"DELETE FROM despachos WHERE id='$id'";
    $query_run = mysqli_query($con, $query);

    if($query_run){
        $_SESSION['status'] = "Despacho venedido";
        header("Location: despachos.html") 
    }else{
        $_SESSION['status'] = "error al vender el despacho";
        header("Location: despachos.html"); 
    }
}