var today;
var dd;
var mm;
var yyyy;
var date;
function getdate(){
  today = new Date();
  dd = today.getDate();
  mm = today.getMonth() + 1;
  yyyy = today.getFullYear();
  date = dd + '/' + mm + '/' + yyyy;
  postMessage(date);
  setTimeout("getdate()",1000);
}
getdate();
