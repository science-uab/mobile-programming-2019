var data_locala = new Date();
var zi = new Array(7);
  
  zi[1] = "Luni";
  zi[2] = "Marti";
  zi[3] = "Miercuri";
  zi[4] = "Joi";
  zi[5] = "Vineri";
  zi[6] = "Sambata";
  zi[0] = "Duminica";

var data_c = zi[data_locala.getDay()];
document.getElementById("id_data_curenta").innerHTML = data_c;

function startOra() 
{
  var ora_curenta = new Date();
  var h = ora_curenta.getHours();
  var m = ora_curenta.getMinutes();
  var s = ora_curenta.getSeconds();
  m = verificareZero(m);
  s = verificareZero(s);
  document.getElementById("id_ora_curenta").innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startOra, 500);
}

function verificareZero(i) 
{
  if (i < 10) {i = "0" + i}; //pun 0 in fata la nr <10 ... 00 01 02 ... 08 09
  return i;
}