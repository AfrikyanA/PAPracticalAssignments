let myParseFloat = (string) => {
    let inputString = String(string);

    let trimmedString = inputString.trim();

    let trimmedPrefix = '';
    for (let i = 0; i < trimmedString.length; i++) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'].includes(trimmedString[i])) {
            trimmedPrefix += trimmedString[i];
        } else {
            break;
        }
    }

    if (trimmedPrefix === '') {
        return NaN;
    }

    let parsedNumber = parseFloat(trimmedPrefix);
    return parsedNumber;
};