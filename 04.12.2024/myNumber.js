let myToNumber = (argument) => {
    if (typeof argument == "number") {
        return argument;
    }
    if (typeof argument == "bigint" || typeof argument == "symbol") {
        throw new TypeError("A different data type was expected");
    }
    if (argument === undefined) {
        return NaN;
    }
    if (argument == null || argument == false) {
        return 0;
    }
    if (argument == true) {
        return 1;
    }
    if (argument == true) {
        return 1;
    }
    if (typeof argument == "string") {
        return +argument;
    }
    let primValue = myToPrimitive(argument);
    return myToNumber(primValue);
};

let myToPrimitive = (input) => {
    if (typeof input == "object") {
        return +input;
    }
    return input;
};

let myToNumeric = (value) => {
    let primValue = myToPrimitive(value);
    
    if (typeof primValue == "bigint") {
        return primValue;
    }

    return myToNumber(primValue);
};

let myNumber = (value) => {
    if (value) {
        let prim = myToNumeric(value);
        if (typeof prim == "bigint") {
            let n = +prim;
        } else {
            let n = prim;
        }
    } else {
        let n = 0;
    }

    if (!new.target) {
        return n;
    }

    let O = new Number(n);
    return O;
};