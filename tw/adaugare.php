<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_adaugare.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: New Item</title>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">
      <?php
        require("mysql.php");
				if (isset($_POST['submit']))
				{
					$id = $_POST['id'];
          $denumire = $_POST['denumire'];
          $tip = $_POST['tip'];
          $marime = $_POST['marime'];
          $pret = $_POST['pret'];
          $Imagine = $_POST['Imagine'];
					$descriere = $_POST['descriere'];

          $query = "INSERT INTO produse (id,denumire,tip,marime,pret,Imagine)
                		VALUES ('$id','$denumire', '$tip', '$marime', '$pret', '$Imagine');";

					$query2 = "INSERT INTO descriere (id,descriere)
										VALUES ('$id','$descriere');";

          $result=mysqli_query($connection, $query);
					$result=mysqli_query($connection, $query2);

            if (!$result)
						{
            echo mysqli_error($connection);
            }
						else
						{
            echo "<h2>Produs adaugat!</h2>";
          	echo "<h2>Înapoi la <a href='logout.php'>magazin!</h2>";
            }
					}
					else
					{
          ?>
          <form id="adaugare1" action="adaugare.php" method="post">
						<div>
							<label><input type="text" required placeholder="Id" name="id" id="id" value="" ></label>
          	</div>
          	<div>
							<label><input type="text" required placeholder="Denumire" name="denumire" id="denumire" value="" ></label>
          	</div>
          	<div>
            	<label><input type="text" required placeholder="Tip" name="tip" id="tip" value="" ></label>
          	</div>
          	<div>
          		<label><input type="text" required placeholder="Marime" name="marime" id="marime" value="" ></label>
          	</div>
          	<div>
            	<label><input type="text" required placeholder="Pret" name="pret" id="pret" value="" ></label>
          	</div>
          	<div>
            	<label><input type="text" placeholder="Imagine" name="Imagine" id="Imagine" value="" ></label>
          	</div>
						<div>
						<label><input type="text" required placeholder="Descriere" name="descriere" id="descriere" value="" ></label>
						</div>
          	<div>
            	<input type="submit" name="submit" value="Adauga produsul">
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
			<a id="adaugare3" href="cautare.php">Cautare</a><br><br>
			<a id="adaugare3" href="logout.php">Logout</a>
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
