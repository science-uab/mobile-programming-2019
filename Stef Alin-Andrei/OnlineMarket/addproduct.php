<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>OnlineMarket</title>
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
		<link href="product.css" rel="stylesheet">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  </head>
  <body>
    <nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li ><a href="homeadmin.php"><span class="glyphicon glyphicon-home"></span> Home</a></li>
            <li><a href="productsadmin.php"><span class="glyphicon glyphicon-th-list"></span> Products</a></li>
						<li><a href="cartadmin.php"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
            <li class="active"><a href="addproduct.php"><span class="glyphicon glyphicon-refresh"></span> Add/Remove Product<span class="sr-only">(current)</span></a></li>
					</ul>
				</div>
			</div>
		</nav>
    <?php
    if (isset($_GET['Id'])) {
      $id_user = $_GET['Id'];
    }

            require("mysql.php");

            $action = "view";
            if (isset($_GET['Id_product'])) {
              $id_product = $_GET['Id_product'];
              if (isset($_GET['action'])) {
      					$action = $_GET['action'];
      				}
            }

            if (isset($_POST['submit'])) {
                $name = $_POST['name'];
                $quantity = $_POST['quantity'];
                $price = $_POST['price'];
                $category = $_POST['category'];

				$query = "INSERT INTO products (name_product,quantity_product,price_product,category)
                            VALUES ('$name', '$quantity', '$price', '$category');";

                $result=mysqli_query($conexiune, $query);

                if (!$result) {
                   	echo mysqli_error($conexiune);
                }
				else{
                    echo "<h2>Adding successfully!</h2>";
                    echo "<meta http-equiv=\"refresh\" content=\"0.1; URL='addproduct.php'\" >";
                }

            }
			else{
        ?>
			<form action="addproduct.php" method="post">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" value="" >
                </div>
                <div>
                    <label for="quantity">Quantity:</label>
                    <input type="text" name="quantity" id="quantity" value="" >
                </div>
                <div>
                    <label for="price">PRICE:</label>
                    <input type="text" name="price" id="price" value="" >
                </div>
                <div>
                    <label for="category">CATEGORY:</label>
                    <input type="text" name="category" id="category" value="" >
                </div>
                <div id="send">
                    <input type="submit" name="submit" value="Add">
                </div>
            </form>

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


                $select = "SELECT * FROM products";
                $query = mysqli_query($conexiune, $select) or die ('Eroare');
                  if (mysqli_num_rows($query) > 0) {
                    while($row = mysqli_fetch_assoc($query)) {
                      echo "<tr>";
                      echo "<td>" . $row["Id_product"] . "</td>";
                      echo "<td>" . $row["name_product"] . "</td>";
                      echo "<td>" . $row["quantity_product"] . "</td>";
                      echo "<td>" . $row["price_product"] . "</td>";
                      echo "<td>" . $row["category"] . "</td>";
                      echo "<td><a href='addproduct.php?Id_product=" . $row['Id_product'] . "&action=delete'><span class='glyphicon glyphicon-trash'></span></a></td>";
                      echo "</tr>";
                    }
                  }

                  if ($action == "delete") {
                    $query = "DELETE from products where Id_product=".$id_product;
                    $result=mysqli_query($conexiune, $query);

                    if (!$result) {
                      echo mysqli_error($conexiune);
                    } else {
                      echo "<h2>Deleting successfully!</h2>";
                      echo "<meta http-equiv=\"refresh\" content=\"2; URL='addproduct.php'\" >";
                    }
                  }
                ?>
                </table>
              </div>
            </div>

            <?php
            }
            mysqli_close($conexiune);

            ?>
	</body>
</html>
