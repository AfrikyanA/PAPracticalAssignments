Problem Statement: Simulate Variable Hoisting Based on Declaration Types
You are tasked with writing a function that simulates the hoisting behavior of variable declarations in JavaScript. Specifically, the function will reorder a given set of variable declarations based on their hoisting priority:
var declarations have the highest priority.
let declarations have medium priority.
const declarations have the lowest priority.
Your goal is to simulate how JavaScript treats these different types of variable declarations during the hoisting phase and return the variable names in the correct hoisting order.

Instructions:
Input: You will receive an array of objects representing variable declarations. Each object contains:
A type property, which can be either 'var', 'let', or 'const'.
A name property, which is a string representing the variable name.

Output: Your function should return an array of the variable names, ordered according to their hoisting priority:
All var declarations should appear first, followed by let, and then const.

Example:
Input:
    const code = [
    { type: 'var', name: 'x' },
    { type: 'let', name: 'y' },
    { type: 'const', name: 'z' },
    { type: 'var', name: 'a' }
    ];
Output:
    ['x', 'a', 'y', 'z']

Requirements:
Write a function simulateHoisting(code) that takes an array of variable declarations and returns the variable names in the correct hoisting order.
You must use sorting to simulate the hoisting behavior, based on the following priority:
var > let > const.
