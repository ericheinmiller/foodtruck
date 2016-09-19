var https = require('https');
var nodeSocrata = require('node-socrata');
var config = {
  hostDomain:'https://data.sfgov.org',
  resource: 'bbb8-hzi6.json',
  XAppToken: 'Oj0XiBhnGGPV5tE6KGWZH9hUI'
};

module.exports = {
  address: function(req, res){
    //message is variable that will hold and build the response from the geocode get request
    //response is what will be sent back to the client
    var message = '';
    var truckHash = {};
    var dataOut = {
      address: {},
      data: []
    };

    //get request to get lat and long of home address
    https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.address + '&key=AIzaSyBxGA3L3F3l7bWLB3z1zKo7X-J19alAn4A', function(response){
      response.on('data', function(d){
        message += d;

      }).on('error', function(e){
        console.log(e);
      });

      //once response is done, change the message into JSON, and set maximum and minimum lat and long
      response.on('end', function(){
        message = JSON.parse(message);
        var maxLat = message.results[0].geometry.location.lat + 0.05;
        var minLat = message.results[0].geometry.location.lat - 0.05;
        var maxLng = message.results[0].geometry.location.lng + 0.05;
        var minLng = message.results[0].geometry.location.lng - 0.05;

        //limit of 30 results and the query to find all food trucks within a certain range
        var params = {
          $limit: 1000,
          $where: 'latitude < ' + maxLat + ' and latitude > ' + minLat + ' and longitude < ' + maxLng + ' and longitude > ' + minLng
        };

        //using the nodeSocrata library, send a get requiest to get all the food trucks
        var soda = new nodeSocrata(config);
        soda.get(params,function(err, sodaResponse, data){
          dataOut.address = {
            applicant : message.results[0].geometry.location,
            lat: '' + message.results[0].geometry.location.lat,
            lng: '' + message.results[0].geometry.location.lng 
          };

          //put all trucks in a hashtable with name is Key
          for(var i = 0; i < data.length; i++){
            var selectedTruck = data[i];

            //if they slected truck doesn't exist, create it
            if(!truckHash[selectedTruck.applicant]){
              truckHash[selectedTruck.applicant] = {
                applicant: selectedTruck.applicant,
                lat: '' + selectedTruck.latitude,
                lng: '' + selectedTruck.longitude,
                starttime: selectedTruck.starttime,
                endtime: selectedTruck.endtime,
                location: selectedTruck.location,
                info: selectedTruck.optionaltext
              };
            }
          }
          //finally, push trucks into the data array
          for(var x in truckHash){
            dataOut.data.push(truckHash[x]);
          }
          res.json(dataOut);
        });
      });
    });
  }
};
