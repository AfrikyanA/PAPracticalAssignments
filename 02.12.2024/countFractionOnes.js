let countFractionOnes = (ieee754) => {
    if (typeof ieee754 != 'string' || ieee754.length != 64 || /[^01]/.test(ieee754)) {
        return -1;
    }

    let sign = (ieee754[0] == '1') ? -1 : 1;
    let exponentBits = ieee754.slice(1, 12);
    let fractionBits = ieee754.slice(12);

    // Handle special cases (e.g., subnormal numbers, Infinity, NaN)
    if (ieee754 == 0) {
        return 0;
    }

    const exponent = parseInt(exponentBits, 2);
    if (exponent == 0b11111111111) {
        if (fractionBits.includes('1')) {
            return 12;
        }
        return 11;
    }

    const isSubnormal = (exponent == 0);
    const E = isSubnormal ? -1022 : (exponent - 1023);

    let count = 0;
    let fraction = 0;
    for (let i = 0; i < fractionBits.length; ++i) {
        if (fractionBits[i] == '1') {
            ++count;
            fraction += Math.pow(2, -(i + 1));
        }
    }

    return count;
};

console.log(countFractionOnes("1100000000011010000000000000000000000000000000000000000000000000"));
// Output: 2

console.log(countFractionOnes("0011111110111001100110011001100110011001100110011001100110011010"));
// Output: 26