angular.module('app').controller('mvSignupCtrl', function($scope,mvNotifier,$location, mvAuth, mvUser){

 $scope.signup = function() {
  var newUserData = {
   username:$scope.email,
   password:$scope.password,
   firstName:$scope.fname,
   lastName:$scope.lname
  };

  mvAuth.createUser(newUserData).then(function(){
   mvNotifier.notify("User created !!");
   $location.path('/');
  },
   function(reason){
     mvNotifier.error(reason);
  });
 }
});