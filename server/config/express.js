var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var stylus = require('stylus');
var passport= require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports= function(app, config) {
function compile(str, path) {
 return stylus(str).set('filename',path);
}


app.set('views',config.rootPath + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true})); // to allow nested object extented is set true

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'multi vision unicorns', resave:false, saveUnintilized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(stylus.middleware(
 {
  src: config.rootPath + '/public', // .styl files are located in public
  compile : compile
 }
));

app.use(express.static(config.rootPath +'/public'));
}