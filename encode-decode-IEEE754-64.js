function encodeIEEE754_64(number) {
  // Handle special cases (e.g., 0, Infinity, NaN)
  if (typeof number !== 'number' || isNaN(number)) {
    const nanBits = '11111111111' + '1'.padEnd(52, '0');
    return {
      sign: '0',
      exponent: '11111111111',
      fraction: '1'.padEnd(52, '0'),
      ieee754: '0' + nanBits,
    };
  }

  if (!isFinite(number)) {
    const sign = number < 0 ? '1' : '0';
    const infBits = '11111111111' + '0'.padEnd(52, '0');
    return {
      sign: sign,
      exponent: '11111111111',
      fraction: '0'.padEnd(52, '0'),
      ieee754: sign + infBits,
    };
  }

  if (number === 0) {
    const sign = Object.is(number, -0) ? '1' : '0';
    const zeroBits = '00000000000' + '0'.padEnd(52, '0');
    return {
      sign: sign,
      exponent: '00000000000',
      fraction: '0'.padEnd(52, '0'),
      ieee754: sign + zeroBits,
    };
  }

  // Extract the sign bit
  const sign = (number < 0) ? '1' : '0';
  number = Math.abs(number);

  // Normalize the number and compute exponent and fraction
  let exponent = 0;
  let fraction = number;
  while (fraction >= 2) {
    fraction /= 2;
    ++exponent;
  }
  while (fraction < 1 && exponent > -1022) {
    fraction *= 2;
    --exponent;
  }

  // Handle subnormal numbers if necessary
  if (exponent == -1022) {
    fraction -= 1; // Remove implicit leading 1 for subnormals
  } else {
    fraction -= 1; // Remove the implicit leading 1
  }

  // Compute the biased exponent
  const biasedExponent = (exponent + 1023).toString(2).padStart(11, '0');

  // Format the output (combine sign, exponent, and fraction)
  let fractionBits = '';
  while (fractionBits.length < 52) {
    fraction *= 2;
    if (fraction >= 1) {
      fractionBits += '1';
      fraction -= 1;
    } else {
      fractionBits += '0';
    }
  }

  return {
    sign: sign,
    exponent: biasedExponent,
    fraction: fractionBits,
    ieee754: sign + biasedExponent + fractionBits,
  };
}

function decodeIEEE754_64(binary) {
  // Extract sign, exponent, and fraction fields
  if (typeof binary != 'string' || binary.length != 64 || /[^01]/.test(binary)) {
    return null;
  }

  let sign = (binary[0] == '1') ? -1 : 1;
  let exponentBits = binary.slice(1, 12);
  let fractionBits = binary.slice(12);

  // Handle special cases (e.g., subnormal numbers, Infinity, NaN)
  if (binary == 0) {
    return ((sign == -1) ? { value: -0 } : { value: 0 });
  }

  const exponent = parseInt(exponentBits, 2);
  if (exponent == 0b11111111111) {
    if (fractionBits.includes('1')) {
      return {
        value: NaN,
      };
    }
    return {
      value: (sign == -1 ? -Infinity : Infinity),
    };
  }

  const isSubnormal = (exponent == 0);
  const E = isSubnormal ? -1022 : (exponent - 1023);

  // Compute the actual exponent and significand
  let fraction = 0;
  for (let i = 0; i < fractionBits.length; ++i) {
    if (fractionBits[i] == '1') {
      fraction += Math.pow(2, -(i + 1));
    }
  }

  // Reconstruct the decimal value
  const significand = isSubnormal ? fraction : (1 + fraction);
  const value = sign * Math.pow(2, E) * significand;

  return {
    value: value,
  };
}

module.exports = {encodeIEEE754_64, decodeIEEE754_64}; 