let evaluateTruthiness = (arr) => {
    if (arr == null) {
        return null;
    }

    let res = {
        truthy: [],
        falsy: [],
    };

    for (let el of arr) {
        if (el) {
            res.truthy.push(el);
        } else {
            res.falsy.push(el);
        }
    }
    return res;
};

console.log(evaluateTruthiness([0, 1, "", "hello", null, undefined, false, true, [], {}]));
// Output: { truthy: [1, "hello", true, [], {}], falsy: [0, "", null, undefined, false] }