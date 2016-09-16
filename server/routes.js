const UserController = require('./controllers/users.js');
var path = require('path');

module.exports = function(app){

  app.post('/login', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    UserController.login(req, res);
  });


  app.post('/register', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    UserController.register(req, res);
  });
};
