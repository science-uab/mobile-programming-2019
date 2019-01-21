<!DOCTYPE html>
<html>

<head>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="p_general.css">
	<link rel="stylesheet" type="text/css" href="p_produse.css">
	<link rel="stylesheet" type="text/css" href="p_adaugare.css">
	<link rel="icon" type="image/x-icon" href="./img/iconita.png">
	<title>MyClothes: Edit</title>

</head>

<body>

	<div class="row">
		<div class="col-lg-8">

      <?php
      if (isset($_GET['id']))
      {
        $id = $_GET['id'];
        require("mysql.php");
          if (isset($_POST['submit']))
          {
            $query = "UPDATE produse
						JOIN descriere
						ON produse.id = descriere.id
            SET denumire='".$_POST['denumire']."',
            tip='". $_POST['tip'] ."',
            marime='". $_POST['marime'] ."',
            pret='". $_POST['pret'] ."',
            Imagine='". $_POST['Imagine'] ."',
						descriere='". $_POST['descriere']."'
            WHERE descriere.id=".$id;
            $result=mysqli_query($connection, $query);
                  if (!$result)
                  {
                    echo mysqli_error($connection);
                  }
                  else
                  {
                  echo "<h2>Modificare efectuată cu succes!</h2>";
                  echo "<h2>Înapoi la <a href='logout.php'>produse.</a></h2>";
                  }
          }
          else
          {
            $query = "SELECT * FROM produse WHERE produse.id=".$id;
            $rezultat = mysqli_query($connection, $query) or die ('Eroare');
            $row=mysqli_fetch_assoc($rezultat);
            ?>
            <form id="adaugare1" action="m_produse.php?id=<?=$id?>" method="post">
              <div>
                <input type="text" required placeholder="Denumire" name="denumire" id="denumire" value="" >
              </div>
              <div>
                <input type="text" required placeholder="Tip" name="tip" id="tip" value="" >
              </div>
              <div>
                <input type="text" required placeholder="Marime" name="marime" id="marime" value="" >
              </div>
              <div>
                <input type="text" required placeholder="Pret" name="pret" id="pret" value="" >
              </div>
              <div>
                <input type="text" placeholder="Imagine" name="Imagine" id="Imagine" value="" >
              </div>
							<div>
                <input type="text" placeholder="Descriere" name="descriere" id="descriere" value="" >
              </div>
              <div>
                <input type="submit" name="submit" value="Modifica">
              </div>
            </form>
            <?php
          }
          mysqli_close($connection);
        }
        else
        {
          echo "<p>Modificarea nu a avut succes.</p>";
          echo "<p>Mergeți înapoi la <a href='produse.php'>produse</a> si alegeti unul.</p>";
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
