document.addEventListener('DOMContentLoaded', function() {     /* nicio functionalitate java nu va merge pana nu se incarca pagina */
	
	/* incarcare imagine in aplicatie */
	var loadImage = document.getElementById('load');
	function loadInput(e) {
		var imageFile = e.target.files[0];    /* ia primul fisier */
		var imageElement = document.getElementById('image');
		imageElement.setAttribute('src', URL.createObjectURL(imageFile));   /*setam fisierul ales */
		Caman("#image",function(){
			this.revert(true);
		});
	};
	loadImage.onchange = loadInput;
	
	/* aplicare efecte slider  */
	function changeSlider(e) {
		Caman("#image",function renderCaman() {    /*canvas al imaginii */
			this.revert(false); /*comentat daca vrem mai multe slide-uri in acelasi timp */ 
			this[e.target.name](e.target.value).render(function(){
				if(textInput.value){
					applyText;
				};
			});  
			/*aplica efectul bazat pe ce alegem de pe slider. e.target.name ia numele slider-ului pe care actionam. e.target.value ia valoarea (ex: schimbam brightness) .render aplica efectul . in html la input avem si name si value */
		});
	};
	
	/*cream o variabila lista care stocheaza toate slider-ele, toate avand type=range */
	var ranges = document.querySelectorAll('input[type="range"]');
	/* bucla aplica efectele din slider cand acesta este mutat */
	ranges.forEach(function(range){
		range.onchange = changeSlider;
	});
	
	/* buton reset */
	var resetButton = document.getElementById("reset");
	function reset(e) {
		/* reseteaza efectele la 0 */
		ranges.forEach(function(range){
			range.value = 0;
		});
		/* resetam canvasul la forma initiala */
		Caman("#image", function(){
			this.revert(true);
	});
		
	};
	resetButton.onclick = reset;
	
	/* butoane filtre */
	function filterButtonHandler(e) {
		Caman('#image', function(){
			/* curatam filtre puse inainte */
			this.revert(false); /*comentam daca vrem filtre suprapuse */
			this[e.target.id]().render(
			function(){
				if(textInput.value){
					applyText;
				};
			});
		});
	};
	
	var filterButtons = document.querySelectorAll('.filter');
	filterButtons.forEach(function(filterButton){
		filterButton.onclick = filterButtonHandler;
	});
	
	/*buton save */
	var saveButton = document.getElementById('save');
	function save(e){
		Caman('#image', function(){
			this.render(function(){
					applyText();
					this.save('image.png');
				});
		});
	};
	
	saveButton.onclick = save;
	
	
	/* aplicare text*/
	var textInput = document.getElementById("message");
	function applyText() {
		var canvas = document.getElementById('image');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgba(0,0,0,0.5)";  /*transparenta */
		var boxTop = (canvas.height/2)-30;
		ctx.fillRect(0,boxTop, canvas.width, 65);
		ctx.font = "50px Raleway";
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText(textInput.value, canvas.width/2, boxTop+50);
		
	};
	var submitText = document.getElementById('submit');
	submitText.onclick = applyText;
	
	
}, false);