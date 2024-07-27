"use strict";
// JM, 07/26/2024

let x = 0;
let y = 0;
let operator = 0;
let result = 0;

let add = (x, y) => {
    return x + y;
}

let subtract = (x, y) => {
    return x - y;
}

let multiply = (x, y) => {
    return x * y;
}

let divide = (x, y) => {
    if (y === 0) return "Nuh-uh-uh!";
    return x / y;
}

let equals = (x, y, operator) => {
    switch (operator) {
        case "plus":
            return add(x, y);
        case "minus":
            return subtract(x, y);
        case "multiply":
            return multiply(x, y);
        case "divide":
            return divide(x, y);
        default:
            return "ERROR: No operator defined.";
    }
}

console.log(equals(0, 0, "divide"));