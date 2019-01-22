$(document).ready(function(){
  getLocation();


	var weather = $("#weather");
	/**
	 * functia pentru coordonatele GPS
	 */
	function getLocation() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	  } else {
	    weather.innerHTML = "Geolocation is not supported by this browser.";
	  }
	}

	/**
	 *Functia API care afiseaza temperatura
	 */
	function showPosition(position) {
	  	var longitude = position.coords.longitude;
	  	var latitude = position.coords.latitude;
	  	var urlString = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;
		$.ajax({
		    url: urlString,
		    success: function(result){
				console.log(result);
		    	$("#city").text(result.name + ", " + result.sys.country);
		    	$("#temp").text((result.main.temp).toPrecision(2));
		    	$("#unit").text("°C");
		    	$("#main").text(result.weather[0].main);
		    	$("#icon > img").attr({
		    		"src": result.weather[0].icon,
		    	});
		    }
	  	});
		console.log(urlString);
	}

	/**
	 * schimbarea temperaturii din C in F si invers
	 */
	$("#unit").click(function(event) {
		if ($("#unit").text() == "°C") {
			let tempC = $("#temp").text();
			let tempF = (tempC * 1.8) + 32;
			$("#temp").text(Math.round(tempF));
			$("#unit").text("°F");
		}else if ($("#unit").text() == "°F") {
			let tempF = $("#temp").text();
			let tempC = (tempF - 32) / 1.8;
			$("#temp").text(tempC.toPrecision(2));
			$("#unit").text("°C");
		}
		
	});

	/**
	 * camera si dispozitivele ei 
	 */
	var videoElement = document.querySelector('video');
	var videoSelect = document.querySelector('select#videoSource');

	navigator.mediaDevices.enumerateDevices()
	  .then(gotDevices).then(getStream).catch(handleError);

	videoSelect.onchange = getStream;

	function gotDevices(deviceInfos) {
	  for (var i = 0; i !== deviceInfos.length; ++i) {
	    var deviceInfo = deviceInfos[i];
	    var option = document.createElement('option');
	    option.value = deviceInfo.deviceId;
	    if (deviceInfo.kind === 'videoinput') {
	      option.text = deviceInfo.label || 'camera ' +
	        (videoSelect.length + 1); 
	    } else {
	      console.log('am gasit alte device uri: ', deviceInfo);
	    }
	  }
	}

	function getStream() {
	  if (window.stream) {
	    window.stream.getTracks().forEach(function(track) {
	      track.stop();
	    });
	  }

	  var constraints = {
	    video: {
	      deviceId: {exact: videoSelect.value}
	    }
	  };

	  navigator.mediaDevices.getUserMedia(constraints).
	    then(gotStream).catch(handleError);
	}

	function gotStream(stream) {
	  window.stream = stream; // camera valabila penrtu consola
	  videoElement.srcObject = stream;
	}

	function handleError(error) {
	  console.log('Error: ', error);
	}
});