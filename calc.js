var right = 'r'
var left = 'l'
var lp = '('
var rp = ')'
var arithmetic = { '+': 1, '-': 1, '*': 1, '/': 1, '^': 1 }
var assoc = { '*': left, '/': left, '+': left, '-': left, '^': right }
var prec = { '*': 3, '/': 3, '+': 2, '-': 2, '^': 4 }
var plus = '+'
var minus = '-'
var div = '/'
var mult = '*'
var exp ='^'

parse = function parse(string) {
    var trimmed = string.replace(/\s+/g, '');
    var output = []
    var operators = []

    var operand = "operand"
    var numnum = "numnum"
    var tokens = trimmed.split("")
    tokens.forEach(function (t) {
        val = parseFloat(t, 10)
        if (isNaN(val)) {
            kind = operand
        } else {
            kind = numnum
        }

        if (kind == numnum) {
            output.push(val)
        }
        else if (t in arithmetic) {
            o = operators[operators.length - 1]
            while (o in arithmetic && ((assoc[t] == left && prec[t] <= prec[o]) || (assoc[t] == right && prec[t] < prec[o]))) {
                output.push(operators.pop())
                o = operators[operators.length - 1]
            }

            operators.push(t)
        }
        else if (t == lp) {
            operators.push(t)

        }
        else if (t == rp) {
            o = operators[operators.length - 1]
            while (o != lp) {
                output.push(operators.pop())
                o = operators[operators.length - 1]
            }
            operators.pop()
        }
        else {
            //something has gone wrong
        }

    })
    n = operators.length
    for (i = 0; i < n; i++) {
        output.push(operators.pop())
    }


    //console.log(output)
    //console.log(operators)
    return output
}

evaluate = function evaluate(tokens) {
    //console.log(tokens)
    stack = []
    tokens.forEach(function (t) {
        //console.log(stack)
        if (!(t in arithmetic)) {
            stack.push(t)
        }
        else {
            r = stack.pop()
            l = stack.pop()
            if (t == plus) {
                //temp = l + r
                //console.log(temp)
                stack.push(l + r)
            }
            else if (t == minus) {
                //temp = l - r
                //console.log(temp)
                stack.push(l - r)
            }
            else if (t == mult) {
                //temp = l * r
                //console.log(temp)
                stack.push(l * r)
            }
            else if (t==exp){
                //temp = Math.pow(l,r)
                //console.log(temp)
                stack.push(Math.pow(l,r))

            }
            else if (t==div){
                //may be something wrong here with 1/-22
                if (l * r < 0 && l % r != 0) {
                    //temp = l / r + 1
                    //console.log(temp)
                    stack.push(l / r + 1)
                }
                else {
                    //temp = l / r
                    //console.log(temp)
                    stack.push(l / r)

                }
            }
            else{
                console.log('wrong')
                return
            }
        }


    })
    return stack.pop()


}

console.log(evaluate(parse("3 + 4 * 2 / ( 1 - 5 ) ^ 2")))
console.log(evaluate(parse("3-4")))
console.log(evaluate(parse("4/2+3")))
console.log(evaluate(parse("3+4/2")))

//console.log(evaluate(parse("3-4")))
//console.log(parse("4/2+3"))