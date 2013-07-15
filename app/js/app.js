'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', [
    'ngCookies',
    'filters',
    'services',
    'directives',
    'controllers' ])

  .config([
      '$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {
    var access = routingConfig.accessLevels;

    $routeProvider.when('/', {
      templateUrl:  'partials/home',
      controller:   'HomeCtrl',
      access:       access.anon
    });

    $routeProvider.when('/login', {
      templateUrl:  'partials/login',
      controller:   'LoginCtrl',
      access:       access.anon
    });

    $routeProvider.when('/register', {
      templateUrl:  'partials/register',
      controller:   'RegisterCtrl',
      access:       access.anon
    });

    $routeProvider.when('/retrieve', {
      templateUrl:  'partials/retrieve',
      controller:   'RetrieveCtrl',
      access:       access.anon
    });

    $routeProvider.when('/404', {
      templateUrl:  'partials/404',
      access:       access.public
    });

    $routeProvider.otherwise({redirectTo:'/404'});

    // gives weird redirection bugs: (TODO)
    // $locationProvider.html5Mode(true);

    $httpProvider.responseInterceptors.push([
        '$location', '$q',
        function($location, $q) {
      function success(response) {
        return response;
      }

      function error(response) {
        if (response.status === 401) {
          $location.path('login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
      }
    }]);


    // Convert JSON to x-www-form-urlencoded Content-Type for POST data.
    // See: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data)
    {
      /**
      * The workhorse; converts an object to x-www-form-urlencoded serialization.
      * @param {Object} obj
      * @return {String}
      */
      var param = function(obj)
      {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj)
        {
          value = obj[name];

          if(value instanceof Array)
          {
            for(i=0; i<value.length; ++i)
            {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object)
          {
            for(subName in value)
            {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
          {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }])

  .run([
      '$rootScope', '$location', 'Auth',
      function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      $rootScope.error = null;
      if (!Auth.authorize(next.access)) {
        if (Auth.isLoggedIn())
          $location.path('');
        else
          $location.path('login');
      }
    });
  }]);

