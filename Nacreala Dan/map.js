x = navigator.geolocation;

  		x.getCurrentPosition(success, failure);
		
		if(navigator.geolocation)
		{
			options = {
            enableHighAccuracy: false,
            timeout: Infinity,
            maximumAge: 0
};
			
		}	
function onPositionRecived(position){
			console.log(position);
		}

		function locationNotRecived(positionError){
			console.log(positionError);
		}
function success(position)

  		{
  			var myLat = position.coords.latitude;
  			var myLong = position.coords.longitude;


  			var coords = new google.maps.LatLng(myLat,myLong);

  			var mapOptions = {

  				zoom:15,
  				center: coords,
  				mapTypeId: 'hybrid'
  			}

  			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  			var marker = new google.maps.Marker({map:map, position:coords});	
			
		var watch = x.watchPosition(onPositionRecived,locationNotRecived);
		console.log(watch);
  		}

  		function failure(){ }