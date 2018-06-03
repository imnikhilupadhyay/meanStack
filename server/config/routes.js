var auth = require('./auth');

module.exports = function(app){

 // app.get('/partials/:partialPath',(req,res)=> {
  //   res.render('partials/'+ req.params.partialPath)
  // });

  app.get('/partials/*',(req,res)=> {
   res.render('../../public/app/'+ req.params[0]);
 });

  app.post('/login',auth.authenticate);

  app.post('/logout', function(req,res){
    req.logout();
    res.end();
  });
  
 app.get('*', function(req, res) {
  res.render('index');
 });
};