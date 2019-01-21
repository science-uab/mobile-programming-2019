var canvas = document.getElementById("harta");
var ctx = canvas.getContext("2d");
var mx = 180;
var my = 180;
ctx.moveTo(mx, my);
var oldAcceleration = [0, 0, 0];
var isChange = 0;
var stepCount = 0;
var scrollAmount = 30;
// var pas = 0;
var cf;
var i = 1;

init();



function init() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
		console.log('This device does not support Device Motion');
	}

	if ('DeviceOrientationEvent' in window) {
		window.addEventListener('deviceorientationabsolute', deviceOrientationHandler, true);
	}

	function deviceOrientationHandler(eventData) {
		var dir = eventData.alpha;

		cf = Math.round(dir);
		document.getElementById("busolagrade").innerHTML = cf;

	/*	if((cf > 337) || (cf < 23))
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

		*/


	}

}

function deviceMotionHandler(eventData) {
	var info, xyz = "[X, Y, Z]";


	var acceleration = eventData.acceleration;
	info = xyz.replace("X", acceleration.x);
	info = info.replace("Y", acceleration.y);
	info = info.replace("Z", acceleration.z);
	//document.getElementById("moAccel").innerHTML = info;


	acceleration = eventData.accelerationIncludingGravity;
	info = xyz.replace("X", acceleration.x);
	info = info.replace("Y", acceleration.y);
	info = info.replace("Z", acceleration.z);
	//document.getElementById("moAccelGrav").innerHTML = info;

	var rotation = eventData.rotationRate;
	info = xyz.replace("X", rotation.alpha);
	info = info.replace("Y", rotation.beta);
	info = info.replace("Z", rotation.gamma);


	info = eventData.interval;
	//document.getElementById("moInterval").innerHTML = info;   

	var dot = (oldAcceleration.x * acceleration.x) +
		(oldAcceleration.y * acceleration.y) +
		(oldAcceleration.z * acceleration.z);

	var a = Math.abs(Math.sqrt(Math.pow(oldAcceleration.x, 2) +
		Math.pow(oldAcceleration.y, 2) +
		Math.pow(oldAcceleration.z, 2)));

	var b = Math.abs(Math.sqrt(Math.pow(acceleration.x, 2) +
		Math.pow(acceleration.y, 2) +
		Math.pow(acceleration.z, 2)));

	dot /= (a * b);

	//console.log(dot);

	if (dot <= 0.994 && dot > 0.90) { //bounce
		//console.log("bounce");
		//console.log("step count: " + stepCount + ", isChange: " + isChange);
		if (isChange == 0) {
			stepCount += 1;
			stepDetected();
		} else {
			if (isChange == 3) {
				isChange = -1;
			}
		}
		isChange += 1;
	}

	oldAcceleration = acceleration;


	document.getElementById("moStepCount").innerHTML = stepCount;
}

function drawing(){
	if ((cf > 337) || (cf < 23))
	{		//nord
		my = my - 6;
		this.ctx.lineTo(mx,my);
	}

	if ((cf > 158) && (cf <203))
	{ 		//sud
		my = my + 6;
		this.ctx.lineTo(mx,my);
	}
	
	if ((cf > 68) && (cf <113))
	{		//vest
		mx = mx - 6;
		this.ctx.lineTo(mx,my);
	}

	if ((cf > 248) && (cf <293))
	{		// est
		mx = mx + 6;
		this.ctx.lineTo(mx,my);
	}

	if((cf >= 23) && (cf <=68))
	{	// nord vest
		mx = mx - 6;
		my = my - 6;
		this.ctx.lineTo(mx,my);
	}

	if((cf >= 293) && (cf <=337))
	{	// nord est
		mx = mx + 6;
		my = my - 6;
		this.ctx.lineTo(mx,my);
	}

	if((cf >= 113) && (cf <=158))
	{	// sud vest
		mx = mx - 6;
		my = my + 6;
		this.ctx.lineTo(mx,my);
	}

	if((cf >= 203) && (cf <=248))
	{	// sud est
		mx = mx + 6;
		my = my + 6;
		this.ctx.lineTo(mx,my);
	}

	this.ctx.stroke();
}

function stepDetected() {

	drawing();	

}



/* function pasi() {
	pas = pas + 1;
	document.getElementById("nrpasi").innerHTML = pas;



	my=my-10;
	this.ctx.lineTo(mx,my);
	this.ctx.stroke();


	drawing();
		
	}

*/