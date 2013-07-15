'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('services', []);

angular.module('app')

  .factory('Auth', function($http, $cookieStore) {
    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    };

    return {
      authorize: function(accessLevel, role) {
        if (role === undefined)
          role = currentUser.role;
        return accessLevel.bitMask & role.bitMask;
      },

      isLoggedIn: function(user) {
        if (user === undefined)
          user = currentUser;
        return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
      },

      register: function(user, success, error) {
        $http.post('service/user', user).success(function(res) {
          changeUser(res);
          success();
        }).error(error);
      },

      login: function(user, success, error) {
        $http.post('service/session', user).success(function(user){
          changeUser(user);
          success(user);
        }).error(error);
      },

      logout: function(success, error) {
        $http.delete('service/session').success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },

      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  })

  .factory('Users', function($http) {
    return {
      getAll: function(success, error) {
        $http.get('users').success(success).error(error);
      }
    };
  });

