function filterFalsyValues(values) {
    if (!Array.isArray(values)) {
        return [];
    }
    return values.filter(Boolean); // same as values.filter(value => Boolean(value));
}

console.log(filterFalsyValues([0, 1, "", "hello", null, undefined, false, 42]));
// Output: [1, "hello", 42]