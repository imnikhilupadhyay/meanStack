var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(req,res) {
  
 User.find({}).exec((err,collection)=> {
  res.send(collection);
 })
};


exports.createUser = function(req,res,next) {
 var userData = req.body;
 userData.salt = encrypt.createSalt();
 userData.hashed_pwd = encrypt.hasedPwd(userData.salt,userData.password);
 User.create(userData, function(err, user) {
  if(err) {
   if (err.toString().indexOf('E11000') > -1) {
    err = new Error('Duplicate User Name !!');
   }
   res.status(400);
   return res.send({
    reason: err.toString()
   });
  }
  req.logIn(user, (err)=> {
   if(err) {
    return next(err);
   }
   res.send(user);
  })
 })
};