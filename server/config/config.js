var path= require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports={

 development:{
  rootPath: rootPath,
  db:'mongodb://localhost/multivision',
  port:process.env.PORT || 3000
 },
 production:{
  rootPath: rootPath,
  db:'mongodb://nikhilDev:multivision1@ds127589.mlab.com:27589/multivision',
  port:process.env.PORT || 80
 }
};