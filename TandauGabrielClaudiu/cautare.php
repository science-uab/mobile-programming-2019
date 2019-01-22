<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_cautare.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Search</title>
  <?php require("mysql.php");?>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">
      <header>
        <h1 id="cautare1">Cautare produse</h1>
      </header>
			<form action="cautare.php" id="cautare1" method="post">
        <input type="text" placeholder="ex: Pantofi" name="caut" id="caut" value="">
        <input type="submit" name="submit" value="Cauta!">
      </form>
      <?php
        if (isset($_POST['submit']))
				{
          $termen_cautare = $_POST['caut'];
          $query = "SELECT * FROM produse WHERE denumire LIKE '%" . $termen_cautare . "%'";
          $rezultat = mysqli_query($connection, $query) or die ('Eroare');
          $nr_rezultate = mysqli_num_rows($rezultat);
          if ($nr_rezultate == 0)
					{
            echo "<h3>Nu s-a gasit nici un produs.</h3>";
          }
					else
					{
						?>
			      <p id="cautare1"><strong>Rezultate gasite: <?php echo $nr_rezultate;?></strong></p>
						<table>
		          <tr>
		            <th>Produs</th>
		            <th>Nume</th>
		            <th>Tip</th>
		            <th>Marime</th>
		            <th>Pret</th>
		            <th>Imagine</th>
			          </tr>
						<?php
			      while ($row = mysqli_fetch_assoc($rezultat))
						{
			       	echo "<tr>";
							echo "<td>" . $row['id'] . "</td>";
			        echo "<td><a href='descriere.php?id=".$row['id']."'>" . $row['denumire'] . "</a></td>";
			        echo "<td>" . $row['tip'] . "</td>";
			        echo "<td>" . $row['marime'] . "</td>";
			        echo "<td>" . $row['pret'] . "</td>";
			        echo "<td>" . $row['Imagine'] . "</td>";
			        echo "</tr>";}
			    	?>
						</table>
				<?php
						}
					}
				?>

    </div>

		<div class="col-lg-4" align="center"><br><br>
			<h1 id="cautare2">MyClothes</h1><br><br><br><br>
			<img src="./img/logo2.png" alt="Logo2" height=100px width=120px><br><br><br><br>
      <a id="cautare3" href="produse.php">Magazin</a><br><br>
			<a id="cautare3" href="cautare.php">Cautare</a><br><br>
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
