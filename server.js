var express = require('express');
var path = require('path');
var jade = require('jade');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

var User= mongoose.model('User');
passport.use(new LocalStrategy(
  (username,password,done)=> {
      User.findOne({username:username}).exec((err,user)=> {
        if(user){
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
})

app.listen(config.port);
  console.log("Listening to "+ config.port +" port!!");

//app.engine('html', require('ejs').renderFile);
//  var messageSchema = mongoose.Schema
//   ({
//     message: String
//   });

//  var Message = mongoose.model('Message', messageSchema);
//  var mongoMessage= new Message
//   ({
//     message: 'Hello mongoDB here'
//   });
//  mongoMessage.save(function(err, doc) {
//   Message.findOne().exec(function(err, messageDoc) {
//       mongoMessage = messageDoc.message;
//   });
// });