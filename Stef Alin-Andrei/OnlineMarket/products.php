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
            <li class="active"><a href="products.php"><span class="glyphicon glyphicon-th-list"></span> Products<span class="sr-only">(current)</span></a></li>
						<li><a href="cart.php"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
					</ul>
				</div>
			</div>
		</nav>

    <?php
      $lista = true;
      $action = "view";
      if (isset($_GET['Id_product'])) {
        $lista = false;
        $id_product = $_GET['Id_product'];
        if (isset($_GET['action'])) {
          $action = $_GET['action'];
        }
      }

      if (isset($_GET['Id'])) {
        $id_user = $_GET['Id'];
      }

      require("mysql.php");

      if ($lista) {
        $select = "SELECT * FROM products";
        $query = mysqli_query($conexiune, $select) or die ('Eroare');
      }

      else {
        $select = "SELECT * FROM products WHERE Id_product=".$id_product;
        $query = mysqli_query($conexiune, $select) or die ('Eroare');
        if (mysqli_num_rows($query) > 0) {
          while($row = mysqli_fetch_assoc($query)) {
            $idv = $row["Id_product"];
            $namev = $row["name_product"];
            $quantityv = $row["quantity_product"];
            $pricev = $row["price_product"];
            $categoryv = $row["category"];
          }
        }
        $insert = "INSERT INTO cart (name_cart,quantity_cart,price_cart,category_cart)
                    VALUES ('$namev', '$quantityv', '$pricev', '$categoryv');";
        $result=mysqli_query($conexiune, $insert);
        echo "<meta http-equiv=\"refresh\" content=\"0.00001; URL='products.php'\" >";
      }
		?>

      <!--else {
        $benef = "SELECT * FROM products WHERE products.Id_product=".$id_product;
      }

      $query = mysqli_query($conexiune, $benef) or die ('Eroare');
    ?>-->

    <div class="container">
      <div class="row justify-content-sm-left justify-content-md-left justify-content-lg-left">
        <div class="col col-sm-12 col col-md-12 col col-lg-12">

          <?php
            if ($action == "view") {
              if ($lista) {
          ?>
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
                      echo "<td>" . $row["Id_product"] . "</td>";
                      echo "<td>" . $row["name_product"] . "</td>";
                      echo "<td>" . $row["quantity_product"] . "</td>";
                      echo "<td>" . $row["price_product"] . "</td>";
                      echo "<td>" . $row["category"] . "</td>";
                      echo "<td><a href='products.php?Id_product=".$row['Id_product']."&action=view'>" . "Add to cart" . "</a></td>";
                      echo "</tr>";
                    }
                  }
              }
            }
                ?>
                </table>
              </div>
            </div>
    </div>
  </body>
</html>
