let hasNestedProperty = (obj, propertyPath) => {
    if (obj == null || typeof obj != 'object' || typeof propertyPath != 'string') {
        return -1;
    }

    let props = propertyPath.split('.');

    for (let prop of props) {
        if (!(prop in obj)) {
            return false;
        }
        obj = obj[prop];
    }
    return true;
};

const user = {
    name: "Alice",
    address: {
        city: "Wonderland",
        zip: "12345"
    }
};

console.log(hasNestedProperty(user, "name")); // true
console.log(hasNestedProperty(user, "address.city")); // true
console.log(hasNestedProperty(user, "address.state")); // false