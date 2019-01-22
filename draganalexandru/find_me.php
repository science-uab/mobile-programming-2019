<!DOCTYPE html>
<html>
<style>
.styled-select {
   background: url(http://i62.tinypic.com/15xvbd5.png) no-repeat 96% 0;
   height: 29px;
   overflow: hidden;
   width: 240px;
}

.styled-select select {
   background: transparent;
   border: none;
   font-size: 14px;
   height: 29px;
   padding: 5px; 
   width: 268px;
}

.styled-select.slate {
   background: url(http://i62.tinypic.com/2e3ybe1.jpg) no-repeat right center;
   height: 34px;
   width: 240px;
}

.styled-select.slate select {
   border: 1px solid #ccc;
   font-size: 16px;
   height: 34px;
   width: 268px;
}

/* -------------------- Rounded Corners */
.rounded {
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
}

.semi-square {
   -webkit-border-radius: 5px;
   -moz-border-radius: 5px;
   border-radius: 5px;
}


.slate   { background-color: #ddd; }
.green   { background-color: #779126; }
.blue    { background-color: #3b8ec2; }
.yellow  { background-color: #eec111; }
.black   { background-color: #000; }


.slate select   { color: #000; }
.green select   { color: #fff; }
.blue select    { color: #fff; }
.yellow select  { color: #000; }
.black select   { color: #fff; }





.center-div
{
     margin: 0 auto;
     width: 100px; 
}
</style>
<body>
 <?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "facultate";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Conexiunea cu baza de date nu s-a realizat !! " . $conn->connect_error);
}
//$sql = "SELECT index_sala, nume_sala FROM graf";
//$result = $conn->query($sql);
//if ($result->num_rows > 0) {
//	
 //   while($row = $result->fetch_assoc()) {
//		echo $row["index_sala"] . ". " . $row["nume_sala"]. "<br>";
//	
//    }
//}

//$conn->close(); 

?> 
<script src="js/graph.js"></script>
<script src="js/sketch.js"></script>
<script src="js/three.js"></script>
<div class="center-div">
<div class="styled-select black rounded">
<select id="From">
  <option value="1">Poarta</option>
  <option value="2">Mijloc</option>
  <option value="3">LaboratorC1</option>
  <option value="4">LaboratorC2</option>
  <option value="5">LaboratorB1</option>
  <option value="6">LaboratorB2</option>
  
</select>
</div>
</div>
<div class="center-div">
<div class="styled-select black rounded">
<select id="To">
  <option value="1">Poarta</option>
  <option value="2">Mijloc</option>
  <option value="3">LaboratorC1</option>
  <option value="4">LaboratorC2</option>
  <option value="5">LaboratorB1</option>
  <option value="6">LaboratorB2</option>
</select>
</div>
</div>
<div class="center-div">
<button onclick="main();">Press</button>
</div>
<script>

function FromFunction() {
    var e = document.getElementById("From");
	var FromIndex = e.options[e.selectedIndex].value;
    return FromIndex;
}

function ToFunction() {
    var e = document.getElementById("To");
	var ToIndex = e.options[e.selectedIndex].value;
    return ToIndex;
}

function length(path){
	var i=0;
	while(path[i])
	{i = i + 1;}
	
	return i;
}

function main(){
	var map = {1:{2:40},2:{1:40,3:25,5:25},3:{4:5,2:25},4:{3:5},5:{2:25,6:5},6:{5:5}},
	graph = new Graph(map);
	
	var start = FromFunction();
	var end = ToFunction();
	
	var path = graph.findShortestPath(start, end)
	
	var k = length(path);
	

	window.alert(k);
}

var loader = new THREE.ColladaLoader();
loader.load('models/untitled.dae', function (result) {
  scene.add(result.scene);
});

</script>

</body>
</html>