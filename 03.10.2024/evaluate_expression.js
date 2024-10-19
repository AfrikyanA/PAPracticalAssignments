function evaluate(expression) {
    const lexems = expression.trim().split(/\s+/);

    let numbers = [];
    let operators = [];

    for (let i = 0; i < lexems.length; ++i) {
        let lexem = lexems[i];

        if (!isNaN(parseFloat(lexem))) {
            numbers.push(parseFloat(lexem));
        } else {
            while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(lexem)) {
                applyOperator(operators.pop(), numbers);
            }
            operators.push(lexem);
        }
    }
    while (operators.length > 0) {
        applyOperator(operators.pop(), numbers);
    }
    
    return numbers[0];
}

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
}

function applyOperator(operator, numbers) {
    let b = numbers.pop();
    let a = numbers.pop();
    let result;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }

    numbers.push(result);
}


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите что-нибудь: ', (input) => {
    const result = evaluate(input);
    console.log(result);
    
    rl.close();
});
