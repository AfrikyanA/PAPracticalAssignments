function analyzeSparseArray(arr) {
    if (!Array.isArray(arr)) {
        return -1;
    }
    let elementsCount = 0;
    let undefinedCount = 0;
    let nullCount = 0;
    arr.forEach(element => {
        if (element === undefined) {
            ++undefinedCount;
        } else if (element === null) {
            ++nullCount;
        } else {
            ++elementsCount;
        }
    });
    let missingElementsCount = arr.length - (elementsCount + undefinedCount + nullCount);

    console.log(`Elements count: ${elementsCount}`);
    console.log(`Undefined count: ${undefinedCount}`);
    console.log(`Null count: ${nullCount}`);
    console.log(`Missing elements count: ${missingElementsCount}`);
}

let arr = [1, 2, 3, undefined, null, 6, , , null, undefined];
console.log(analyzeSparseArray(arr));
// Output:
// Elements count: 4
// Undefined count: 2
// Null count: 2
// Missing elements count: 2
// undefined