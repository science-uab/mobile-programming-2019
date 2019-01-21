document.addEventListener("DOMContentLoaded", function(event) {

	if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function(eventData) {
    var tiltLR = eventData.gamma;
    var tiltFB = eventData.beta;
	var a=90;
    var dir = eventData.alpha - a;
    deviceOrientationHandler(tiltLR, tiltFB, dir);
  }, false);
} else {
};

    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
      document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
      document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
      document.getElementById("direction").innerHTML = Math.ceil(dir);
      var compassDisc = document.getElementById("compassDiscImg");
      compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
      compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
      compassDisc.style.transform = "rotate("+ dir +"deg)";
    }
function clock() {// 
var time = new Date(),
    
    hours = time.getHours(),
    
    minutes = time.getMinutes(),
    
    
    seconds = time.getSeconds();

document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
  
  function harold(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(clock, 1000);
});
