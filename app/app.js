'use strict';
var angular = require('angular')
require('angular-ui-router')
require('angular-ui-bootstrap')
require('./components')

var app = angular.module('calculatorApp', ['ui.router', 'ui.bootstrap', 'components'])
app.config(function calculatorConfig($urlRouterProvider) {
        console.log('the cult')
        $urlRouterProvider.otherwise('/home')
    })
    .controller('appCtrl', function appCtrl() {
        var ctrl = this
        ctrl.foo = "bar"
        console.log('drunken wookie')
    })

// Declare app level module which depends on views, and components

/*angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/