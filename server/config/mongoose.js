var mongoose= require('mongoose');
var crypto = require('crypto');
var userModel = require('../models/user');
var courseModel = require('../models/Course');

module.exports= function(config){
 
 mongoose.connect(config.db);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error...'));
 db.once('open', function callback() {
     console.log('multivision db opened');
 });

 userModel.createDefaultUsers();
 courseModel.createDefaultCourses();
}