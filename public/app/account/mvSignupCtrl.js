angular.module('app').controller('mvSignupCtrl', function($scope,mvNotifier,$location, mvAuth, mvUser){

  $scope.roleSelect = [
    {value:'admin', text:'As Admin'},
    {value:'user', text:'As Participant'},
    {value:'volunteer', text:'As Volunteer'}
   ];
   $scope.userRole = $scope.roleSelect[1].value;


 $scope.signup = function() {
  var newUserData = {
   username:$scope.email,
   password:$scope.password,
   firstName:$scope.fname,
   lastName:$scope.lname,
   roles:$scope.userRole
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