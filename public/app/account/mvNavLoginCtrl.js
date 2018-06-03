angular.module('app').controller('mvNavBarLoginCtrl',function($scope,$http,mvIdentity,mvNotifier, mvAuth) {

 $scope.identity = mvIdentity;
 $scope.signin = function(username,password){
  mvAuth.authenticateUser(username,password).then(function(success) {
   if(success){
    mvNotifier.notify('You are logged in !!');
   } else{
    mvNotifier.notify('Incorrect Username/Password !!');
    }
   })
  }

 $scope.signout = function() {
  mvAuth.logoutUser().then(function() {
   $scope.username = "";
   $scope.password = "";
   $scope.identity=undefined;
   mvNotifier.notify("Logged Out !!");
  })
 }
});