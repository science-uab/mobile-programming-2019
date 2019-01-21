<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_adaugare.css">
	<link rel="stylesheet" type="text/css" href="p_comanda.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Buy</title>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">

			<?php
				require("mysql.php");
				if (isset($_POST['submit']))
				{
					$id = isset($_GET['id']) ? $_GET['id'] : '';
					$nume = $_POST['nume'];
					$prenume = $_POST['prenume'];
					$localitate = $_POST['localitate'];
					$judet = $_POST['judet'];
					$strada = $_POST['strada'];
					$numar = $_POST['numar'];
					$bloc = $_POST['bloc'];
					$apartament = $_POST['apartament'];
					$telefon = $_POST['telefon'];

					$query = "INSERT INTO comenzi (id,nume,prenume,localitate,judet,strada,numar,bloc,apartament,telefon)
										VALUES ('$id','$nume','$prenume','$localitate','$judet','$strada','$numar','$bloc','$apartament','$telefon');";

					$result=mysqli_query($connection, $query);

						if (!$result)
						{
						echo mysqli_error($connection);
						}
						else
						{
						echo "<h2>Comanda inregistrata cu succes!</h2>";
						echo "<h2>Înapoi la <a href='produse.php'>magazin!</a></h2>";
						echo "<p>Bunurile comandate de dumneavoastra vor ajunge la curier in maxim 24 de ore pentru a putea onora toate produsele comandate de dumneavoastra cat mai repede. In acest interval puteti inca efectua comenzi pentru a prinde urmatoarea cursa. Curierii nostri incep munca in fiecare zi lucratoare de la ora 9:00 dimineata.</p>";
						}
					}
					else
					{
					?>
					<form id="adaugare1" action="<?php "comanda.php?id=".$_GET['id']?>" method="post">
						<div>
							<label><input type="text" required placeholder="Nume" name="nume" id="nume" value="" ></label>
						</div>
						<div>
							<label><input type="text" required placeholder="Prenume" name="prenume" id="prenume" value="" ></label>
						</div>
						<div>
							<label><input type="text" required placeholder="Localitate" name="localitate" id="localitate" value="" ></label>
						</div>
						<div>
							<label><input type="text" required placeholder="Judet" name="judet" id="judet" value="" ></label>
						</div>
						<div>
							<label><input type="text" required placeholder="Strada" name="strada" id="strada" value="" ></label>
						</div>
						<div>
							<label><input type="text" required placeholder="Numar" name="numar" id="numar" value="" ></label>
						</div>
						<div>
							<label><input type="text" placeholder="Bloc" name="bloc" id="bloc" value="" ></label>
						</div>
						<div>
							<label><input type="text" placeholder="Apartament" name="apartament" id="apartament" value="" ></label>
						</div>
						<div>
							<label><input type="tel" required placeholder="Telefon" name="telefon" id="telefon" value="" ></label>
						</div>
						<div>
							<input type="submit" name="submit" value="Comanda acum!">
						</div>
					</form>
			<?php
				} mysqli_close($connection);
			?>
    </div>
		<div class="col-lg-4" align="center"><br><br>
			<h1 id="adaugare2">MyClothes</h1><br><br><br><br>
			<img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
			<a id="adaugare3" href="produse.php">Magazin</a><br><br>
			<a id="adaugare3" href="a_comenzi.php">Comenzi</a><br><br>
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
