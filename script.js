var map;
var marker;


function movemap(x,y) {
    
    if (marker) {
        marker.setMap(null);
      }
      var latlng = new google.maps.LatLng(parseFloat(x),parseFloat(y));
      map.panTo(latlng);
      marker = new google.maps.Marker({
        position: latlng,
        map: map
      });    
  } 
  
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 32.987716, lng: -96.751056 },
    mapTypeControl: true,
    mapTypeControlOptions: {
	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    zoomControl: true,
    zoomControlOptions: {
    	position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoom: 15
  });

  addmarker(32.988638, -96.747855, "School of EPPS");
  addmarker(32.986942, -96.747626, "McDermott Library");

  map.data.loadGeoJson('sample.geojson');
  map.data.setStyle(function(feature) {
      var geometryType = feature.getGeometry().getType();
      switch(geometryType) {
        case 'Point':
          return {
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: 'blue',
              fillOpacity: 0.9,
              strokeColor: 'white',
              strokeWeight: 2
            }
          };
        case 'LineString':
          return {
            strokeColor: 'orange',
            strokeWeight: 3
          };
          case 'Polygon':
            return {
              fillColor: 'green',
              strokeColor: 'green',
              strokeWeight: 2,
              fillOpacity: 0.3
            };
    }
   });
  
    var infowindow = new google.maps.InfoWindow();
      map.data.addListener('click', function(event) {
        var content = event.feature.getProperty('name');
        infowindow.setContent(content);
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
      });
  

  var RouteCoordinates = [
    new google.maps.LatLng(32.988638, -96.747855),
    new google.maps.LatLng(32.988346, -96.747890),
    new google.maps.LatLng(32.988222, -96.747852),
    new google.maps.LatLng(32.988224, -96.747664),
    new google.maps.LatLng(32.988136, -96.747667),
    new google.maps.LatLng(32.988111, -96.747750),
    new google.maps.LatLng(32.987495, -96.747769),
    new google.maps.LatLng(32.987486, -96.747630),
    new google.maps.LatLng(32.986942, -96.747626)	  
  ];
  var RouthPath = new google.maps.Polyline({
    path: RouteCoordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  RouthPath.setMap(map);

}

function addmarker(x,y, title) {
  var latlng2 = new google.maps.LatLng(parseFloat(x),parseFloat(y));
  var marker2 = new google.maps.Marker ({
    position: latlng2,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({ 
    content: title,
    size: new google.maps.Size(50,50)
  });		
  google.maps.event.addListener(marker2, 'click', function() {
    infowindow.open(map,marker2);
  });

}