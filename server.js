//**************EXPRESS SETUP**************
const EXPRESS = require('express');
const APP = EXPRESS();
const HTTP = require('http');
const path = require('path');
//**************EXPRESS SETUP**************


//*********BODY PARSER + EXPRESS***********
const bodyParser = require('body-parser');
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());
//*********BODY PARSER + EXPRESS***********


const Routes = require('./server/routes.js')(APP);

APP.use(EXPRESS.static(path.join(__dirname, './client')));


APP.listen(8888, function(){
  console.log('listening on 8888');
});
