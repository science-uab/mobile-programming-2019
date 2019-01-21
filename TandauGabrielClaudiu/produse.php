<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_produse.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Shop</title>
	<?php require("mysql.php");?>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">
			<div style="overflow-x:auto;">
				<table>
							<tr>
								<th>Produs</th>
								<th>Nume</th>
								<th>Tip</th>
								<th>Marime</th>
								<th>Pret</th>
								<th>Imagine</th>
								<th>Editare</th>
								<th>Sterge</th>
							</tr>
						<?php
						$sql = "SELECT * FROM produse ORDER BY id";
						$result = $connection->query($sql);
						if ($result->num_rows > 0)
						{
							while($row = $result->fetch_assoc())
							{
								echo "<tr>";
								echo "<td>".$row["id"]."</td>";
								echo "<td><a href='descriere.php?id=".$row['id']."'>".$row["denumire"]."</a></td>";
								echo "<td>".$row["tip"]."</td>";
								echo "<td>".$row["marime"]."</td>";
								echo "<td>".$row["pret"]."</td>";
								echo "<td>".$row["Imagine"]."</td>";
								echo "<td><a href='m_login.php?id=".$row['id']."'><img src='img/edit.png' alt='edit icon' width='32px'></a></td>";
								echo "<td><a href='s_login.php?id=".$row['id']."'><img src='img/delete.png' alt='delete icon' width='32px'></a> </td>";
								echo "</tr>";
							}
						}
						else
						{
							echo "S-a produs o eroare la incarcarea bazei de date!";
						}
						$connection->close();?>
					</table>
				</div>
</div>

		<div class="col-lg-4" align="center"><br><br>
			<h1 id="produse1">MyClothes</h1><br><br><br><br>
			<img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
			<a id="produse2" href="produse.php">Magazin</a><br><br>
			<a id="produse2" href="cautare.php">Cautare</a><br><br>
			<a id="produse2" href="login.php">Produs nou</a><br><br>
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
