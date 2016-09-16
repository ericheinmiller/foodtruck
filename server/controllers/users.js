const User = require('../models/users.js');

let UserController = {};

UserController.findAll = function(req, res){
  User.findAll().then(function(users){
    res.json(users);
  });
};

UserController.register = function(req, res){
  User.register(req, res);
};

UserController.login = function(req, res){
  console.log('in logins');
  console.log('in controllers', req.body);
  User.login(req, res);
};
module.exports = UserController;

