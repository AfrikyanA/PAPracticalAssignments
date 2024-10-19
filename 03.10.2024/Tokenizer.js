function tokenize(expression) {
    const lexems = expression.trim().split(/\s+/);

    let tokens = [];

    for (const lexem of lexems) {
        if (/^-?\d+(\.\d+)?$/.test(lexem)) {
            tokens.push({ 
                type: 'Number',
                value: Number(lexem)
            });
        } else if (/^[+\-*/%**]$/.test(lexem)) {
            tokens.push({ 
                type: 'Operator',
                value: lexem
            });
        } else {
            console.error(`Unknown token: ${lexem}`);
        }
    }
    return tokens;
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите что-нибудь: ', (input) => {
    const tokens = tokenize(input);
    console.log(tokens);
    
    rl.close();
});
