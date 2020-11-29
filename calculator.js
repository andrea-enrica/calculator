var num1str = "";
var num2str = "";
var readOperator = "";
var intermediateResult = 0;
var isIntermediateResultPresent = false;
var existPoint = false;
var countOperator = 0;
var countPoint = 0;

const digits = document.querySelectorAll('.digit').forEach(item => {
    item.addEventListener('click', event => {
        itemString = item.innerText;
        //doesn't allow entering multiple points decimals
        if (itemString === "." && countPoint !== 0) {
            return;
        } else if(itemString === "." && countPoint === 0) {
            countPoint++;
            storeVariable(itemString);
            display(num1str);
        } else {
            storeVariable(itemString);
            display(num1str);
        }
    });
});

const operators = document.querySelectorAll('.operator').forEach(item => {
    item.addEventListener('click', event => {
        countPoint=0;
        //doesn't allow entering first an operator
        if (num1str != "") {
        itemOperator = item.innerText;
        } else {
            return;
        }
        //first operator
        if (countOperator === 0) {
            num2str = num1str;
            storeOperator(itemOperator);
            display(readOperator);
            num1str = ""; 

        //every other operator
        } else {
            isIntermediateResultPresent = true;
            intermediateResult = operate(num2str, readOperator, num1str);
            secondaryDisplay(num2str, readOperator, num1str);
            num2str = intermediateResult;
            storeOperator(itemOperator);
            display(readOperator);
            intermediateResult = "";
            num1str = "";
        }
        countOperator++;
    });
});

const equal = document.getElementById('equal').addEventListener('click', event => {
    if (num2str != "" && readOperator != "") {
        if (num2str == "Math Error!" || (num2str != "" && readOperator !="%" && num1str === "")) {
            secondaryDisplay(" ", " ", " ");
            display("Math Error!");
        } else {
            intermediateResult = operate(num2str, readOperator, num1str);
            secondaryDisplay(num2str, readOperator, num1str);
            num2str = intermediateResult;
            display(intermediateResult);
        }
    //empty variables
    clearDisplay();
    } 
    secondaryDisplay(" "," "," ",);
});

const clear =  document.getElementById('clear').addEventListener('click', event => {
    clearDisplay();
    secondaryDisplay(" "," "," ",);
    display(" ");
});

const back = document.getElementById('backspace').addEventListener('click', event => {
    var newNum1str = num1str.slice(0, -1);
    num1str = newNum1str;
    countPoint = 0;
    display(num1str);
})

//operational functions
function adding(num1, num2) {return num1 + num2;} 
function subtracting(num1, num2) {return num1 - num2;}
function multiplying(num1, num2) {return num1 * num2;}
function dividing(num1, num2) {return num1/num2;}
function exponential(num1, num2) {return num1**num2;}
function percentage(num1) {return num1/100;}
function operate(num1, operator, num2) {
    let result;
    let resultStr;
    if (typeof(num1) != "number" && typeof(num2) != "number") {
        num1Float = parseFloat(num1);
        num2Float = parseFloat(num2);
        switch(true) {
            case operator === "+":
                result = adding(num1Float, num2Float);
                resultStr = result.toString();
                return resultStr;
            break;
            case operator === "-":
                result = subtracting(num1Float, num2Float);
                resultStr = result.toString();
                return resultStr;
            break;
            case operator === "*":
                result = multiplying(num1Float, num2Float);
                resultStr = result.toString();
                return resultStr;
            break;
            case operator === "/":
                if (num2Float == 0) {
                    resultStr = "Math Error!";
                } else {
                result = dividing(num1Float, num2Float);
                resultStr = result.toString();
                }
                return resultStr;
            break;
            case operator === "^":
                result = exponential(num1Float, num2Float);
                resultStr = result.toString();
                return resultStr;
            break;
            case operator === "%":
                result = percentage(num1Float);
                resultStr = result.toString();
                return resultStr;
            break;
        }
    }
}

//helping functions
function storeVariable(stringValue) {
    if (stringValue === "+/-"){ 
        if (num1str !== "") {
            var stringArray = num1str.split('');
            stringArray.unshift('-');
            var newString = stringArray.join('');
            num1str = newString; 
        }
        else {
            stringValue = "-";
            num1str = stringValue;
        }
    } else if (!intermediateResult) {
        var firstDigit = stringValue;
        num1str += firstDigit;
    }   
}

function storeOperator(operator) {readOperator=operator;}

function display(displayValue) {document.querySelector('.main-display').innerText=displayValue;}
function secondaryDisplay(value1, value2, value3) {document.querySelector('.second-display').innerText=value1.concat(value2, value3);}

function clearDisplay() {
    countPoint = 0;
    countOperator = 0;
    intermediateResult = 0;
    isIntermediateResultPresent = false;
    existPoint = false;
    num1str = "";
    num2str = "";
    readOperator = "";
}