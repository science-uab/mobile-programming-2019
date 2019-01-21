<?php
$hostname = "localhost";
$username = "root";
$password = "";
$bd = "tw";

$connection = mysqli_connect($hostname,$username,$password)
or die ("Conexiunea a esuat!");

$database = mysqli_select_db($connection,$bd)
or die ("Numele acestei baze de date nu exista!");
?>
