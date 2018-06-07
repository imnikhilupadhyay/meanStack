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
  authorizeAdminForRoute: function(role) {
    if(mvIdentity.isAuthorized(role)){
      return true;
    } else {
        return $q.reject('not an admin !!');
    }
  },
  createUser: function(newUserData) {
    let newUser = new mvUser(newUserData);
    var q = $q.defer();
    newUser.$save().then(function() { // resource have $save
      mvIdentity.currentUser = newUser;
      q.resolve(true);
    },
      function(response){
        q.reject(response.data.reason);
      }
    );
    return q.promise;
  },
  authorizeAuthenticatedAllForRoute: function(role) {
    if(mvIdentity.isAuthenticated()) {
      return true;
    } else {
        return $q.reject('not authenticated !!');
    }
  },
  authorizeAuthenticatedUserForRoute: function(role) {
    if(mvIdentity.isAuthorized()) {
      return true;
    } else {
      return $q.reject('not authenticated !!');
    }
  },
  updateCurrentUser: function(newUserData) {
    var q = $q.defer();
    let clone = angular.copy(mvIdentity.currentUser);
    angular.extend(clone,newUserData);
    clone.$update().then(function(){
      mvIdentity.currentUser = clone;
      q.resolve();
    }, function(reason){
      q.reject(reason);
    });
    return q.promise;
  }
 }
});