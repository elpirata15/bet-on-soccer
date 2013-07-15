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
          $location.path('/login');
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
  }])

  .run([
      '$rootScope', '$location', 'Auth',
      function ($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      $rootScope.error = null;
      if (!Auth.authorize(next.access)) {
        if (Auth.isLoggedIn())
          $location.path('/');
        else
          $location.path('/login');
      }
    });
  }]);

