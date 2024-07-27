'use strict';
// JM, 07/26/2024

const buttons = document.querySelector('#calculator');
const display = document.querySelector('#display');
const operators = [
    '+',
    '-',
    'x',

];

let x = '';
let y = '';
let operator = '';
let result = 0;
let displayText = '';

let add = function(x, y) {
    return x + y;
}

let subtract = function(x, y) {
    return x - y;
}

let multiply = function(x, y) {
    return x * y;
}

let divide = function(x, y) {
    if (y === 0) return 'Nuh-uh-uh!';
    return x / y;
}

let equals = function(x, y, operator) {
    let result;
    switch (operator) {
        case 'plus':
            result = add(x, y);
            break;
        case 'minus':
            result = subtract(x, y);
            break;
        case 'multiply':
            result = multiply(x, y);
            break;
        case 'divide':
            result = divide(x, y);
            break;
        default:
            return 'ERROR: No operator defined.';
    }
    return result;
}

let updateText = function() {
    if (x === '') return '';
    if (operator === '') {
        return `${x}`;
    } else if (y === '') {
        return `${x} ${operator}`;
    }
    
    console.table(x, y, operator);

    return displayText = `${x} ${operator} ${y}`;
}

buttons.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') return;

    if (e.target.id[0] === '_') {
        if (operator === '') {
            x = Number(`${x}${e.target.id[1]}`);
        } else {
            y = Number(`${y}${e.target.id[1]}`);
        }
    } else if (x !== '') {
        switch (e.target.id) {
            case "dec":

                break;
            case "clear":
                x = '';
                y = '';
                operator = '';
                break;
            case "back":
                if (operator === '') {
                    x = x.toString();
                    x = Number(x.slice(0, x.length - 1));
                } else {
                    y = y.toString();
                    y = Number(y.slice(0, y.length - 1));
                }
                break;
            case 'equals':
                if (y === '') {
                    break;
                } else {
                    x = equals(x, y, operator);
                    y = '';
                    operator = '';
                }
            break;
            default:
                if (operator === '') {
                    operator = e.target.id;
                } else if (y !== '') {
                    x = equals(x, y, operator);
                    y = '';
                    operator = e.target.id;
                }
        }
    }

    display.textContent = updateText();
});