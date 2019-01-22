var oldAcceleration = [0, 0, 0];
var isChange = 0;
var stepCount = 0;
var cf;
  
getCompassDirection();

function getCompassDirection() {

	if ('DeviceOrientationEvent' in window) {
		window.addEventListener('deviceorientationabsolute', deviceOrientationHandler, true);
	}
	else
	{
		console.log("NU SUPORT SENZORI !");
	}


}
function deviceOrientationHandler(eventData) {
	
	 cf = Math.round(eventData.alpha);

		document.getElementById("grade").innerHTML = cf;
	

		if((cf > 337) || (cf < 23))
		document.getElementById("busol").innerHTML = "NORD";
		else if ((cf >= 23) && (cf <=68))
		document.getElementById("busol").innerHTML = "NORD VEST";
		else if ((cf > 68) && (cf <113))
		document.getElementById("busol").innerHTML = "VEST";
		else if ((cf >= 113) && (cf <=158))
		document.getElementById("busol").innerHTML = "SUD VEST";
		else if ((cf > 158) && (cf <203))
		document.getElementById("busol").innerHTML = "SUD";
		else if ((cf >= 203) && (cf <=248))
		document.getElementById("busol").innerHTML = "SUD EST";
		else if ((cf > 248) && (cf <293))
		document.getElementById("busol").innerHTML = "EST";
		else if ((cf >= 293) && (cf <=337))
		document.getElementById("busol").innerHTML = "NORD EST";


	
}

