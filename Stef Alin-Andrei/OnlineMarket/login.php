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
						<li><a href="signin.php"><span class="glyphicon glyphicon-plus-sign"></span> Signin</a></li>
						<li class="active"><a href="login.php"><span class="glyphicon glyphicon-log-in"></span> Login<span class="sr-only">(current)</span></a></li>
					</ul>
				</div>
			</div>
		</nav>

		<?php
			require("mysql.php");

            if (isset($_POST['submit'])) {
                $usr_name = $_POST['uname'];
                $usr_password = $_POST['psw'];

				session_start();
				$_SESSION['login_user']= $usr_name;
				$_SESSION['login_pass']= $usr_password;

                $query = "SELECT * FROM users
						  WHERE users.user_name='".$usr_name."'AND users.user_password='".$usr_password."'";

                $result=mysqli_query($conexiune, $query);

                if (!$result) {
                    echo mysqli_error($conexiune);
                }
				else{
					$row = mysqli_fetch_assoc($result);
					if($row["user_name"]==$usr_name and $row["user_password"]==$usr_password){
						if($row["admin"]==1){
							echo "<meta http-equiv=\"refresh\" content=\"2; URL='homeadmin.php'\" >";
						}
						else{
							echo "<meta http-equiv=\"refresh\" content=\"2; URL='home.php?Id=".$row['Id']."'\" >";
						}
					}
					else{
					?>
					<br><br><br><br><br><br>
					<div id="messagealert">
						<h1 id="alert" align="center">Invalid user name or password!</h1>
						<br>
						<h2 id="alert" align="center">Retry <a href='login.php'>here</a></h2>
					</div>
					<?php
					}
                }
            }

			else{
				?>
				<form action="login.php" method="post">
					<br><br><br><br><br><br>
					<div class="container">
						<div class="row">
							<div class="col col-sm-12 col col-md-12 col col-lg-8">
								<h3>Login</h3>
								<input class="form-control" type="text" placeholder="Nume utilizator" name="uname" id="uname" required>
								<br>
								<input class="form-control" type="password" placeholder="Parola" name="psw" id="psw" required>
								<br>
								<div class="row justify-content-sm-left justify-content-md-left justify-content-lg-left">
									<div class="col col-sm-12 col col-md-6 col col-lg-2">
										<input class="btn btn-primary btn-lg" type="submit" name="submit" value="Login">
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
