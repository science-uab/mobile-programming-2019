<!DOCTYPE html>
<html>
<style>
body {
  font: 13px/20px "Lucida Grande", Tahoma, Verdana, sans-serif;
  color: #404040;
  background: #007fff;
}

.container {
  margin: 80px auto;
  width: 400px;
  text-align: center;
}

.container > .dropdown {
  margin: 0 20px;
  vertical-align: top;
}

.dropdown {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 28px;
  width: 150px;
  background: #f2f2f2;
  border: 1px solid;
  border-color: white #f7f7f7 whitesmoke;
  border-radius: 3px;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.dropdown:before, .dropdown:after {
  content: '';
  position: absolute;
  z-index: 2;
  top: 9px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px dashed;
  border-color: #888888 transparent;
  pointer-events: none;
}

.dropdown:before {
  border-bottom-style: solid;
  border-top: none;
}

.dropdown:after {
  margin-top: 7px;
  border-top-style: solid;
  border-bottom: none;
}

.dropdown-select {
  position: relative;
  width: 130%;
  margin: 0;
  padding: 6px 8px 6px 10px;
  height: 28px;
  line-height: 14px;
  font-size: 12px;
  color: #62717a;
  text-shadow: 0 1px white;
  background: #f2f2f2; /* Fallback for IE 8 */
  background: rgba(0, 0, 0, 0) !important; /* "transparent" doesn't work with Opera */
  border: 0;
  border-radius: 0;
  -webkit-appearance: none;
}

.dropdown-select:focus {
  z-index: 3;
  width: 100%;
  color: #394349;
  outline: 2px solid #49aff2;
  outline: 2px solid -webkit-focus-ring-color;
  outline-offset: -2px;
}

.dropdown-select > option {
  margin: 3px;
  padding: 6px 8px;
  text-shadow: none;
  background: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;
}

/* Fix for IE 8 putting the arrows behind the select element. */

.lt-ie9 .dropdown {
  z-index: 1;
}

.lt-ie9 .dropdown-select {
  z-index: -1;
}

.lt-ie9 .dropdown-select:focus {
  z-index: 3;
}


@-moz-document url-prefix() {
  .dropdown-select {
    padding-left: 6px;
  }
}

.dropdown-dark {
  background: #444;
  border-color: #111111 #0a0a0a black;
  background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
  -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
}

.dropdown-dark:before {
  border-bottom-color: #aaa;
}

.dropdown-dark:after {
  border-top-color: #aaa;
}

.dropdown-dark .dropdown-select {
  color: #aaa;
  text-shadow: 0 1px black;
  background: #444;  /* Fallback for IE 8 */
}

.dropdown-dark .dropdown-select:focus {
  color: #ccc;
}

.dropdown-dark .dropdown-select > option {
  background: #444;
  text-shadow: 0 1px rgba(0, 0, 0, 0.4);
}

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

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexiunea cu baza de date nu s-a realizat !! " . $conn->connect_error);
}


?> 
<script src="graph.js"></script>
<section class="container">
  <div class="dropdown">
<select id="From" class="dropdown-select">
  <option value="1">Poarta</option>
  <option value="2">Mijloc</option>
  <option value="3">LaboratorC1</option>
  <option value="4">LaboratorC2</option>
  <option value="5">LaboratorB1</option>
  <option value="6">LaboratorB2</option> 
</select>
</div>
<div class="dropdown dropdown-dark">
<select id="To" class="dropdown-select">
  <option value="1">Poarta</option>
  <option value="2">Mijloc</option>
  <option value="3">LaboratorC1</option>
  <option value="4">LaboratorC2</option>
  <option value="5">LaboratorB1</option>
  <option value="6">LaboratorB2</option>
</select>
</div>
</section>
<div class="center-div">
<button onclick="main();">Arata</button>
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



</script>

</body>
</html>