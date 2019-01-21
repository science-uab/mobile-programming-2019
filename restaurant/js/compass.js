function deviceOrientationListener(event) {
	var alpha    = event.alpha; //z axis rotation [0,360)
	var beta     = event.beta; //x axis rotation [-180, 180]
	var gamma    = event.gamma; //y axis rotation [-90, 90]
	var heading  = 360 - alpha; //heading [0, 360)
  }
  
  if(window.DeviceOrientationEvent){ //Check if device is compatible
		window.addEventListener("deviceorientation", deviceOrientationListener);
	  }