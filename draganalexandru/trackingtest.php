<html>

	<head>
		<title>APP</title>
		<style>
			body { margin: 0; }
			canvas { width: 100%; height: 100% }
		</style>
	</head>
	<body>
	
			<table class="table table-striped table-bordered">
		  <tr>
			<td>Compas: </td>
			<td id="doDirection"></td>
		  </tr>
		</table>

		
			<table class="table table-striped table-bordered">
		  <tr>
			<td>Acceleratie liniara (y): </td>
			<td id="moAccel"></td>
		  </tr>
		  <tr>
			<td>Interval (ms): </td>
			<td id="moInterval"></td>
		  </tr>
		</table>
	
		<canvas id="map" width="1920" height="1080" style="border:1px solid #000000;">
		</canvas> 
	
	</body>
	<script src="js/sensors.js"></script>
	<script src="js/shake.js"></script>
		<script>

		var myShakeEvent = new Shake({
		threshold: 10, // optional shake strength threshold
		timeout: 1000 // optional, determines the frequency of event generation
	});
	
	myShakeEvent.start();
	
	window.addEventListener('shake', shakeEventDidOccur, false);


	function shakeEventDidOccur () {
		kshake=1;
		alert('shake!');
	}
	
	kshake=0;

	

	</script>
</html>