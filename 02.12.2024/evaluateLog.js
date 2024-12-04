let evaluateLogical = (a, b, op) => {
    switch (op) {
        case('&&'): {
            if (a) {
                return b;
            }
            return a;
        }
        case('??'): {
            if (a == null) {
                return b;
            }
            return a;
        }
        case('||'): {
            if (a) {
                return a;
            }
            return b;
        }
    }
};

// console.log(evaluateLogical(1, 2, '&&')); // 10
// console.log(evaluateLogical(null, 'default', '??')); // "default"
console.log(evaluateLogical(false, 42, '||')); // 42