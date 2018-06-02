var express = require('express');
var path = require('path');
var jade = require('jade');
var bodyParser=require('body-parser');
var logger = require('morgan');
var stylus=require('stylus');
var mongoose = require('mongoose');

var app = express();

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function compile(str, path) {
 return stylus(str).set('filename',path);
}

app.use(bodyParser.urlencoded({extended : true})); // to allow nested object extented is set true

app.use(bodyParser.json());// to catch incoming data

//app.engine('html', require('ejs').renderFile);
app.set('views',__dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));


app.use(express.static(path.join(__dirname+'/public')));

app.use(stylus.middleware(
  {
   src: __dirname + '/public', // .styl files are located in public
   compile : compile
  }
 ))
 
 if(env === 'development'){
 mongoose.connect('mongodb://localhost/multivision');
 }else{
   mongoose.connect('mongodb://nikhilDev:multivision1@ds127589.mlab.com:27589/multivision');
 }

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error...'));
 db.once('open', function callback() {
     console.log('multivision db opened');
 });
 
//  var messageSchema = mongoose.Schema
//   ({
//     message: String
//   });

//  var Message = mongoose.model('Message', messageSchema);
//  var mongoMessage= new Message
//   ({
//     message: 'Hello mongoDB here'
//   });


  app.get('/partials/:partialPath',(req,res)=> {
    res.render('partials/'+ req.params.partialPath)
  });
  
//  mongoMessage.save(function(err, doc) {
//   Message.findOne().exec(function(err, messageDoc) {
//       mongoMessage = messageDoc.message;
//   });
// });
 
 app.get('*', function(req, res) {
     res.render('index');
 });

app.set('port',process.env.PORT || 3000); // handling non static port variable

app.listen(app.get('port'), ()=> //listen is callback function
  console.log(`your server is running on port ${app.get('port')}`)
);