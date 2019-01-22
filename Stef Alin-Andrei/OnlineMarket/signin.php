<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>OnlineMarket</title>
    <link href="page.css" rel="stylesheet">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
  </head>
  <body>
    <nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="signin.php"><span class="glyphicon glyphicon-plus-sign"></span> Signin<span class="sr-only">(current)</span></a></li>
						<li><a href="login.php"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<?php
			require("mysql.php");

            if (isset($_POST['submit'])) {
                $usr_name = $_POST['uname'];
                $usr_password = $_POST['psw'];
								$usr_admin = 0;

                $query = "INSERT INTO users (user_name,user_password,admin)
                          VALUES ('$usr_name', '$usr_password', '$usr_admin');";

                $result=mysqli_query($conexiune, $query);

                if (!$result) {
                    echo mysqli_error($conexiune);
                }
				else{
					?>
					<br><br><br><br><br><br>
					<div id="message">
						<h1 align="center">Account created successfully!</h1>
						<br>
						<h2 align="center">Login <a href='login.php'>here</a></h2>
					</div>
					<?php
                }
            }

			else{
				?>
				<form action="signin.php" method="post">
					<br><br><br><br><br><br>
					<div class="container">
						<div class="row"> <!--justify-content-sm-left justify-content-md-left justify-content-lg-left-->
							<div class="col col-sm-12 col col-md-12 col col-lg-8">
								<h3>Signin</h3>
								<input class="form-control" type="text" placeholder="Nume utilizator" name="uname" id="uname" required>
								<br>
								<input class="form-control" type="password" placeholder="Parola" name="psw" id="psw" required>
								<br>
								<div class="row justify-content-sm-left justify-content-md-left justify-content-lg-left">
									<div class="col col-sm-12 col col-md-6 col col-lg-2">
										<input class="btn btn-primary btn-lg" type="submit" name="submit" value="Signin">
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
				<?php
			}
			mysqli_close($conexiune);
				?>
	</body>
</html>
