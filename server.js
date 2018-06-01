var express = require('express');
var path = require('path');
var bodyParser=require('body-parser');
var logger = require('morgan');
var stylus=require('stylus');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

function compile(str, path) {
 return stylus(str).set('filename',path);
}
app.use(bodyParser.urlencoded({extended : true})); // to allow nested object extented is set true

app.use(bodyParser.json());// to catch incoming data

app.engine('html', require('ejs').renderFile);
app.set('views',__dirname + '/server/views');
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(stylus.middleware(
 {
  src: __dirname + '/public', // .styl files are located in public
  compile : compile
 }
))


app.use(express.static(path.join(__dirname+'/public')));

app.get('*', (req,res)=> {
 res.render('index');
});

app.set('port',process.env.PORT || 3000); // handling non static port variable

app.listen(app.get('port'), ()=> //listen is callback function
  console.log(`your server is running on port ${app.get('port')}`)
);