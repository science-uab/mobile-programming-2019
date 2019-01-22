var today;
var h;
var m;
var s;
var time;
function gettime(){
  today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  time = h + ':' + m + ':' + s;
  postMessage(time);
  setTimeout("gettime()",1000);
}
gettime();
