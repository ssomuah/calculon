'use strict'
//template = require('./home.tpl.html')
var angular = require('angular')
angular
    .module('components.home',[])
    .config(function homeconf($stateProvider) {
        console.log('fig newton')
        $stateProvider.state('home', {
            url: '/home',
            component:"homeComponent"
        });
    })
.component('homeComponent', {
        templateUrl:"components/home/home.tpl.html",
        controller: function () {
            console.log('all hail')
        }
    })

