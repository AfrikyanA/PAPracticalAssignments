function tokenizer(input) {
    const tokens = [];
    let i = 0;
    
    while (i < input.length) {
        const char = input[i];

        if (/\s/.test(char)) {
            ++i;
        } else if (/\d/.test(char)) {
            let numbers = '';
            while (i < input.length && /\d/.test(input[i])) {
                number += input[i++];
            }
            tokens.push({
                type: 'Number',
                value: parseFloat(number)
            });
        } else if (/[+\-*/]/.test(char)) {
            tokens.push({
                type: 'Operator',
                value: char
            });
            ++i;
        } else if (char == '(') {
            tokens.push({
                type: Parenthesis,
                value: '('
            });
            ++i;
        } else if (char == ')') {
            tokens.push({
                type: Parenthesis,
                value: ')'
            });
            ++i;
        } else {
            console.error('Unknown identifier ' + char);
        }
    }
    return tokens;
}

const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question('Enter expression: ', (input) => {
    
    r1.close();
});