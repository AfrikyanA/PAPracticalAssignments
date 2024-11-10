function hasProperties(obj, properties) {
    if (typeof obj !== 'object' || obj == null ||
        !Array.isArray(properties) || !(properties.every(el => typeof el == "string"))) {

        return false;
    }

    let result = {};
    for (let el of properties) {
        let keys = el.split('.');
        let currentObj = obj;
        let exists = true;

        for (let key of keys) {
            if (!(key in currentObj)) {
                exists = false;
                break;
            }
            currentObj = currentObj[key];
        }

        result[el] = exists;
    }
    return result;
}

const user = { name: "Alice", address: { city: "Wonderland" }};
console.log(hasProperties(user, ["name", "address.city", "address.zip"]));
// Output: { name: true, "address.city": true, "address.zip": false }

