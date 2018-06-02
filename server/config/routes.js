var passport=require('passport');

module.exports = function(app){

 // app.get('/partials/:partialPath',(req,res)=> {
  //   res.render('partials/'+ req.params.partialPath)
  // });

  app.get('/partials/*',(req,res)=> {
   res.render('../../public/app/'+ req.params[0]);
 });

 app.post('/login',(req,res,next)=> {
   var auth = passport.authenticate('local', (err,user)=> {
    if(err){
     return next(err);
    }
    if(!user){
     res.send({success:false});
    }
    req.logIn(user, (err)=> {
     if(err){
      return next(err);
     }
     res.send({success:true, user:user});
    })
   })
   auth(req,res,next);
 });

 app.get('*', function(req, res) {
  res.render('index');
 });
};