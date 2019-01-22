<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>OnlineMarket</title>
    <link href="product.css" rel="stylesheet">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
  </head>
  <body>
    <nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="home.php"><span class="glyphicon glyphicon-home"></span> Home</a></li>
            <li><a href="products.php"><span class="glyphicon glyphicon-th-list"></span> Products</a></li>
						<li class="active"><a href="cart.php"><span class="glyphicon glyphicon-shopping-cart"></span> Cart<span class="sr-only">(current)</span></a></li>
					</ul>
				</div>
			</div>
		</nav>

    <?php
      require("mysql.php");
      $total = 0;
      if (isset($_GET['Id'])) {
        $id_user = $_GET['Id'];
      }

    if (isset($_POST['submit'])) {
      $select = "SELECT Id_cart FROM cart";
      $query = mysqli_query($conexiune, $select) or die ('Eroare');
      if (mysqli_num_rows($query) > 0) {
        while($row = mysqli_fetch_assoc($query)) {
          $delete = "DELETE from cart where Id_cart=".$row["Id_cart"];
  				$result=mysqli_query($conexiune, $delete);
        }
        echo "<h2>The command was send!</h2>";
      }
      else{
        echo "<h2>The cart is empty!</h2>";
      }
    }
    else{
      $select = "SELECT Id_cart FROM cart";
      $query = mysqli_query($conexiune, $select) or die ('Eroare');
      if (mysqli_num_rows($query) == 0) {
        echo "<h2>The cart is empty!</h2>";
      }
      else{
      $select = "SELECT * FROM cart";
      $query = mysqli_query($conexiune, $select) or die ('Eroare');
    ?>



      <!--else {
        $benef = "SELECT * FROM products WHERE products.Id_product=".$id_product;
      }

      $query = mysqli_query($conexiune, $benef) or die ('Eroare');
    ?>-->

    <div class="container">
      <div class="row justify-content-sm-left justify-content-md-left justify-content-lg-left">
        <div class="col col-sm-12 col col-md-12 col col-lg-12">
            <div class="row justify-content-sm-left justify-content-md-left justify-content-lg-left">
              <div class="col col-sm-12 col col-md-12 col col-lg-12">
                <table id="sold">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category</th>
                  </tr>

                <?php
                  if (mysqli_num_rows($query) > 0) {

                    while($row = mysqli_fetch_assoc($query)) {
                      echo "<tr>";
                      echo "<td>" . $row["Id_cart"] . "</td>";
                      echo "<td>" . $row["name_cart"] . "</td>";
                      echo "<td>" . $row["quantity_cart"] . "</td>";
                      echo "<td>" . $row["price_cart"] . "</td>";
                      echo "<td>" . $row["category_cart"] . "</td>";
                      $total = $total + $row["price_cart"];
                      echo "</tr>";
                    }
                  }
                }
              }
                ?>
                </table>
                <br>
                <form action="cart.php" method="post">
                  <?php
                  if($total != 0)
                    echo "<h3>Total payment " . $total . " lei</h3>";
                   ?>
                   <div>
                       <label for="name">ADDRESS:</label>
                       <input type="text" name="name" id="name" value="" required>
                   </div>
                  <div id="send">
                    <input id="button" type="submit" name="submit" value="Send command">
                  </div>
                </form>
              </div>
            </div>
    </div>
  </body>
</html>
