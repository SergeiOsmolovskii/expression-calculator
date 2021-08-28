function expressionCalculator(expr) {
    let brakets = 0;
    let arr = [];
    let temp = '';

    const mathOperators = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    function createArr() {
        expr = expr.replace(/\s/g, '');
        if (expr.indexOf('/0' || '/ 0') != -1) throw new Error("TypeError: Division by zero.");
        for (let i = 0; i < expr.length; i++) {
            checkBraket(expr[i]);
            if (!isNaN(Number(expr[i]))) temp += expr[i];
            else {
                if (temp === '') arr.push(expr[i]);
                else {
                    arr.push(temp);
                    temp = '';
                    arr.push(expr[i]);
                }
            }
        }
        if (brakets > 0) throw new Error("ExpressionError: Brackets must be paired");
        if (temp) arr.push(temp);
    }

    function checkBraket(item) {
        if (item == '(') brakets += 1;
        if (item == ')') brakets -= 1;
        if (brakets < 0) throw new Error("ExpressionError: Brackets must be paired");
    }

    let str = '';
    let stack = [];

    function toReversePolishNotation(arr) {

        arr.forEach(element => {
            let currrentOperator = mathOperators[element];
            if (Number(element) || element == '0') str += `${element} `;
            if (element == '(') stack.push(element);
            if (element == ')') {
                while (stack[stack.length - 1] != '(') {
                    str += `${stack[stack.length-1]} `;
                    stack.pop();
                }
                stack.pop();
            }
            if (currrentOperator) {
                let lastStackElement = stack[stack.length - 1];
                if (stack.length == 0) stack.push(element);
                if (lastStackElement == '(') stack.push(element);
                if (currrentOperator <= mathOperators[lastStackElement]) {
                    while (currrentOperator <= mathOperators[lastStackElement]) {
                        str += `${stack[stack.length-1]} `;
                        stack.pop();
                        lastStackElement = stack[stack.length - 1];
                    }
                    stack.push(element);
                } else if (currrentOperator > mathOperators[lastStackElement]) {
                    stack.push(element);
                }
            }
        });
        return `${str}${stack.reverse().join(' ')}`;
    }

    const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    };

    function calcResult(string) {
        let stack = [];
        string.split(' ').forEach((element) => {
            if (element in operators) {
                let [y, x] = [stack.pop(), stack.pop()];
                stack.push(operators[element](x, y));
            } else stack.push(parseFloat(element));
        });
        return stack.pop();
    };

    createArr();
    let reversePolishNotationString = toReversePolishNotation(arr);
    return Math.round(calcResult(reversePolishNotationString) * 10000) / 10000;
}

module.exports = {
    expressionCalculator
}