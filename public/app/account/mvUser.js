angular.module('app').factory('mvUser', function($resource) { 

 var UserResource = $resource('/api/users/:id', {_id:'@id'},{ update:{method:'PUT', isArray:false}}); // routes.js

 UserResource.prototype.isAdmin = function() {
  return this.roles && this.roles.indexOf('admin') > -1;
 } // add isAdmin method to every instances of UserResourse

 return UserResource;

});

//  $resource makes a number of assumptions about how a web service endpoint should function, and with minimal information from the developer constructs an object that can be used to make a wide variety of requests to the service