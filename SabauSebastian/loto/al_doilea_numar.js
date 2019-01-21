var i = 0;

function Random()
{
	i = Math.floor((Math.random() * 49) + 1);
	postMessage(i);
}

Random();