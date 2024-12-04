let customInstanceOf = (obj, constructor) => {
    if (obj == null || typeof obj != 'object') {
        return false;
    }

    let proto = Object.getPrototypeOf(obj);
    while (proto != null) {
        if (proto == constructor.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};


class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(customInstanceOf(dog, Dog));     // true
console.log(customInstanceOf(dog, Animal));  // true
console.log(customInstanceOf(dog, Array));   // false