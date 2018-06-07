var Course = require('mongoose').model('Course');

exports.getCourses = function(req,res) {
  
 Course.find({}).exec((err,collection)=> {
  res.send(collection);
 })
};

exports.getCoursesById = function(req,res){
 Course.findOne({_id:req.params.id}).exec((err,course)=> {
  res.send(course);
 })
};