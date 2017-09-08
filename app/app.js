'use strict'
var angular = require('angular')
require('angular-ui-router')
require('angular-ui-bootstrap')
require('./components')

var app = angular.module('calculatorApp', ['ui.router', 'ui.bootstrap', 'components'])
app.config(function calculatorConfig ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')
})