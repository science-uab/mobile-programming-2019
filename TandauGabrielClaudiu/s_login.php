<!DOCTYPE php>
<html>

<?php
include('login-script.php');
require("mysql.php");
if(isset($_SESSION['login_user'])){
header("location: stergere.php?id=".$_GET['id']."");
}
?>

<head>

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="p_general.css">
  <link rel="stylesheet" type="text/css" href="p_login.css">
  <link rel="icon" type="image/x-icon" href="./img/iconita.png">
  <title>MyClothes: Admin LogIn</title>

</head>

<body>

  <div class="row">
		<div class="col-lg-8">
      <form id="login1" action="" method="post">
        <p><strong>Atentie!</strong> Stergerea unui produs poate fi efectuata doar de catre un administrator autorizat!
          <h3>Logare administrator</h3>
          <input required placeholder="Nume utilizator" type="text" name="username" ><br><br>
          <input required placeholder="Parola" type="password" name="password" ><br><br>
          <input type="submit" name="submit" value="Logare"><br>
          <span><?php echo $error; ?></span>
      </form>
  </div>
  <div class="col-lg-4" align="center"><br><br>
    <h1 id="login2">MyClothes</h1><br><br><br><br>
    <img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
    <a id="login3" href="produse.php">Magazin</a><br><br>
    <a id="login3" href="cautare.php">Cautare</a><br><br>
    <p id="timer"></p>
  <script type="text/javascript">setInterval(function() {
  var currentTime = new Date ( );
  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
  document.getElementById("timer").innerHTML = currentTimeString;
  }, 1000);</script>
  </div>

</div>

</body>

</html>
