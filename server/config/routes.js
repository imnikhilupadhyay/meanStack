var auth = require('./auth');
var mongoose = require('mongoose');
var users = require('../controllers/users');
var courses = require('../controllers/courses');
var User = mongoose.model('User');

module.exports = function(app){

 // app.get('/partials/:partialPath',(req,res)=> {
  //   res.render('partials/'+ req.params.partialPath)
  // });


  app.get('/api/users', auth.requireRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users',users.updateUser);
  app.get('/api/courses', courses.getCourses);
  app.get('/api/courses/:id', courses.getCoursesById);
  app.get('/partials/*',(req,res)=> {
   res.render('../../public/app/'+ req.params[0]);
  });
  app.post('/login',auth.authenticate);
  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });
  
  app.all('/api/*', (req,res)=> {
    res.send(404);
  });

  app.get('*', function(req, res) {
  res.render('index',{
    bootStrappedUser:req.user
  });
 });
};