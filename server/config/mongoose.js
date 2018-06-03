var mongoose= require('mongoose');
var crypto = require('crypto');

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
  hashed_pwd: String
 });


 userSchema.methods= {
   authenticate: function(passwordToMatch){
     return  hasedPwd(this.salt, passwordToMatch) === this.hashed_pwd;
   }
 }
 var User = mongoose.model('User',userSchema);
 
 User.find({}).exec((err,collection)=> {
  if(collection.length === 0){
   var salt,hash;

    salt= createSalt();
    hash=hasedPwd(salt, 'nikhilU');
    User.create({firstName:'Nikhil', lastName:'Upadhyay', username:'nikhilU', salt: salt, hashed_pwd:hash});
    salt= createSalt();
    hash=hasedPwd(salt, 'nishantU');
    User.create({firstName:'Nishant', lastName:'Upadhyay', username:'nishantU', salt: salt, hashed_pwd:hash});
    salt= createSalt();
    hash=hasedPwd(salt, 'Sram');
    User.create({firstName:'Ram', lastName:'Singh', username:'Sram',salt: salt, hashed_pwd:hash});
  }
 });

 }

 function createSalt() {
  return crypto.randomBytes(128).toString('base64');
 }

 function hasedPwd(salt, pwd) {
  var hmac =crypto.createHmac('sha1',salt);
  hmac.setEncoding('hex');
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
 }