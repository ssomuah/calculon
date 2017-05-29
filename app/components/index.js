'use strict'

require('./home/home.js')
require('./MathGuy/mathguy.js')

var angular = require('angular')
angular
    .module('components', [
      'components.home',
      'MathGuy'
    ])
