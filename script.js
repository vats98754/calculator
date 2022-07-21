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

const resultDisplay = function(usedKey) {
    // Checks if the very first calculation is being performed
    if (history.textContent === '') {
        history.textContent = `${currNum.textContent} ${btnValue} `;
        currNum.textContent = '';
        return;
    }
    // If it's beyond the first calculation
    firstNum = parseFloat(history.textContent.split(" ")[0]);
    secondNum = parseFloat(currNum.textContent);
    currNum.textContent = '';
    const result = operate(operatorQueue[0], firstNum, secondNum);
    operatorQueue.shift(0);
    if (usedKey === "="){
        history.textContent += `${secondNum} =`;
        currNum.textContent = result;
    } else {
        firstNum = currNum.textContent;
        currNum.textContent = '';
        history.textContent = `${result} ${btnValue} `;
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
let secondNum = 0;
let currOperator = '';
let btnValue;

// Add EventListener to each button to read its value
const btns = document.querySelectorAll('button');
const btnDecimal = document.querySelector('.decimal');
const btnEquals = document.querySelector('.equals');
const operatorQueue = [];
btns.forEach(btn => {
    btn.addEventListener('click', e => {
        btnValue = btn.textContent;
        if (operators[btnValue] !== undefined) {
            const operator = operators[btnValue];

            // Ensures '-' can be used to initiate the calculation (i.e. negative numbers work)
            if (currNum.textContent === '' && operator === '-'){
                currNum.textContent += operator;
            } 
            // Executes below if operator typed with preceding calculations/operands
            else if (currNum.textContent !== '') {
                operatorQueue.push(operator);
                resultDisplay(operator);
            }
        }
        // Checks non-operator button pressed
        else if (parseInt(btnValue) == btnValue) {
            currNum.textContent += btnValue;
        } else if (btnValue === 'AC') {
            currNum.textContent = '';
            history.textContent = '';
            firstNum = 0;
            secondNum = 1;
        } else if (btnValue === '=') {
            resultDisplay('=');
        } else if (btnValue === '.') {
            currNum.textContent += btnValue;
        } else if (btnValue === '⌫') {
            currNum.textContent = currNum.textContent.slice(0, -1);
        }

        // Disallows double usage of decimal in one number
        if (currNum.textContent.includes('.')) {
            btnDecimal.disabled = true;
        } else {
            btnDecimal.disabled = false;
        }
        if (operators[btnValue] !== undefined) {
            // Disallows equal sign after operator
            btnEquals.disabled = true;
        } else {
            // Allows equal sign after operator
            btnEquals.disabled = false;
        }
        firstNum = parseFloat(currNum.textContent);
    });
});

// // Exporting core calculation functions for Jest testing
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide
// };