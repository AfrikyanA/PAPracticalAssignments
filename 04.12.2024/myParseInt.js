let myParseInt = (string, radix) => {
    // Convert input string to a string
    let inputString = String(string);

    // Trim white spaces from both ends
    let S = inputString.trim();

    // Set the sign to 1 (positive)
    let sign = 1;

    // Check if the first character is a minus sign
    if (S.length > 0 && S.charCodeAt(0) === 0x002D) {
        sign = -1;
    }

    // Remove leading signs
    if (S.length > 0 && (S.charCodeAt(0) === 0x002B || S.charCodeAt(0) === 0x002D)) {
        S = S.substring(1);
    }

    // Coerce radix to an integer
    let R = Number(radix);
    let stripPrefix = true;

    // Handle cases for radix
    if (!isNaN(R)) {
        if (R < 2 || R > 36) {
            return NaN;
        }
        if (R !== 16) {
            stripPrefix = false;
        }
    } else {
        R = 10;
    }

    // Handle prefix "0x" or "0X" for hexadecimal
    if (stripPrefix && S.length >= 2 && (S.substring(0, 2) === "0x" || S.substring(0, 2) === "0X")) {
        S = S.substring(2);
        R = 16;
    }

    // Find the end index for valid radix-R digits
    let end = S.length;
    for (let i = 0; i < S.length; i++) {
        if (parseInt(S.charAt(i), R) === NaN) {
            end = i;
            break;
        }
    }

    // Get the substring of S up to the valid end index
    let Z = S.substring(0, end);

    // Return NaN if Z is empty
    if (Z === "") {
        return NaN;
    }

    // Convert Z to a number using the specified radix
    let mathInt = parseInt(Z, R);

    // Handle special case when mathInt is 0
    if (mathInt === 0) {
        if (sign === -1) {
            return -0;
        }
        return +0;
    }

    // Return the final result
    return sign * mathInt;
};