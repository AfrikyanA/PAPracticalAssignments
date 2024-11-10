function validateSchema(obj, schema) {
    if (typeof obj !== 'object' || obj == null ||
        typeof schema !== 'object' || schema == null) {

        return false;
    }

    let keys1 = Object.keys(obj);
    let keys2 = Object.keys(schema);
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key in obj) {
        if (!schema.hasOwnProperty(key)) {
            return false;
        }

        switch (schema[key].type) {
            case ("string"): {
                if (typeof obj[key] != "string" || obj[key].length < schema[key].minLength) {
                    return false;
                }
                break;
            }
            case ("number"): {
                if (typeof obj[key] != "number" || obj[key] < schema[key].min) {
                    return false;
                }
                break;
            }
            case ("boolean"): {
                if (typeof obj[key] != "boolean") {
                    return false;
                }
                break;
            }
            case ("array"): {
                if (!Array.isArray(obj[key]) || !obj[key].every(el => typeof el === "string")) {
                    return false;
                }
                break;
            }
            default: {
                return false;
            }
        }
    }
    return true;
}

const schema = {
    name: { type: "string", minLength: 2 },
    age: { type: "number", min: 18 },
    isActive: { type: "boolean" },
    tags: { type: "array", itemType: "string" }
};

const obj = {
    name: "Alice",
    age: 25,
    isActive: true,
    tags: ["admin", "user"]
};

console.log(validateSchema(obj, schema)); // Expected output: true
