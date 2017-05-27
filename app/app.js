'use strict';
var angular = require('angular')
require('angular-ui-router')
require('angular-ui-bootstrap')

var app = angular.module('calculatorApp',['ui.router','ui.bootstrap'])
app.config(function calculatorConfig($urlRouterProvider){
  $urlRouterProvider.otherwise('/home')
})
require('./components')
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
