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

//***********Routing and middleware********
var Routes = require('./server/routes.js')(APP);
APP.use(EXPRESS.static(path.join(__dirname, './client')));

//*********Beginning server*************
APP.listen(8888, function(){
  console.log('listening on 8888');
});
