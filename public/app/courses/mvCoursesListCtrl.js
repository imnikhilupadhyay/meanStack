angular.module('app').controller('mvCoursesListCtrl', function($scope,mvCourse) {
 $scope.courses = mvCourse.query(); 

 $scope.sortOptions = [
  {value:'title' , text:'Sort by Title'},
  {value:'published' , text:'Sort by Publish'}
 ];
 $scope.sortOrder = $scope.sortOptions[0].value;
});