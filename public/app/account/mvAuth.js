angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){

 return{
  authenticateUser: function(username, password) {
   let q = $q.defer();
   $http.post('/login',{username:username, password:password})
   .then(function(response){
     if(response.data.success){
       var user = new mvUser();
       angular.extend(user, response.data.user);
       mvIdentity.currentUser = user;
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
      mvIdentity.currentUser= undefined;
      q.resolve();
    });
    return q.promise;
  },
  authorizeCurrentUserForRoute: function(role) {
    if(mvIdentity.isAuthorized(role)){
      return true;
    } else {
        return $q.reject('not an admin !!');
    }
  }
 }
});