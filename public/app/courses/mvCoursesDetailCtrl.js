angular.module('app').controller('mvCoursesDetailCtrl', function($scope, mvCourse, $routeParams,$interval) {

 $scope.timeLeft="";
 let now="";
 let endDate="";
 let month="";
 let days="";
 let hours="";
 let promise="";
 let secTime="";
 var closed="";
 $scope.course = mvCourse.get({_id:$routeParams.id}, (data)=> {
    endDate=new Date(data.endDate);
 });


 promise = $interval(function(){
  let oneDay = 1000*60*60*24;
  let oneHour = 1000*60*60;
  let oneMinute = 1000*60;
  let oneSecond = 1000;

  now = new Date();
  months = Math.round(((endDate.getMonth()+1) - (now.getMonth()+1))) > 0 ? Math.round(((endDate.getMonth()+1) - (now.getMonth()+1)))  : 0;
  days = Math.round((endDate.getTime() - now.getTime() )/oneDay) > 0 ? Math.round((endDate.getTime() - now.getTime() )/oneDay) : 0;
  hours = Math.floor((endDate.getTime() - now.getTime() )/oneHour) >0 ? Math.ceil((endDate.getTime() - now.getTime() )/oneHour) : 0;
  minutes = Math.floor((endDate.getTime() - now.getTime() )/oneMinute) > 0 ? Math.ceil((endDate.getTime() - now.getTime() )/oneMinute) : 0;
  seconds = Math.floor((endDate.getTime() - now.getTime())/oneSecond) > 0 ? Math.floor((endDate.getTime() - now.getTime())/oneSecond) : 0;
  secTime = seconds % 60;
  if(months > 0){
     $scope.timeLeft = months+" Months";
    } else if(months == 0 && days > 0){
       $scope.timeLeft = days+" Days";
    } else if(months == 0 && days == 0 && hours > 0) {
       $scope.timeLeft = hours+" Hours ";
    } else if(months == 0 && days == 0 && hours == 0 && minutes > 0) {
     $scope.timeLeft = minutes+" Minutes "+secTime+" s";
     secTime--;
     secTime = secTime == 0 ? secTime = 60 : secTime;
  } else if (months == 0 && days == 0 && hours == 0 && minutes == 0 && seconds >0) {
     $scope.timeLeft = "00 Minute "+seconds+" s"
  } else if (months == 0 && days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
     $scope.timeLeft = "Closed";
     $interval.cancel(promise);
     //close();
  }
 },1000);
 
 // var close = function(){
 //  var closed = $scope.timeLeft;
 //   mvCourseCrud.eventClosed(closed).then(function(){
 //   mvNotifier.alert("Time Closed !!");
 // },
 //  function(reason){
 //    mvNotifier.error(reason);
 // });
 // }

 $scope.$on('$destroy',function(){
   $interval.cancel(promise);
 })



});