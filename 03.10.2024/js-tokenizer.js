function tokenize(expression) {
    const lexems = expression.trim().split(/\s+/);

    const tokens = [];
    const jsKeywords = [
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
        'if', 'import', 'in', 'instanceof', 'let', 'new', 'return', 'super', 'switch',
        'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
        'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public', 
        'static', 'await', 'null', 'true', 'false'
    ];
    const numberRegex = /^-?\d+(\.\d+)?$/;
    const operatorRegex = /^[+\-*/%&|^!<>=]+$/;
    const punctuationRegex = /^[.,;:!?(){}[\]'"`-]+$/;
    const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

    for (const lexem of lexems) {
        if (numberRegex.test(lexem)) {
            tokens.push({ 
                type: 'Number',
                value: Number(lexem)
            });
        } else if (operatorRegex.test(lexem)) {
            tokens.push({ 
                type: 'Operator',
                value: lexem
            });
        } else if (jsKeywords.includes(lexem)) {
            tokens.push({ 
                type: 'Keyword',
                value: lexem
            });
        } else if (punctuationRegex.test(lexem)) {
            tokens.push({ 
                type: 'Punctuation',
                value: lexem
            });
        } else if (identifierRegex.test(lexem)) {
            tokens.push({ 
                type: 'Identifier',
                value: lexem
            });
        }
        else {
            console.error('Unknown token: ' + lexem );
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
