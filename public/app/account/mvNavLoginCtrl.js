angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http) {

$scope.signin = function(username,password){
 console.log("I'm Here");
}

$http.post('/login',{username:username, password:password})
 .then(function(response){
   if(response.data.success){
    console.log("Logged In !!");
   } else{
    console.log("Login Error !!");
   }
 });

});