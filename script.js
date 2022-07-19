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

// Function to perform calculation depending on input operator and two operands
const operate = function(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Invalid operator';
    }
}

const operators = {
    '+': '+',
    '-': '-',
    '×': '*',
    '÷': '/'
};

const history = document.querySelector('.history');
const currNum = document.querySelector('.current-num');
let firstNum = 0;
let secondNum = 1;
let currOperator = '+';

// Add EventListener to each button to read its value
const btns = document.querySelectorAll('button');
btns.forEach(btn => {
    btn.addEventListener('click', e => {
        const btnValue = btn.textContent;
        if (currNum.textContent.includes('.')) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
        if (operators[btnValue] !== undefined) {
            const operator = operators[btnValue];
            if (currNum.textContent === '' && operator === '-'){
                currNum.textContent += operator;
                history.textContent += `${firstNum} ${operator} `;
            } else if (currNum.textContent !== '') {
                currOperator = operator;
                firstNum = currNum.textContent;
                currNum.textContent = '';
                history.textContent += `${firstNum} ${operator} `;
            }
        } else if (parseInt(btnValue) == btnValue) {
            currNum.textContent += btnValue;
        } else if (btnValue === 'AC') {
            currNum.textContent = '';
            history.textContent = '';
            firstNum = 0;
            secondNum = 1;
        } else if (btnValue === '=') {
            firstNum = history.textContent.split(" ")[0];
            secondNum = currNum.textContent;
            currNum.textContent = '';
            history.textContent += `${secondNum} ${currOperator} =`;
            const result = operate(currOperator, firstNum, secondNum);
            currNum.textContent = result;
        } else if (btnValue === '.') {
            currNum.textContent += btnValue;
        } else if (btnValue === '⌫') {
            currNum.textContent = currNum.textContent.slice(0, -1);
        }
    });
});

// // Exporting core calculation functions for Jest testing
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide
// };