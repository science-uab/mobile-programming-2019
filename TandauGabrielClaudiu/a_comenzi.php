<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_a_comenzi.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Requests</title>
	<?php require("mysql.php");?>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">
			<div style="overflow-x:auto;">
						<?php
						$sql = "SELECT * FROM produse
						JOIN comenzi
						ON produse.id = comenzi.id
						ORDER BY clid";
						$result = $connection->query($sql);
						if ($result->num_rows > 0)
						{
							while($row = $result->fetch_assoc())
							{
								echo "<p>";
								echo "Comanda cu numarul: <strong>".$row["clid"]."</strong>.<br>";
								echo "Produs comandat: <strong>".$row["denumire"]."</strong>.<br>";
								echo "Numele clientului: <strong>".$row["nume"]."</strong> <strong>".$row["prenume"]."</strong>.<br>";
								echo "Localitatea si judetul: <strong>".$row["localitate"]."</strong>, <strong>".$row["judet"]."</strong>.<br>";
								echo "Adresa: Str.<strong> ".$row["strada"]."</strong>, Nr. <strong> ".$row["numar"]."</strong>, Bl. <strong> ".$row["bloc"]."</strong>, Ap. <strong>".$row["apartament"]."</strong>.<br>";
								echo "Numar de telefon: <strong>".$row["telefon"]."</strong>";
								echo "</p>";
							}
						}
						else
						{
							echo "<p>Nu exista comenzi!</p>";
						}
						$connection->close();?>
					</table>
				</div>
</div>

		<div class="col-lg-4" align="center"><br><br>
			<h1 id="comenzi1">MyClothes</h1><br><br><br><br>
			<img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
			<a id="comenzi2" href="produse.php">Magazin</a><br><br>
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
