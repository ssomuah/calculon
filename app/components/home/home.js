'use strict'
//template = require('./home.tpl.html')
var angular = require('angular')
angular
    .module('components.home', ['MathGuy'])
    .config(function homeconf($stateProvider, ) {
        console.log('fig newton')
        $stateProvider.state('home', {
            url: '/home',
            component: "homeComponent"
        });
    })
    .component('homeComponent', {
        templateUrl: "components/home/home.tpl.html",
        controller: function(dude) {
            var ctrl = this
            ctrl.calculon = dude
            ctrl.calculon.testy('top')
            dude.testy('kek')
            ctrl.sci = false
            ctrl.display = "1337"

            ctrl.toggleSci = function toggleSci() {
                ctrl.calculon.toggleSci()
                ctrl.sci = dude.isSci()
            }
        }
    })