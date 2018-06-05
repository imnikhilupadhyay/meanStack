var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
 firstName : {type: String, required:'{PATH} is required!!' },
 lastName : {type: String, required:'{PATH} is required!!' },
 username : { 
               type:String,
               required:'{PATH} is required!!',
               unique: true
            },
 salt : {type: String, required:'{PATH} is required!!' },
 hashed_pwd: {type: String, required:'{PATH} is required!!' },
 roles: {type: String, required:'{PATH} is required!!' }
});


userSchema.methods= {
  authenticate: function(passwordToMatch){
    return  encrypt.hasedPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
}
var User = mongoose.model('User',userSchema);

function createDefaultUsers() {
 User.find({}).exec((err,collection)=> {
  if(collection.length === 0){
   var salt,hash;

    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'nikhilU');
    User.create({firstName:'Nikhil', lastName:'Upadhyay', username:'nikhil@admin.com', salt: salt, hashed_pwd:hash ,roles:'admin'});
    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'nishantU');
    User.create({firstName:'Nishant', lastName:'Upadhyay', username:'nishantU', salt: salt, hashed_pwd:hash ,roles:'participant'});
    salt= encrypt.createSalt();
    hash= encrypt.hasedPwd(salt, 'Sram');
    User.create({firstName:'Ram', lastName:'Singh', username:'Sram',salt: salt, hashed_pwd:hash, roles:'volunteer'});
  }
 });
}

exports.createDefaultUsers = createDefaultUsers;