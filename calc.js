'use strict';
// JM, 07/26/2024

const buttons = document.querySelector('#calculator');
const display = document.querySelector('#display');
const operators = {
    plus: '+',
    minus: '-',
    multiply: 'x',
    divide: '÷',
};
const keys = [
    ...[...buttons.children]
    .map((elem) => elem.getAttribute('data-key'))
    .filter((key) => key !== null)
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
    return result.toString();
}

let updateText = function() {
    if (x === '') return '';
    if (operator === '') {
        return `${x}`;
    } else if (y === '') {
        return `${x} ${operators[operator]}`;
    }

    return displayText = `${x} ${operators[operator]} ${y}`;
}

buttons.focus();
display.textContent = updateText();

buttons.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.nodeName !== 'BUTTON') return;
    if (e.target.id[0] === '_') {
        if (operator === '') {
            if (x.length >= 10) return;
            x = `${x}${e.target.id[1]}`;
        } else {
            if (y.length >= 10) return;
            y = `${y}${e.target.id[1]}`;
        }
    } else if (x !== '') {
        switch (e.target.id) {
            case 'dec':
                if (operator === '') {
                    if (x.toString().includes('.')) break;
                    x = `${x}.`;
                } else {    
                    if (y.toString().includes('.')) break;
                    y = `${y}.`;
                }
                break;
            case 'clear':
                x = '';
                y = '';
                operator = '';
                break;
            case 'back':
                if (operator === '') {
                    x = x.slice(0, x.length - 1);
                } else if (y === '') {
                    operator = '';
                } else {
                    y = y.slice(0, y.length - 1);
                }
                break;
            case 'equals':
                if (y === '') {
                    break;
                } else {
                    x = parseFloat(x);
                    y = parseFloat(y);
                    x = equals(x, y, operator);
                    y = '';
                    operator = '';
                }
                break;
            default:
                if (operator === '') {
                    operator = e.target.id;
                } else if (y !== '') {
                    x = parseFloat(x);
                    y = parseFloat(y);
                    x = equals(x, y, operator);
                    y = '';
                    operator = e.target.id;
                }
        }
    }

    display.textContent = updateText();
});

document.querySelector('body').addEventListener('keydown', (e) => {
    if (!keys.includes(e.key)) return;

    let toBePressed = [...buttons.querySelectorAll(".button")].filter((node) => node.getAttribute('data-key') === e.key)[0];
    
    let mouseclick = new PointerEvent('click', {bubbles: true});
    toBePressed.dispatchEvent(mouseclick);
})