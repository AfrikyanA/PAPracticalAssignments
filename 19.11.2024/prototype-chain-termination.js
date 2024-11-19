function checkPrototypeChain(obj) {
    if (typeof obj != 'object' || obj == null) {
        return -1;
    }
    let depth = 0;
    while (obj !== null) {
        obj = Object.getPrototypeOf(obj);
        ++depth;
    }
    return depth;
}

console.log(checkPrototypeChain({})); // Output: 1

function MyConstructor() { }
const instance = new MyConstructor();
console.log(checkPrototypeChain(instance)); // Output: 2