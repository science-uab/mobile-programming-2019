document.getElementById("id_business_version").innerHTML="Business version: 2019.01.18.11";
document.getElementById("id_start_button").addEventListener("click", start);
document.getElementById("id_stop_button").addEventListener("click", stop);

var w1;
var w2;
var w3;
var w4;
var w5;
var w6;

function start()
{
	if(typeof(Worker) !== "undefined")
	{
		if(typeof(w1) == "undefined")
		{
			w1 = new Worker("primul_numar.js");
		}
		w1.onmessage = function(e)
		{
			document.getElementById("1Numar").innerHTML = e.data;
		};
		
		if(typeof(w2) == "undefined")
		{
			w2 = new Worker("al_doilea_numar.js");
		}
		w2.onmessage = function(e)
		{
			document.getElementById("2Numar").innerHTML = e.data;
		};
		
		if(typeof(w3) == "undefined")
		{
			w3 = new Worker("al_treilea_numar.js");
		}
		w3.onmessage = function(e)
		{
			document.getElementById("3Numar").innerHTML = e.data;
		};
		
		if(typeof(w4) == "undefined")
		{
			w4 = new Worker("al_patrulea_numar.js");
		}
		w4.onmessage = function(e)
		{
			document.getElementById("4Numar").innerHTML = e.data;
		};
		
		if(typeof(w5) == "undefined")
		{
			w5 = new Worker("al_cincilea_numar.js");
		}
		w5.onmessage = function(e)
		{
			document.getElementById("5Numar").innerHTML = e.data;
		};
		
		if(typeof(w6) == "undefined")
		{
			w6 = new Worker("al_saselea_numar.js");
		}
		w6.onmessage = function(e)
		{
			document.getElementById("6Numar").innerHTML = e.data;
		};
	}	
}

function stop()
{
	w1.terminate();
	w1 = undefined;
	w2.terminate();
	w2 = undefined;
	w3.terminate();
	w3 = undefined;
	w4.terminate();
	w4 = undefined;
	w5.terminate();
	w5 = undefined;
	w6.terminate();
	w6 = undefined;
}
