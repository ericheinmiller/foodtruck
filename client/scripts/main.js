$(document).ready(function(){

  //initial variable declaration
  var map,
  infowindow, 
  address, 
  home = false,
  address_search = null,
  trucksArray = [],
  selectedTruck,
  sanFranciscoLatLong = {lat: 37.774, lng: -122.419};

  //When search button is clicked, address is sent to backend via post
  $('.login').click(function(){
    address = $('.searchBar').val();
    $.post("http://localhost:8888/address", {address: address}, function(searchOutput){
      console.log(searchOutput);

      //reset home, and all the arrays
      home = false;
      trucksArray = [];
      address_search = searchOutput.address.applicant;

      //push the list of trucks into the truck array
      for(var i = 0; i < searchOutput.data.length; i++){
        trucksArray.push(searchOutput.data[i]);
      }
      //redraw the map with new information
      initMap();
    });
  });

  //Google Places Map
  function initMap() {

    //set location of home address OR default SF 
    map = new google.maps.Map(document.getElementById('map'), {
      center: address_search || sanFranciscoLatLong,
      zoom: 13 
    });

    var request = {
      location: address_search || sanFranciscoLatLong,
      radius: 500,
      query: 'food truck'
    };

    //the actual search of google maps
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    infowindow = new google.maps.InfoWindow();
  }

  //callback to run after searching google places api
  function callback(results, status) {

    //if home is false, set to true and have the first marker be of home address
    if(home === false){
      var homeAddress = {
        lat: address_search.lat,
        lng: address_search.lng,
        applicant: address
      };
      console.log(homeAddress);
      createMarker(homeAddress);
      home = true;
    }
    //for each truck in the array, send to the create marker function
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var j = 0; j < trucksArray.length; j++) {
            createMarker(trucksArray[j]);
        }
        //at the end of the loops, join all the items in the truckDIVarray and put into the sidebar
      }
    }

    //function to run when a marker is clicked to give more information to user about trucks
    function focusTruck(truck){
        $(".sideBar").html('<div>' +  truck.applicant + 
                           '<p>' + truck.info + '</p>' +
                           '<p>Hours: ' + truck.starttime + ' - ' + truck.endtime + '</p>' +
                           '<div>');
    }

  //Function to create food truck markers
  function createMarker(place) {
    var location = {
      lat: Number(place.lat),
      lng: Number(place.lng)
    };

    var placeLoc = location;
    var marker = new google.maps.Marker({
      map: map,
      position: location
    });

    google.maps.event.addListener(marker, 'click', function() {
      focusTruck(place);
      infowindow.setContent(place.applicant);
      infowindow.open(map, this);
    });
  }

  //Initialize Google Maps
  initMap();
});
