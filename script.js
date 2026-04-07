function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) return "Can't divide by zero!";
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") return add(a, b);
    if (operator === "-") return subtract(a, b);
    if (operator === "x") return multiply(a, b);
    if (operator === "÷") return divide(a, b);
}

let firstNumber = "";
let operator = null;
let justCalculated = false;

const display = document.querySelector("#display");
display.textContent = "0";

const digits = document.querySelectorAll(".digit");
digits.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (justCalculated) {
            display.textContent = value;
            justCalculated = false;
            return;
        }

        if (display.textContent === "0") {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
    button.addEventListener("click", () => {
        const currentDisplay = display.textContent;

        if (currentDisplay === "") {
            operator = button.textContent;
            return;
        }

        if (operator !== null && firstNumber !== "" && !justCalculated) {
            let result = operate(operator, Number(firstNumber), Number(currentDisplay));

            if (typeof result === "number") {
                result = parseFloat(result.toFixed(10));
            }

            display.textContent = result;
            firstNumber = String(result);
        } else {
            firstNumber = currentDisplay;
        }

        operator = button.textContent;
        justCalculated = true;
    });
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
    if (firstNumber === "" || operator === null || display.textContent === "") return;

    let secondNumber = display.textContent;
    let result = operate(operator, Number(firstNumber), Number(secondNumber));

    if (typeof result === "number") {
        result = parseFloat(result.toFixed(10));
    }

    display.textContent = result;
    firstNumber = "";
    operator = null;
    justCalculated = true;
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNumber = "";
    operator = null;
    justCalculated = false;
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1) || "0";
});


