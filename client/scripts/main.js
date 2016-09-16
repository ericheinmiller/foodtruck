// All variables and methods go unto foodTruck
var foodTruck = {};
foodTruck.user = {};
foodTruck.user.logged = false;
foodTruck.user.address = '';
foodTruck.trucks = [];
foodTruck.search = {};
foodTruck.search.address = '';
foodTruck.search.miles = 20;
// All variable and methods go unto foodTruck


//Google Places API example provided by Google
var map;
var infowindow;

function initMap() {
  var address = {lat: -33.867, lng: 151.195};

  map = new google.maps.Map(document.getElementById('map'), {
    center: address,
    zoom: 15
  });

  var request = {
    location: address,
    radius: 500,
    query: 'starbucks'
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  infowindow = new google.maps.InfoWindow();
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    console.log(foodTruck.trucks);
    $(".sideBar").html(foodTruck.trucks.join(""));
  }
}

function createMarker(place) {
  foodTruck.trucks.push('<div class="truck">' + place.name + '</div>');
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
//Google Places API example
