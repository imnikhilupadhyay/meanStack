var mongoose= require('mongoose');
var crypto = require('crypto');
var encrypt = require('../utilities/encryption');

module.exports= function(config){
 
 mongoose.connect(config.db);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error...'));
 db.once('open', function callback() {
     console.log('multivision db opened');
 });

 var userSchema = mongoose.Schema({
  firstName : String,
  lastName : String,
  username : String,
  salt : String,
  hashed_pwd: String,
  roles: [String]
 });


 userSchema.methods= {
   authenticate: function(passwordToMatch){
     return  encrypt.hasedPwd(this.salt, passwordToMatch) === this.hashed_pwd;
   }
 }
 var User = mongoose.model('User',userSchema);
 
 User.find({}).exec((err,collection)=> {
  if(collection.length === 0){
   var salt,hash;

    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'nikhilU');
    User.create({firstName:'Nikhil', lastName:'Upadhyay', username:'nikhilU', salt: salt, hashed_pwd:hash ,roles:['admin']});
    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'nishantU');
    User.create({firstName:'Nishant', lastName:'Upadhyay', username:'nishantU', salt: salt, hashed_pwd:hash ,roles:[]});
    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'Sram');
    User.create({firstName:'Ram', lastName:'Singh', username:'Sram',salt: salt, hashed_pwd:hash});
  }
 });

 }