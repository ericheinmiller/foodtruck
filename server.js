//**************EXPRESS SETUP**************
var EXPRESS = require('express');
var APP = EXPRESS();
var HTTP = require('http');
var path = require('path');
//**************EXPRESS SETUP**************


//*********BODY PARSER + EXPRESS***********
var bodyParser = require('body-parser');
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
//*********BODY PARSER + EXPRESS***********


var Routes = require('./server/routes.js')(APP);

APP.use(EXPRESS.static(path.join(__dirname, './client')));


APP.listen(8888, function(){
  console.log('listening on 8888');
});
