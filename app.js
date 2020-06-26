/***********************  A doctrK Development  ********************************/

//Retrieves the set of previous values
function getHistory() {
    return document.getElementById("history-value").innerText;
}
//Prints the set of previous values on the display
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
//Retrieves the current output value
function getOutput() {
    return document.getElementById("output-value").innerText;
}
//Prints the current output value on the display. 
function printOutput(num) {
    //If the value is empty, it just prints the empty value to the screen. Otherwise it prints
    //a value formatted by commas.
    if(num =="") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = formatNum(num);
    }
}
//Adds comma seperation to the input numerical value, and returns it as string
function formatNum (num) {
    if(num=="-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
//Removes number formatting of an input value and returns the raw numerical value
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

//Assigning the input values from the operator class to the variable 'operator'
var operator = document.getElementsByClassName("operator");
//For every click on an operator element
for (var i=0; i<operator.length; i++) {
    operator[i].addEventListener('click',function() {
        if(this.id=="clear") {
            printHistory("");
            printOutput("");
        }
        else if (this.id=="backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else {
            var output = getOutput();
            var history = getHistory();
            if (output == "" && history != "") {
                if(isNaN(history[history.length-1])) {
                    history = history.substr(0,history.length-1);
                }
            }
            if(output != "" || history != "") {
                output = output == ""?
                output: reverseNumberFormat(output);
                history = history + output;
                if (this.id == "=") {
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}
//Assigning the input values from the number class to the variable 'number'
var number = document.getElementsByClassName("number");

for (var i=0; i<number.length; i++) {
    number[i].addEventListener('click',function() {
        var output=reverseNumberFormat(getOutput());
        if (output != NaN) {
            output=output+this.id;
            printOutput(output);
        }
    });
}

//For every click 
