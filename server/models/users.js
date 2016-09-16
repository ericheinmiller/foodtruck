const Sequelize = require('sequelize');
let sequelize = new Sequelize('postgresql://localhost/foodtruck', {});

let User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
});

User.sync({ force: false }).then(function() {
  return User.create({
    email: 'fake@gmail.com',
    password: '111',
    address: '175 Hampshire Ave, Daly City'
  });
});

User.register = function(req, res){
  return User.create({
    email: req.body.payload.email,
    password: req.body.payload.password 
  }).then(function(){
    return User.findAll().then(function(users){
      res.json(users);
    });
  });
};

User.login = function(req, res){
  return User.findOne({ where: { email: req.body.email } }).then(function(user){
    console.log('found user');
    if(user.password === req.body.password){
      console.log('passwords matched');
      res.json(true);
    }
    else{
      console.log('passwords do not match');
      res.json(false);
    }
  }).catch(function(error){
    console.log(error);
  });
};

module.exports = User;
