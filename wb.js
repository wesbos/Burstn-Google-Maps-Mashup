// check that the document is ready
$(function() {
	// setup a few vars
	var marker, i; 
	
	// setup our map
	 var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3, 
      center: new google.maps.LatLng(43, 20),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    // setup the info window (the popup bubble that display the info 
    var infowindow = new google.maps.InfoWindow();
    

	$.getJSON('http://api.burstn.com/1/timeline/global?limit=400&callback=?', function(data) {
		console.log(data);
		$.each(data['body']['data'], function(i,v) {
			// setup some variables
			var coords = data['body']['data'][i]['coordinates'],
				imgsrc = data['body']['data'][i]['image'],
				caption = data['body']['data'][i]['caption'];
				
				 // setup the image markers
				var image = new google.maps.MarkerImage(imgsrc['square'],
					new google.maps.Size(20, 32),
					new google.maps.Point(0, 32)
				);
						
				// check if this image has a lat set, if not, we skip it.
				if (coords.latitude) { 

					marker = new google.maps.Marker({
						position: new google.maps.LatLng(coords.latitude, coords.longitude),
						icon : image,
						map: map 
					});
						
					google.maps.event.addListener(marker, 'click', (function(marker, i) {
						return function() {
							infowindow.setContent('<div class="picture"> <span class="title">'+caption+'</span><img src="'+imgsrc['medium']+'" alt="" /></div>');
							infowindow.open(map, marker);
						}	
					})(marker, i));
				
				} // end if

			});
		
	});

	
});

