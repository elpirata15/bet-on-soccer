'use strict';

// Declare app level module which depends on filters, and services
angular.module('BoS', [
    'ngCookies',
    'BoS.filters',
    'BoS.services',
    'BoS.directives',
    'BoS.controllers' ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider',
      function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/', {
      templateUrl:  'partials/home',
      controller:   'BoS.Home',
      access:       access.anon
    });

    $routeProvider.when('/login', {
      templateUrl:  'partials/login',
      controller:   'BoS.Login',
      access:       access.anon
    });

    $routeProvider.when('/register', {
      templateUrl:  'partials/register',
      controller:   'BoS.Register',
      access:       access.anon
    });

    $routeProvider.when('/retrieve', {
      templateUrl:  'partials/retrieve',
      controller:   'BoS.Retrieve',
      access:       access.anon
    });

    $routeProvider.when('/404', {
      templateUrl:  'partials/404',
      access:       access.public
    });

    $routeProvider.otherwise({redirectTo:'/404'});

    //$locationProvider.html5Mode(true);

    var interceptor = ['$location', '$q', function($location, $q) {
        function success(response) {
            return response;
        }

        function error(response) {
            if(response.status === 401) {
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
    }];

    $httpProvider.responseInterceptors.push(interceptor);
  }])

  .run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.error = null;
            if (!Auth.authorize(next.access)) {
                if(Auth.isLoggedIn()) $location.path('/');
                else                  $location.path('/login');
            }
        });
  }]);
