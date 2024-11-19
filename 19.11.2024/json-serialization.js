function testJSONSerialization(obj) {
    if (typeof obj != 'object' || obj == null) {
        return -1;
    }
    const newObj = JSON.parse(JSON.stringify(obj, (key, value) => {
        return (value === undefined) ? null : value;
    }));
    console.log(JSON.stringify(newObj));
}

let obj = {
    a: 1,
    b: null,
    d: undefined,
    c: 2
};
testJSONSerialization(obj); // Output: {"a":1,"b":null,"d":null,"c":2}