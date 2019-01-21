document.getElementById("id_logic_version").innerHTML = "Logic version: 2019.01.20.10";
var canvas = document.getElementById("id_canvas");
canvas.addEventListener("touchstart", on_touch_start);
canvas.addEventListener("touchmove", on_touch_move);
canvas.addEventListener("touchend", on_touch_end);

var canvas_bounding_rect = canvas.getBoundingClientRect();


var last_pos_array = [];
var currentSize;

//------------------------------------

var chooseRed = document.getElementById("chooseRed");
var chooseGreen = document.getElementById("chooseGreen");
var chooseBlue = document.getElementById("chooseBlue");
var chooseEraser = document.getElementById("toolEraser");
var choosePicker = document.getElementById("readyColor");
var chooseBucket = document.getElementById("bucket");


chooseRed.onclick = red;
chooseGreen.onclick = green;
chooseBlue.onclick = blue;
chooseEraser.onclick = eraser;
choosePicker.onclick = picker;
chooseBucket.onclick = bucketTool;


var finalColor;

function picker()
{
    var pickerColor = document.getElementById("colorPicker").value;
    finalColor = pickerColor;
    return finalColor;
}

function eraser()
{
    var eraserTool = "#ffffff";
    finalColor = eraserTool;
    return finalColor;
}

function green()
{
    var greenColor = "#32CD32";
    finalColor = greenColor;
    return finalColor;
}

function red()
{
    var redColor = "#FF0000";
    finalColor = redColor;
    return finalColor;
}

function blue()
{
    var blueColor = "#0000ff";
    finalColor = blueColor;
    return finalColor;
}


var canvasReset = document.getElementById("canvasReset");

canvasReset.onclick = clearCanvas;


function clearCanvas()
{
    canvas = document.getElementById("id_canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function bucketTool()
{
    var c = document.getElementById("id_canvas");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, 400, 400);
    ctx.fillStyle = finalColor;
    ctx.fill();
}


function sizeChange()
{
    currentSize = document.getElementById("myRange").value;
}









//------------------------------------
function on_touch_start(e)
{
	for (var i = 0; i < e.changedTouches.length; i++){
		var context = canvas.getContext("2d");
		context.beginPath();
		var last_pos = {x: e.changedTouches[i].pageX, 
						y: e.changedTouches[i].pageY, 
						id: e.changedTouches[i].identifier,
						color: finalColor};
		last_pos_array.push(last_pos);

		context.fillStyle = last_pos_array[last_pos_array.length - 1].color;
		context.strokeStyle = last_pos_array[last_pos_array.length - 1].color;
		
		context.arc(e.changedTouches[i].pageX - canvas_bounding_rect.left,
					e.changedTouches[i].pageY - canvas_bounding_rect.top,
					10,
					0, 2 * Math.PI);
		context.fill();
		context.stroke();

	}
}
//------------------------------------
function on_touch_move(e)
{
	e.preventDefault();
	
	for (var i = 0; i < e.changedTouches.length; i++){
		var j = 0;
		for (; j < last_pos_array.length; j++)
			if (last_pos_array[j].id == e.changedTouches[i].identifier)
				break;
		
		var context = canvas.getContext("2d");
		context.beginPath();
		context.lineWidth = currentSize;
		context.fillStyle = last_pos_array[j].color;
		context.strokeStyle = last_pos_array[j].color;
		context.moveTo(last_pos_array[j].x - canvas_bounding_rect.left, last_pos_array[j].y - canvas_bounding_rect.top);
		context.lineTo(e.changedTouches[i].pageX - canvas_bounding_rect.left,
					e.changedTouches[i].pageY - canvas_bounding_rect.top);
		context.stroke();
		
		context.beginPath();
		context.lineWidth = 1;		
		context.fillStyle = last_pos_array[j].color;
		context.strokeStyle = last_pos_array[j].color;

		context.arc(e.changedTouches[i].pageX - canvas_bounding_rect.left,
					e.changedTouches[i].pageY - canvas_bounding_rect.top,
					10,
					0, 2 * Math.PI);
		context.fill();
		context.stroke();
		
		last_pos_array[j].x = e.changedTouches[i].pageX;
		last_pos_array[j].y = e.changedTouches[i].pageY;		
	}
	
}
//--------------------------------------
function on_touch_end(e)
{
	for (var i = 0; i < e.changedTouches.length; i++){
		var j = 0;
		for (; j < last_pos_array.length; j++)
			if (last_pos_array[j].id == e.changedTouches[i].identifier)
				break;
			
		last_pos_array.splice(j, 1);
	}
	
}
//--------------------------------------





///////////////////////////////////////
