//document.getElementById("id_bussiness_version").innerHTML="Bussiness version: 2019.01.19.4";

function rotunjire(numar)
{
	return Math.round(numar*100)/100
}

// pentru greutate

function kgconvertor()
{
	with (document.kggr)
	{
		gr.value = rotunjire(kg.value*1000);
	}
}

function grconvertor()
{
	with (document.kggr)
	{
		kg.value = gr.value/1000;
	}
}

//pentru distanta

function cmconvertor()
{
	with (document.cminch)
	{
		inch.value = rotunjire(cm.value/2.54);
	}
}

function inchconvertor()
{
	with (document.cminch)
	{
		cm.value = rotunjire(inch.value*2.54);
	}
}

//pentru temperatura

function cconvertor()
{
	with (document.cf)
	{
		f.value = rotunjire(c.value*1.8)+32;
	}
}

function fconvertor()
{
	with (document.cf)
	{
		c.value = rotunjire((f.value-32)/1.8);
	}
}