function simulateHoisting(code) {
    let vars = [];
    let lets = [];
    let consts = [];

    for (const el of code) {
        if (el.type == 'var') {
            vars.push(el.name);
        } else if (el.type == 'let') {
            lets.push(el.name);
        } else if ((el.type == 'const')) {
            consts.push(el.name);
        } else {
            console.error('incorrect type');
        }
    }
    return [...vars, ...lets, ...consts];
}   

const code = [
    { type: 'var', name: 'x' }, 
    { type: 'let', name: 'y' },
    { type: 'const', name: 'z' },
    { type: 'var', name: 'a' }
 ];

 console.log(simulateHoisting(code));

 function simulateHoisting2(code) {
    const result = [];

    for (const el of code) {
        if (el.type === 'var') {
            result.push(el.name);
        }
    }
    for (const el of code) {
        if (el.type === 'let') {
            result.push(el.name);
        }
    }
    for (const el of code) {
        if (el.type === 'const') {
            result.push(el.name);
        }
    }

    return result;
}

function simulateHoisting2(code) {
    const priority = { 'var': 1, 'let': 2, 'const': 3 };

    return code
        .sort((a, b) => priority[a.type] - priority[b.type])
        .map(el => el.name);
}