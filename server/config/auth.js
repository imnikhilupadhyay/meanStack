var passport = require('passport');


exports.authenticate = function(req, res, next) {
  req.body.username = req.body.username.toLowerCase(); // it will make sure even if user login with uppercase
 var auth = passport.authenticate('local', (err,user)=> {
  if(err){
   return next(err);
  }
  if(!user){
   res.send({success:false});
  }
  req.logIn(user, (err)=> {
   if(err){
    return next(err);
   }
   res.send({success:true, user:user});
  })
 })
 auth(req,res,next);
};

// exports.requiresApiLogin = function(req,res,next) {
//  if(!req.isAuthenticated()){
//   res.status(403);
//   res.end();
//  } else{
//    next();
//  }
// };

exports.requireRole = function(role) {
 return function(req,res,next) {
  if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
   res.status(403);
   res.end();
  } else{
     next();
   }
 }
};