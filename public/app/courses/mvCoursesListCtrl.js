angular.module('app').controller('mvCoursesListCtrl', function($scope,mvCachedCourse) {
 $scope.courses = mvCachedCourse.query(); 

 $scope.sortOptions = [
  {value:'title' , text:'Sort by Title'},
  {value:'published' , text:'Sort by Publish'}
 ];
;
 $scope.sortOrder = $scope.sortOptions[0].value;
});