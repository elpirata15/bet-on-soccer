'use strict';

// Declare app level module which depends on filters, and services
angular.module('BoS', [
    'BoS.filters',
    'BoS.services',
    'BoS.directives',
    'BoS.controllers' ])
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/login',
      {templateUrl: 'partials/login.html', controller: 'BoS.Login'});

    $routeProvider.when('/register',
      {templateUrl: 'partials/register.html', controller: 'BoS.Register'});

    $routeProvider.when('/retrieve',
      {templateUrl: 'partials/retrieve.html', controller: 'BoS.Retrieve'});

    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
