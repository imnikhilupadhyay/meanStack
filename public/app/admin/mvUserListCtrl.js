angular.module('app').controller('mvUserListCtrl', function($scope,mvUser){
 $scope.users = mvUser.query();

 // $scope.role = [
 //  {value:"admin", text:"Search Admin"},
 //  {value:""}
 // ];

});