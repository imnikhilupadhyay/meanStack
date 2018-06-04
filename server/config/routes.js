var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function(app){

 // app.get('/partials/:partialPath',(req,res)=> {
  //   res.render('partials/'+ req.params.partialPath)
  // });


  app.get('/api/users', auth.requireRole('admin'), (req,res)=> {
    
    User.find({}).exec((err,collection)=> {
      res.send(collection);
    })
  });

  app.get('/partials/*',(req,res)=> {
   res.render('../../public/app/'+ req.params[0]);
 });

  app.post('/login',auth.authenticate);

  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });
  
 app.get('*', function(req, res) {
  res.render('index',{
    bootStrappedUser:req.user
  });
 });
};