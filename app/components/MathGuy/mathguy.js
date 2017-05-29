'use strict'

var angular = require('angular')

angular.module('MathGuy', [])
    .config(function() {
        console.log('abide')
    })
    .service("dude", function() {
        //HBD get set paradigm is annoying
        //still should be possible without object
        var right = 'r'
        var left = 'l'
        var lp = '('
        var rp = ')'
        var arithmetic = { '+': 1, '-': 1, '*': 1, '÷': 1, '^': 1 }
        var assoc = { '*': left, '÷': left, '+': left, '-': left, '^': right }
        var prec = { '*': 3, '÷': 3, '+': 2, '-': 2, '^': 4 }
        var plus = '+'
        var minus = '-'
        var div = '÷'
        var mult = '*'
        var exp = '^'

        var l = ''
        var r = ''
        var ans = 0
        var perform = ''
        var expression = ''
        var haveOperator = false;
        var data = { value: 0, sci: false }
        var currentVal = ''
        var leftDone = false;
        var haveRight = false;
        var allowDecimal = true


        var clear = function clear() {
            data.value = 0;
            haveOperator = false;
            expression = ''
            l = ''
            r = ''
            ans = 0
            haveRight = false;
            allowDecimal = true;
            leftDone = false;
            currentVal = ''
        }
        var isSci = function isSci() {
            return data.sci
        }

        var digit = function digit(d) {
            if (data.sci) {

                expression += d


                data.value = expression
                currentVal += d
            } else {
                if (leftDone) {
                    r += d.toString()
                    data.value = parseFloat(r).toLocaleString()
                    haveRight = true
                } else {
                    l += d.toString()
                    data.value = parseFloat(l).toLocaleString()
                }
            }

        }



        var operator = function operator(o) {
            if (data.sci) {
                expression += " " + o + " "
                data.value = expression
                currentVal = ''
            } else {
                if (haveRight) {
                    equals()
                    perform = o;
                } else {
                    perform = o;
                }
                allowDecimal = true;
                leftDone = true
            }
        }
        var equals = function equals() {
            if (data.sci) {
                var final = calcIt(stackIt(expression))
                data.value = final
                expression = final

            } else {
                if (leftDone && haveRight) {
                    evaluate()
                    haveRight = false;
                }
            }
        }
        var evaluate = function evaluate() {
            var lv = parseFloat(l)
            var rv = parseFloat(r)
            switch (perform) {
                case plus:
                    ans = lv + rv
                    break
                case minus:
                    ans = lv - rv
                    break
                case div:
                    ans = lv / rv
                    break
                case mult:
                    ans = lv * rv
                    break
                case exp:
                    ans = Math.pow(lv, rv)
                    break

            }
            l = ans.toString()
            r = ''
            data.value = parseFloat(ans).toLocaleString()

        }

        var decimal = function() {
            if (data.sci) {

                if (currentVal.indexOf('.') == -1) {
                    if (currentVal == "") {
                        expression += "0"
                    }
                    expression += '.'
                    currentVal += '.'
                    data.value = expression
                }
            } else {
                if (!leftDone && allowDecimal) {
                    l += '.'
                    data.value = l
                } else if (leftDone && allowDecimal) {
                    r += '.'
                    data.value = r
                }
                allowDecimal = false;
            }

        }




        var toggleSci = function toggleSci() {
            data.sci = !data.sci
            clear()
        }

        var stackIt = function stackIt(string) {
            var trimmed = string.replace(/\s+/g, '');
            var output = []
            var operators = []

            var operand = "operand"
            var numnum = "numnum"
            var tokens = trimmed.split("")

            var o = ''
            var kind = ''
            tokens.forEach(function(t) {
                var val = parseFloat(t, 10)
                if (isNaN(val)) {
                    kind = operand
                } else {
                    kind = numnum
                }

                if (kind == numnum) {
                    output.push(val)
                } else if (t in arithmetic) {
                    o = operators[operators.length - 1]
                    while (o in arithmetic && ((assoc[t] == left && prec[t] <= prec[o]) || (assoc[t] == right && prec[t] < prec[o]))) {
                        output.push(operators.pop())
                        o = operators[operators.length - 1]
                    }

                    operators.push(t)
                } else if (t == lp) {
                    operators.push(t)

                } else if (t == rp) {
                    o = operators[operators.length - 1]
                    while (o != lp) {
                        output.push(operators.pop())
                        o = operators[operators.length - 1]
                    }
                    operators.pop()
                } else {
                    //something has gone wrong
                }

            })
            var n = operators.length
            for (var i = 0; i < n; i++) {
                output.push(operators.pop())
            }


            return output
        }

        var calcIt = function calcIt(tokens) {
            var l1 = ''
            var r1 = ''
            var stack = []
            tokens.forEach(function(t) {
                if (!(t in arithmetic)) {
                    stack.push(t)
                } else {
                    r1 = stack.pop()
                    l1 = stack.pop()
                    if (t == plus) {
                        stack.push(l1 + r1)
                    } else if (t == minus) {
                        stack.push(l1 - r1)
                    } else if (t == mult) {
                        stack.push(l1 * r1)
                    } else if (t == exp) {
                        stack.push(Math.pow(l1, r1))

                    } else if (t == div) {
                        stack.push(l1 / r1)

                    } else {
                        //some token we don't know about
                        return
                    }

                }


            })
            return stack.pop()


        }

        var paren = function paren(p) {
            expression += p
            data.value = expression
        }

        return {
            clear: clear,
            data: data,
            toggleSci: toggleSci,
            isSci: isSci,
            digit: digit,
            operator: operator,
            equals: equals,
            decimal: decimal,
            paren: paren
        }
    })