app.controller('mvMainCtrl',function($scope){
 


 $scope.courses=[
  {
   name:'C# for sociopaths', 
   featured:true,
   published:new Date('1/1/2018')
 },
 {
  name:'C# for non-sociopaths', 
  featured:false,
  published:new Date('1/1/2018')  
 },
{
 name:'Java for sociopaths', 
 featured:true,
 published:new Date('1/10/2018') 
},
{
 name:'Java for non-sociopaths', 
 featured:true,
 published:new Date('4/10/2018')
},
{
 name:'AngularJS for sociopaths', 
 featured:true,
 published:new Date('6/8/2018')
},
{
 name:'AngularJS for non-sociopaths', 
 featured:true,
 published:new Date('2/8/2018')
}];

});