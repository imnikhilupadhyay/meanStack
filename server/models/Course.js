var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  title: {type:String, required:'{PATH} is required!'},
  featured: {type:Boolean, required:'{PATH} is required!'},
  published: {type:Date, required:'{PATH} is required!'},
  endDate: {type:Date, required:'{PATH} is required!'},
  tags: [String],
  status: String
});
var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
  Course.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Course.create({title: 'Being Half Marathon', featured: true, published: new Date('4/5/2018'),endDate: new Date('7/5/2018'), tags: ['C#'] , status:'Booked'});
      Course.create({title: 'C# for Non-Sociopaths', featured: true, published: new Date('10/12/2018'),endDate: new Date('10/5/2018'), tags: ['C#'], status:'Open'});
      Course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2018'),endDate: new Date('10/5/2018'),tags: ['C#'], status:'Booked'});
      Course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2018'),endDate: new Date('10/5/2018'), tags: ['VB'] , status:'Booked'});
      Course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2018'),endDate: new Date('10/5/2018'), tags: ['C++'], status:'Open'});
      Course.create({title: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2018'),endDate: new Date('10/5/2018'), tags: ['JS'], status:'Open'});
      Course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2018'),endDate: new Date('10/5/2018'), tags: ['Coding'], status:'Open'});
      Course.create({title: 'A Survival Guide to Code Reviews', featured: true, published: new Date('2/1/2018'),endDate: new Date('10/5/2018'), tags: ['Coding'], status:'Open'});
      Course.create({title: 'How to Job Hunt Without Alerting your Boss', featured: true, published: new Date('10/7/2018'),endDate: new Date('10/5/2018'), tags: ['Misc'], status:'Open'});
      Course.create({title: 'How to Keep your Soul and go into Management', featured: false, published: new Date('8/1/2018'),endDate: new Date('10/5/2018'), tags: ['Management'], status:'Open'});
      Course.create({title: 'Telling Recruiters to Leave You Alone', featured: false, published: new Date('11/1/2018'),endDate: new Date('10/5/2018'), tags: ['Misc'], status:'Open'});
      Course.create({title: "Writing Code that Doesn't Suck", featured: true, published: new Date('10/13/2018'),endDate: new Date('10/5/2018'), tags: ['Coding'], status:'Open'});
      Course.create({title: 'Code Reviews for Jerks', featured: false, published: new Date('10/1/2018'),endDate: new Date('10/5/2018'), tags: ['Coding'] , status:'Booked'});
      Course.create({title: 'How to Deal with Narcissistic Coworkers', featured: true, published: new Date('2/15/2018'),endDate: new Date('10/5/2018'), tags: ['Misc'], status:'Open'});
      Course.create({title: 'Death March Coding for Fun and Profit', featured: true, published: new Date('7/1/2018'),endDate: new Date('10/5/2018'), tags: ['Coding', 'Misc'], status:'Open'});
    }
  })
}

exports.createDefaultCourses = createDefaultCourses;