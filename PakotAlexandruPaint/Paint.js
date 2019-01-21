var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var painting = document.getElementById('myCanvas');
    var paint_style = getComputedStyle(painting);
    canvas.width = parseInt(paint_style.getPropertyValue('width'));
    canvas.height = parseInt(paint_style.getPropertyValue('height'));


    var mouse = {x: 0, y: 0};

ctx.color='red';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
//}
function newCanvas(){
  canvas.width = parseInt(paint_style.getPropertyValue('width'));
   canvas.height = parseInt(paint_style.getPropertyValue('height'));
   ctx.color='red';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
}

 function change(color) {
     ctx.strokeStyle = color;
 }

 function changeThickness(width) {
     ctx.lineWidth = width;
 }



window.addEventListener("resize",function(){

  tmpCanvas.width = canvas.height;
  tmpCanvas.height = canvas.width;
  tmpCtx = tempCanvas.getContext('2d');
 

  tempCanvas.drawImage(canvas, 0, 0);
  

  canvas.width = parseInt(paint_style.getPropertyValue('width'));
   canvas.height = parseInt(paint_style.getPropertyValue('height'));

  ctx = canvas.getContext('2d');
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.height, canvas.width);


},false);
window.addEventListener("orientationchange", function() {

  tmpCanvas.width = canvas.height;
  tmpCanvas.height = canvas.width;
  tmpCtx = tempCanvas.getContext('2d');
 

  tempCanvas.drawImage(canvas, 0, 0);
  

   canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext('2d');
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.height, canvas.width);

}, false);

    canvas.addEventListener('touchstart', function(e) {
        ctx.beginPath();
       x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.moveTo(x,y);

    }, false);

    canvas.addEventListener('touchmove', function(e){
x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
		ctx.lineTo(x,y);
		ctx.stroke();


    }, false);

    canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);


    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);


	canvas.addEventListener('mousemove', function(e) {
      mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });


    function handleImage(e){
        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){

                ctx.drawImage(img,0,0,canvas.width,canvas.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }