'use strict'

var angular = require('angular')

angular.module('MathGuy', [])
    .config(function() {
        console.log('abide')
    })
    .service("dude", function() {
        //HBD get set paradigm is annoying
        //still should be possible without object
        // var value = 0
        //var sci = false;
        var data = { value: 0, sci: false }
        var clear = function clear() {
            data.value = 0;
        }
        var isSci = function isSci() {
            return data.sci
        }

        var toggleSci = function toggleSci() {
            console.log('y u no')
            data.sci = !data.sci
        }
        var testy = function testy(val) {
            console.log(val + ', thats just like your opinion man')
        }
        return { clear: clear, data: data, toggleSci: toggleSci, testy: testy, isSci: isSci }
    })