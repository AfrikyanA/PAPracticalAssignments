function deepDiffChecker(obj1, obj2, sep = '') {
    if (typeof obj1 != 'object' || obj1 == null ||
        typeof obj2 != 'object' || obj2 == null) {

        return -1;
    }
    if (obj1 === obj2) {
        return;
    }

    for (let key in obj1) {
        if (!obj2.hasOwnProperty(key)) {
            console.log(`${sep}key '${key}' present in obj1 but missing in obj2.`);
        } else if (obj1[key] === null && obj2[key] === undefined) {
            console.log(`${sep}key '${key}' is null in obj1 and undefined in obj2.`);
        } else if (obj2[key] === null && obj1[key] === undefined) {
            console.log(`${sep}key '${key}' is null in obj2 and undefined in obj1.`);
        } else if (typeof obj1[key] == 'object' && obj1[key] !== null &&
                    typeof obj2[key] == 'object' && obj2[key] !== null) {
            console.log(`${key} {`);
            deepDiffChecker (obj1[key], obj2[key], '    ');
            console.log('}')
        }
    }
    for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            console.log(`${sep}key '${key}' present in obj2 but missing in obj1.`);
        }
    }
}

let obj1 = {
    a: null,
    b: undefined,
    c: 2,
    d: {
        e: null,
        f: 5
    }
};
let obj2 = {
    a: undefined,
    b: null,
    c: 2,
    d: {
        e: undefined,
        x: 10
    },
    g: 5
};
deepDiffChecker(obj1, obj2);
// Output:
// key 'a' is null in obj1 and undefined in obj2.
// key 'b' is null in obj2 and undefined in obj1.
// d {
//     key 'e' is null in obj1 and undefined in obj2.
//     key 'f' present in obj1 but missing in obj2.
//     key 'x' present in obj2 but missing in obj1.
// }
// key 'g' present in obj2 but missing in obj1.