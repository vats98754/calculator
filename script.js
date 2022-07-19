// Core calculation functions of add, subtract, multiply, and divide
const add = function(a, b) {
    return a + b;
}
const subtract = function(a, b) {
    return a - b;
}
const multiply = function(a, b) {
    return (a) * (b);
}
const divide = function(a, b) {
    return (a) / (b);
}

// Exporting core calculation functions for Jest testing
module.exports = {
    add,
    subtract,
    multiply,
    divide
};