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


//**************SEQUELIZE SETUP**************
const Sequelize = require('sequelize');
let sequelize = new Sequelize('postgresql://localhost/foodtruck', {});
sequelize.authenticate().then(function(err) {
  console.log('Connection has been established successfully.');
})
.catch(function (err) {
  console.log('Unable to connect to the database:', err);
});
const Client = require('pg').Client;
let client = new Client({
  user: 'eric',
  database: 'foodtruck',
  host: '/tmp'
});
//**************SEQUELIZE SETUP**************

const Routes = require('./server/routes.js')(APP);

APP.use(EXPRESS.static(path.join(__dirname, './client')));


APP.listen(8888, function(){
  console.log('listening on 8888');
});
