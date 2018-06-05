var Course = require('mongoose').model('Course');

exports.getCourses = function(req,res) {
  
 Course.find({}).exec((err,collection)=> {
  res.send(collection);
 })
};