var app = angular.module('app',['ngResource','ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

   var routeRoleChecks = {
    admin: {
     auth: function(mvAuth){
      return mvAuth.authorizeAdminForRoute('admin');
     }
    },
    all: {
      auth: function(mvAuth){
       return mvAuth.authorizeAuthenticatedAllForRoute();
      }
     },
     user: {
       auth: function(mvAuth){
         return mvAuth.authorizeAuthenticatedUserForRoute('user,admin');
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
    resolve:routeRoleChecks.all
  })
   .when('/courses',{
    templateUrl:'/partials/courses/courses-list',
    controller:'mvCoursesListCtrl',
    resolve: routeRoleChecks.user
  })
  .when('/courses/:id',{
    templateUrl:'/partials/courses/courses-details',
    controller:'mvCoursesDetailCtrl',
    resolve: routeRoleChecks.user
  })
}]);


angular.module('app').run(function($rootScope, $location) {
 $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
    if(rejection === 'not an admin !!' || rejection === 'not authenticated !!'){
     $location.path('/');
    }
 })
}); // rootScope is used to listin route changer events
