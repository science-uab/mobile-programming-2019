var audio;
document.getElementById("id_speak").addEventListener("click", on_speak);
var speak = new webkitSpeechRecognition();
speak.onresult = on_result;
speak.onspeechend = on_speech_end;
speak.lang = "en-US";

function on_speak()
{
	speak.start();
}

function on_speech_end()
{
	speak.stop();
}

function on_result(e)
{
	let tokens = e.results[0][0].transcript.split(" ")
	alert(tokens)
	let command = tokens.find(val=>val == "next" || val == "previous" || val == "start" || val == "stop" || val == "pause" )
	switch(command) {

		case "next" : 
		next();
		break;
		case "previous" : 
		prev();
		break;
		case "start" : 
		 $('#play').trigger("click");
		break;
		case "stop" : 
		stop();
		break;
		case "pause" : 
		pause();
		break;
	}	
}

//Hide Pause Initially
$('#pause').hide();
	
//Initializer - Play First Song
initAudio($('#playlist li:first-child'));
	
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');

	//Create a New Audio Object
	audio = new Audio('media/' + song);
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}

	$('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);
	
	//Insert Cover Image
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('#playlist li').removeClass('active');
    element.addClass('active');
}


//Play Button
$('#play').click(function(){
	play();
});

function play(){

	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
}

//Pause Button
$('#pause').click(function(){
	pause();
});

function pause(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
}
	
//Stop Button
$('#stop').click(function(){
	stop();
});

function stop(){
	audio.pause();		
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
}

//Next Button
$('#next').click(function(){
    next();
});

function next(){

	audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
	showDuration();
}

function prev(){

	audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
	showDuration();
}

//Prev Button
$('#prev').click(function(){
	prev();
});

//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});


//Volume Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value / 10);
});
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + '.' + s);	
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}