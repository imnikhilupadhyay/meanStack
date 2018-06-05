var app = angular.module('app',['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

   var routeRoleChecks = {
    admin: {
     auth: function(mvAuth){
      return mvAuth.authorizeCurrentUserForRoute('admin');
     }
    },
    user: {
      auth: function(mvAuth){
       return mvAuth.authorizeAuthenticatedUserForRoute();
      }
     }
   }

   $locationProvider.html5Mode(true);
   $routeProvider
   .when('/',{
    templateUrl:'/partials/main/main',
    controller:'mvMainCtrl'
   })
   .when('/admin/users', {
     templateUrl:'/partials/admin/user-list',
     controller:'mvUserListCtrl',
     resolve: routeRoleChecks.admin
   })
   .when('/signup',{
     templateUrl:'/partials/account/signup',
     controller:'mvSignupCtrl'
   })
   .when('/profile',{
    templateUrl:'/partials/account/profile',
    controller:'mvProfileCtrl',
    resolve:routeRoleChecks.user
  })
   .when('/courses',{
    templateUrl:'/partials/courses/courses-list',
    controller:'mvCoursesListCtrl'
  })
}]);


angular.module('app').run(function($rootScope, $location) {
 $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
    if(rejection === 'not an admin !!'){
     $location.path('/');
    }
 })
});
