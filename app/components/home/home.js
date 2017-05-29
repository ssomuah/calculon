'use strict'
// template = require('./home.tpl.html')
var angular = require('angular')
angular
    .module('components.home', ['MathGuy'])
    .config(function homeconf ($stateProvider) {
      $stateProvider.state('home', {
        url: '/home',
        component: 'homeComponent'
      })
    })
    .component('homeComponent', {
      templateUrl: 'components/home/home.tpl.html',
      controller: function (dude) {
        var ctrl = this
        ctrl.calculon = dude
      }
    })
