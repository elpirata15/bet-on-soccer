// File:    main.js
// Purpose: application entry point

(function (scope) {
  'use strict';

  scope.require.config({
    baseUrl:    'js',
    paths: {
      backbone: 'lib/backbone',
      require:  'lib/require'
    }
  });
}(this));
