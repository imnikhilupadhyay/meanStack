angular.module('app').factory('mvAuth', function($http, mvIdentity, $q){

 return{
  authenticateUser: function(username, password) {
   let q = $q.defer();
   $http.post('/login',{username:username, password:password})
   .then(function(response){
     if(response.data.success){
      mvIdentity.currentUser = response.data.user;
      q.resolve(true);
     } else{
      q.resolve(false);
     }
    });
    return q.promise;
  },
  logoutUser: function() {
    let q = $q.defer();
    $http.post('/logout',{logout:true})
    .then(function(){
      mvIdentity= undefined;
      q.resolve();
    });
    return q.promise;
  }
 }
});