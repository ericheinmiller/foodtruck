var path = require('path');
var controller = require('./controller.js');

module.exports = function(app){

  app.post('/address', function(req, res){
    controller.address(req, res);
  });
};
