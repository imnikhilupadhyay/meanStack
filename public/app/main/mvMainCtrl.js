app.controller('mvMainCtrl',function($scope){
 


 $scope.courses=[
  {
   name:'C# for sociopaths', 
   featured:true,
   published:new Date('1/1/2018'),
   status: 'Booked'
 },
 {
  name:'C# for non-sociopaths', 
  featured:false,
  published:new Date('1/1/2018'),
  status: 'Booked'  
 },
{
 name:'Java for sociopaths', 
 featured:true,
 published:new Date('1/10/2018'),
 status: 'Open' 
},
{
 name:'Java for non-sociopaths', 
 featured:false,
 published:new Date('4/10/2018'),
 status: 'Booked'
},
{
 name:'AngularJS for sociopaths', 
 featured:true,
 published:new Date('6/8/2018'),
 status: 'Open'
},
{
 name:'AngularJS for non-sociopaths', 
 featured:true,
 published:new Date('2/8/2018'),
 status: 'Open'
},
{
  name:'NodeJS for sociopaths', 
  featured:true,
  published:new Date('4/12/2018'),
  status: 'Open'
 },
 {
  name:'NodeJS for non-sociopaths', 
  featured:false,
  published:new Date('3/3/2018'),
  status: 'Open'
 },
 {
  name:'Mean Stack for sociopaths', 
  featured:false,
  published:new Date('1/7/2018'),
  status: 'Booked'
 },
 {
  name:'Mean Stack for non-sociopaths', 
  featured:true,
  published:new Date('5/14/2018'),
  status: 'Booked'
 }
];

});