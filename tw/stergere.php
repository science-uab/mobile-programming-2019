<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_produse.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Delete</title>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">

      <?php
      require("mysql.php");
      $id = $_GET['id'];
      $query = "DELETE from produse where produse.id=".$id;
      $rezultat=mysqli_query($connection, $query);

      if (!$rezultat)
      {
        echo mysqli_error($connection);
      }
      else
      {
        echo "<h2>Stergere efectuata cu succes.</h2>";
        echo "<h2>Reveniti la <a href='logout.php'>produse.</a></h2>";
      }
			?>

</div>
<div class="col-lg-4" align="center"><br><br>
  <h1 id="produse1">MyClothes</h1><br><br><br><br>
  <img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br><br>
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
