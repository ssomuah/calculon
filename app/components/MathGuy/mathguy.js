'use strict'

var angular = require('angular')

angular.module('MathGuy', [])
    .config(function() {
        console.log('abide')
    })
    .service("dude", function() {
        //HBD get set paradigm is annoying
        //still should be possible without object
        var l = ''
        var r = ''
        var ans = 0
        var perform = ''
        var expression =''
        var haveOperator = false;
        var data = { value: 0, sci: false }
        var currentVal =''
        var leftDone = false;
        var haveRight = false;
        var allowDecimal = true


        var clear = function clear() {
            data.value = 0;
            haveOperator = false;
            expression = ''
            l=''
            r=''
            ans=0
            haveRight = false;
            allowDecimal = true;
            leftDone = false;
        }
        var isSci = function isSci() {
            return data.sci
        }

        var digit = function digit(d) {
            if (data.sci) {
                expression+=d.toString()
            } else {
                if(leftDone){
                    r+=d.toString()
                    r=r.toLocaleString()
                    data.value = r
                    haveRight = true
                }
                else{
                    l+=d.toString()
                    l=l.toLocaleString()
                    data.value = l
                }
            }

        }



        var operator = function operator(o) {
            if(haveRight){
                equals()
                perform = o;
            }else{
                perform = o;
            }
            allowDecimal = true;
            leftDone = true

        }
        var equals = function equals(){
            evaluate()
            haveRight=false;

        }
        var evaluate = function evaluate(){
            var lv = parseFloat(l)
            var rv = parseFloat(r)
            switch (perform) {
                case '+':
                    ans = lv + rv
                    break
                case '-':
                    ans = lv - rv
                    break
                case '/':
                    ans = lv / rv
                    break
                case '*':
                    ans = lv * rv
                    break

            }
            l = ans.toString()
            r=''
            expression = ans.toString()
            data.value = expression

        }

        var decimal = function(){
            if(data.sci && currentval.indexOf('.')==-1){
                expression+='.'
            }else{
                if(!leftDone && allowDecimal){
                l+='.'
                data.value=l
                }
                else if (leftDone && allowDecimal){
                    r+='.'
                    data.value=r
                }
                allowDecimal = false;
            }
            
        }




        var toggleSci = function toggleSci() {
            console.log('y u no')
            data.sci = !data.sci
        }
        var testy = function testy(val) {
            console.log(val + ', thats just like your opinion man')
        }
        return {
            clear: clear,
            data: data,
            toggleSci: toggleSci,
            testy: testy,
            isSci: isSci,
            digit: digit,
            operator: operator,
            equals: equals,
            decimal:decimal
        }
    })