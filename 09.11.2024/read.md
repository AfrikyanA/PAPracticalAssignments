Practice Problems

Dynamic Property Access with in Operator

Write a function hasProperties that takes an object and an array of property paths (e.g., ["name", "address.city", "address.zip"]) and returns an object indicating whether each property exists. Use the in operator to check each path and account for nested objects. For example:

const user = { name: "Alice", address: { city: "Wonderland" } };
console.log(hasProperties(user, ["name", "address.city", "address.zip"]));
// Output: { name: true, "address.city": true, "address.zip": false }

Custom Deep Equality Checker
Implement a deepEqual function that takes two values and checks if they are deeply equal. This function should handle basic types, objects, arrays, and edge cases like null, undefined, and nested structures. Unlike == or ===, this function should recursively check object properties and array elements for equality. For example:

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(deepEqual(obj1, obj2)); // true

Falsy Filter
Write a function filterFalsyValues that takes an array and returns a new array with all falsy values removed. This function should consider values like false, 0, "", null, undefined, and NaN as falsy, but leave truthy values intact. For example:

console.log(filterFalsyValues([0, 1, "", "hello", null, undefined, false, 42]));
// Output: [1, "hello", 42]

Truthy/Falsy Mapper
Create a function mapToBoolean that accepts an array of values and maps each value to its boolean equivalent using !! or Boolean(). The function should return an array with the boolean values (true or false) for each element in the original array. This can help understand the truthiness of different values. For example:

console.log(mapToBoolean([0, "hello", "", NaN, 42, {}, []]));
// Output: [false, true, false, false, true, true, true]

Custom JSON Schema Validator
Write a validateSchema function that takes an object and a schema definition, validating that the object conforms to the schema. The schema can specify required properties, types (string, number, boolean, object, array), and logical conditions (e.g., minLength, maxLength for strings, min, max for numbers). For instance:

const schema = {
  name: { type: "string", minLength: 2 },
  age: { type: "number", min: 18 },
  isActive: { type: "boolean" },
  tags: { type: "array", itemType: "string" },
};
const obj = { name: "Alice", age: 25, isActive: true, tags: ["admin", "user"] };
console.log(validateSchema(obj, schema)); // Expected output: true
