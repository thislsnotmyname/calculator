'use strict';
// JM, 07/29/2024

const body = document.querySelector('body');
const buttons = document.querySelector('#calculator');
const display = document.querySelector('#display');

const xDisplay = document.querySelector('#x');
const operatorDisplay = document.querySelector('#operator');
const yDisplay = document.querySelector('#y');

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
    if (x === '') {
        xDisplay.textContent = '';
        operatorDisplay.textContent = '';
        yDisplay.textContent = '';
        return displayText = '';
    } else if (operator === '') {
        xDisplay.textContent = '';
        operatorDisplay.textContent = '';
        yDisplay.textContent = x;
        return displayText = `${x}`;
    } else if (y === '') {
        xDisplay.textContent = x;
        operatorDisplay.textContent = operators[operator];
        yDisplay.textContent = '';
        return displayText = `${x} ${operators[operator]}`;
    }
    
    xDisplay.textContent = x;
    operatorDisplay.textContent = operators[operator];
    yDisplay.textContent = y;
    return displayText = `${x} ${operators[operator]} ${y}`;
}

buttons.focus();
updateText();

buttons.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') return;

    if (e.target.id[0] === '_') {
        if (operator === '') {
            if (x.length >= 17) return;
            x = `${x}${e.target.id[1]}`;
        } else {
            if (y.length >= 17) return;
            y = `${y}${e.target.id[1]}`;
        }
    } else if (x !== '') {
        switch (e.target.id) {
            case 'dec':
                if (operator === '') {
                    if (x.includes('.')) break;
                    x = `${x}.`;
                } else {    
                    if (y.includes('.')) break;
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

    updateText();
});

body.addEventListener('keydown', (e) => {
    if (!keys.includes(e.key)) return;

    const toBePressed = [...buttons.querySelectorAll('.button')].filter((node) => node.getAttribute('data-key') === e.key)[0];
    
    document.querySelector(`#${toBePressed.id}`).classList.toggle('clicked');

    let mouseclick = new PointerEvent('click', {bubbles: true});
    toBePressed.dispatchEvent(mouseclick);
});

body.addEventListener('keyup', (e) => {
    if (!keys.includes(e.key)) return;

    const toBePressed = [...buttons.querySelectorAll('.button')].filter((node) => node.getAttribute('data-key') === e.key)[0];
    
    document.querySelector(`#${toBePressed.id}`).classList.toggle('clicked');
});