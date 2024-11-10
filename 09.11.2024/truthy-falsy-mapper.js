function mapToBoolean(values) {
    if (!Array.isArray(values)) {
        return [];
    }
    return values.map(Boolean); // same as values.map(value => Boolean(value));
}

console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []]));
// Output: [false, true, false, false, true, true, true]