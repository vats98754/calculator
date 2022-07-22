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
    if (history.textContent === '' || prevEquals) {
        history.textContent = `${currNum.textContent} ${btnValue} `;
        currNum.textContent = '';
        prevEquals = false;
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
        operatorQueue = [];
        firstNum = result;
        prevEquals = true;
    } else {
        firstNum = currNum.textContent;
        currNum.textContent = '';
        history.textContent = `${result} ${btnValue} `;
        prevEquals = false;
    }
}

const keyToButton = function(e) {
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!map['16']){
        btn.click();
    }
}

// To detect and store two/multiple simultaneous key-presses
const map = {};
onkeydown = onkeyup = function(e) {
    map[e.keyCode] = e.type == 'keydown';
    let btn;
    if (map['16'] && map['8']) {
        btn = document.querySelector('button[data-key="AC"]');
    } else if (map['16'] && map['187']) {
        btn = document.querySelector('button[data-key="+"]');
    } else if (map['16'] && map['56']) {
        btn = document.querySelector('button[data-key="*"]');
    } else {
        return ;
    }
    btn.click();
}

// To match key-presses to their corresponding buttons and activate the latter when appropriate
window.addEventListener("keydown", keyToButton);

// Below object converts clicked operator's button value so it can be used in operate()
const operators = {
    '+': '+',
    '-': '-',
    '×': '*',
    '÷': '/'
};

// The below two lines select the 2 important display elements on calc-screen
const history = document.querySelector('.history'); // Shows previous calculations
const currNum = document.querySelector('.current-num'); // Shows current result

// The store the numbers and operator to pass into operate()
let firstNum = 0;
let secondNum = 0;
let btnValue; // made this global for access by resultDisplay() for when history empty/first calculation happens
let prevEquals = false; // to check if previous result was displayed using '=' button

// Add EventListener to each button to read its value
const btns = document.querySelectorAll('button');
const btnDecimal = document.querySelector('.decimal');
const btnEquals = document.querySelector('.equals');
let operatorQueue = [];
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
                if (prevEquals) {
                    console.log(currNum.textContent);
                }
                operatorQueue.push(operator);
                resultDisplay(operator);
            }
        }

        // Checks non-operator button pressed
        else if (parseInt(btnValue) == btnValue) { // If digit pressed, append to current number
            currNum.textContent += btnValue;
        } else if (btnValue === 'AC') { // If 'AC' pressed, clears everything and resets first and second nums
            currNum.textContent = '';
            history.textContent = '';
            firstNum = 0;
            secondNum = 1;
            operatorQueue = [];
        } else if (btnValue === '=') { // If '=' pressed, history shows expression, currNum shows its result
            resultDisplay('=');
            // prevEquals = true;
            // Disallows equal sign after equals
            btnEquals.disabled = true;
        } else if (btnValue === '.') {
            currNum.textContent += btnValue;
        } else if (btnValue === '⌫') { // Slices currNum such that last char is removed
            currNum.textContent = currNum.textContent.slice(0, -1);
        }

        // Disallows double usage of decimal in the same number
        if (currNum.textContent.includes('.')) {
            btnDecimal.disabled = true;
        } else {
            btnDecimal.disabled = false;
        }

        // Ensures that '=' can't be used after an operator
        if (operators[btnValue] !== undefined) {
            // Disallows equal sign after operator
            btnEquals.disabled = true;
        } else {
            // Allows equal sign after non-operator
            btnEquals.disabled = false;
        }
        // Gets the firstNum again
        firstNum = parseFloat(currNum.textContent);
    });
});

// // Exporting core calculation functions for Jest testing
// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide,
//     operate
// };