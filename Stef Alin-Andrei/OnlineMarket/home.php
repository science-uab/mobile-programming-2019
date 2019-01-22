<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>OnlineMarket</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
  </head>
  <body>
    <nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="home.php"><span class="glyphicon glyphicon-home"></span> Home<span class="sr-only">(current)</span></a></li>
            <li><a href="products.php"><span class="glyphicon glyphicon-th-list"></span> Products</a></li>
						<li><a href="cart.php"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
					</ul>
				</div>
			</div>
		</nav>
    <?php
    if (isset($_GET['Id'])) {
      $id_user = $_GET['Id'];
    }
    ?>
    <br><br><br><br><br><br>
    <font color="black" size="200px" align="center">
      <p> Welcome to OnlineMarket</p>
      <p id="date"></p>
      <p id="time"></p>
    </font>
    <script>
      if (typeof(w1) == "undefined") {
        w1 = new Worker("date.js");
      }
      w1.onmessage = function(event){
        document.getElementById("date").innerHTML = "Date: " + event.data;
      };

      if (typeof(w2) == "undefined") {
        w2 = new Worker("time.js");
      }
      w2.onmessage = function(event){
        document.getElementById("time").innerHTML = "Time: " + event.data;
      };
    </script>
  </body>
</html>
