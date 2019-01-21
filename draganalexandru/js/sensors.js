var ax, ay;
var ix, iy, mx, my;
var cf,i=1,ci;

 var c = document.getElementById("map");
		  var ctx = c.getContext("2d");
ix = 960;
iy = 800;
mx = ix;
my = iy;
ctx.beginPath();
ctx.strokeStyle = "red";
ctx.moveTo(ix, iy);
		  
if ('DeviceOrientationEvent' in window) {
		  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
		} 

		function deviceOrientationHandler (eventData) {
		  var dir = eventData.alpha;
		  
		  document.getElementById("doDirection").innerHTML = Math.round(dir);
		  
		   cf = Math.round(dir);
		 
		 if(i==1)
			ci = cf;
			if(i<2)
				i=i+1; 
		}
		
		
		
		if ('LinearAccelerationSensor' in window) {
  
		let lastReadingTimestamp;
		let accelerometer = new LinearAccelerationSensor();
		accelerometer.addEventListener('reading', e => {
		if (lastReadingTimestamp) {
		intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
		}
		lastReadingTimestamp = accelerometer.timestamp
		accelerationHandler(accelerometer, 'moAccel');
		});
		accelerometer.start();
  

		  
		} else if ('DeviceMotionEvent' in window) {
		  
		  var onDeviceMotion = function (eventData) {
			accelerationHandler(eventData.acceleration, 'moAccel');
			intervalHandler(eventData.interval);
		  }
		  
		  window.addEventListener('devicemotion', onDeviceMotion, false);
		} 

		function accelerationHandler(acceleration, targetId) {
		//  var info, xyz = "[X, Y]",  ax, ay, bx, by;

		//  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
		//  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
		
		
		  ax = acceleration.x.toFixed(3);
		  ay = acceleration.y.toFixed(3);
		  document.getElementById(targetId).innerHTML = ay;
		  
		  
		  if((ay > 1) && (cf > ci))
		  {	my=my+1;
			mx=mx-(cf-ci);
			  ctx.lineTo(mx, my);
			  ci=cf;
			}
			
		 if((ay > 1) && (cf < ci))
		  {	my=my+ay;
			mx=mx+(cf-ci);
			  ctx.lineTo(mx, my);
			  ci=cf;
			}
			
		if((ay < -1) && (cf > ci))
		  {	my=my-ay;
			mx=mx-(cf-ci);
			  ctx.lineTo(mx, my);
			  ci=cf;
			}
		
		if((ay < -1) && (cf < ci))
		  {	my=my-ay;
			mx=mx+(cf-ci);
			  ctx.lineTo(mx, my);
			  ci=cf;
			}
	/*	  else if(ay < -0.68)
			 { my=my-20;
				 ctx.lineTo(mx, my);
				}
				else if(cf > ci)
			 {mx=mx-1;
				 ctx.lineTo(mx, my);
				}
				*/
		  
		  			ctx.stroke();
		}


		function intervalHandler(interval) {
		  document.getElementById("moInterval").innerHTML = interval;
		}
		
		function main() {
			
		}
		main();
	