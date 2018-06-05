var passport = require('passport');
var mongoose = require('mongoose');
LocalStrategy = require('passport-local').Strategy;
var User= mongoose.model('User');

module.exports = function() {
 
passport.use(new LocalStrategy(
  (username,password,done)=> {
      User.findOne({username:username}).exec((err,user)=> {
        if(user && user.authenticate(password)){
          return done(null,user);
        }else{
          return done(null,false);
        }
      })
  }
));

passport.serializeUser((user,done)=> {
  if(user){
    return done(null,user._id);
  }
});

passport.deserializeUser((id,done)=> {
    User.findOne({_id:id}).exec((err,user)=> {
      if(user){
        return done(null,user);
      } else{
        return done(null,false);
      }
    })
});
};