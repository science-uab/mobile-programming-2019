<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_descriere.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Details</title>

</head>

<body>
  <div class="row">
    <div class="col-lg-8">
    <?php
    if (isset($_GET['id']))
		{
      $id = $_GET['id'];
      require("mysql.php");
      $query = "SELECT denumire,marime,pret,descriere
              FROM produse
              JOIN descriere
              ON produse.id = descriere.id
              WHERE descriere.id=".$id;
      $result = mysqli_query($connection, $query) or die ('Eroare');
    };
    if ($result->num_rows > 0)
    {
    	while($row = $result->fetch_assoc())
      {
				echo "<p>";
				echo "Ati selectat produsul: <strong>".$row["denumire"]."</strong><br>";
				echo "Produsul este de marimea: <strong>".$row["marime"]."</strong><br>";
				echo "Pretul produsului este de <strong>".$row["pret"]."</strong> de lei.<br>";
				echo "Detalii despre produs: <strong>".$row["descriere"]."</strong><br>";
				echo "</p>";
      }
    }
    else
    {
    echo "S-a produs o eroare la incarcarea bazei de date!";
    }
		$connection->close();
    ?>
		<?php echo "<p><a id='descriere2' href='comanda.php?id=".$_GET['id']."'>COMANDA ACUM!</a></p>" ?>
    </div>

    <div class="col-lg-4" align="center"><br><br>
			<h1 id="descriere1">MyClothes</h1><br><br><br><br>
			<img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
			<a id="descriere2" href="produse.php">Magazin</a><br><br>
			<a id="descriere2" href="cautare.php">Cautare</a><br><br>
			<a id="descriere2" href="a_comenzi.php">Comenzi</a><br><br>
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
