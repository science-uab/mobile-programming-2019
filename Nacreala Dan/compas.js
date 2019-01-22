function deviceOrientationListener(event) {
      var alpha    = event.alpha; //z 0,360
      var beta     = event.beta; //x -180,180
      var gamma    = event.gamma; //y -90,90

      if (typeof event.webkitCompassHeading !== "undefined") {
        alpha = event.webkitCompassHeading; 
        var heading = alpha
        document.getElementById("heading").innerHTML = heading.toFixed([0]);
      }
      else {
        
        var heading = 360 - alpha; 
        document.getElementById("heading").innerHTML = heading.toFixed([0]);
      }
      if (heading > 359 || heading < 1) { 
        document.body.style.backgroundColor = "green";
        document.getElementById("heading").innerHTML = "N"; 
      }
       else if (heading > 179 && heading < 181){ 
        document.body.style.backgroundColor = "green";
        document.getElementById("heading").innerHTML = "S"; 
      } 
      else if (heading > 89 && heading < 91){ 
        document.body.style.backgroundColor = "blue";
        document.getElementById("heading").innerHTML = "E"; 
      } 
      else if (heading > 269 && heading < 271){ 
        document.body.style.backgroundColor = "blue";
        document.getElementById("heading").innerHTML = "V"; 
      } 
      
      else { 
        document.body.style.backgroundColor = "black";
      }
    }

 if (window.DeviceOrientationAbsoluteEvent) {
      window.addEventListener("DeviceOrientationAbsoluteEvent", deviceOrientationListener);
    }
else if(window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", deviceOrientationListener);
    }
else {
      alert("Telefonul nu este compatibil.");
    }