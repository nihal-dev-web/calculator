var ans = document.getElementById("ans");
var calc = document.getElementById("equal");
var Add = document.getElementById("Add");
var Sub = document.getElementById("Subtraction");
var Mul = document.getElementById("Multiplication");
var Div = document.getElementById("Division");
var Mod = document.getElementById("Modulo");

var zero = document.getElementById("zero");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");
var dot = document.getElementById("dot");
var opn_bracket = document.getElementById("opn_braket");
var cls_bracket = document.getElementById("cls_braket");

calc.addEventListener("click", Calc);
Add.addEventListener("click", add);
Sub.addEventListener("click", sub);
Mul.addEventListener("click", mul);
Div.addEventListener("click", div);
Mod.addEventListener("click", mod);
opn_bracket.addEventListener("click", Opn_braket);
cls_bracket.addEventListener("click", Cls_braket);

zero.addEventListener("click", Zero);
one.addEventListener("click", One);
two.addEventListener("click", Two);
three.addEventListener("click", Three);
four.addEventListener("click", Four);
five.addEventListener("click", Five);
six.addEventListener("click", Six);
seven.addEventListener("click", Seven);
eight.addEventListener("click", Eight);
nine.addEventListener("click", Nine);
dot.addEventListener("click", Dot);

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
}

document.getElementById("expression").addEventListener("click", function (event) {
    if (isMobileDevice()) {
        event.preventDefault(); // Prevent default focus behavior
        this.blur(); // Remove focus to stop the keyboard from opening
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let history = localStorage.getItem("calcHistory") || "No history available"; 
    let historyContainer = document.querySelector(".history-container");

    document.querySelector(".history-list").innerText = history;
    
    historyContainer.style.display = "none";

    if (!isMobileDevice()) {
        setTimeout(() => {
            document.getElementById("expression").focus();
        }, 100);
    }
});

document.getElementById("history-btn").addEventListener("click", () => {
    let historyDiv = document.querySelector(".history-container");
    
    if (historyDiv.style.display === "none" || historyDiv.style.display === "") {
        historyDiv.style.display = "block";
    } else {
        historyDiv.style.display = "none";
    }
});

document.getElementById("clear-history-btn").addEventListener("click", () => {
    localStorage.clear();
    let history = localStorage.getItem("calcHistory") || "No history available"; 
    document.querySelector(".history-list").innerText = history;
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let expression = document.getElementById("expression").value.trim();
        if (/[^0-9+\-*/%().\s]/.test(expression)) {
            alert("Invalid input: Only numbers and operators (+, -, *, /, %, (, )) are allowed.");
            document.getElementById("expression").value = 0;
            document.getElementById("expression").focus();
            return;
        }

        if (!expression) return;

        let result = eval(expression);
        document.getElementById("ans").value = result.toFixed(2);

        let history = localStorage.getItem("calcHistory");
        let newEntry = `${expression} = ${result.toFixed(2)}`;

        if (history) {
            let historyArray = history.split("\n");
            if (historyArray.includes(newEntry)) return;
            history = history + "\n" + newEntry;
        } else {
            history = newEntry;
        }

        localStorage.setItem("calcHistory", history);
        document.querySelector(".history-list").innerText = history;
    }
});

function Calc() {
    var a = document.getElementById("expression").value.trim();

    if (/[^0-9+\-*/%().\s]/.test(a)) {
        alert("Invalid input: Only numbers and operators (+, -, *, /, %, (, )) are allowed.");
        document.getElementById("expression").value = 0;
        document.getElementById("expression").focus();
        return;
    }

    if (!a) return;

    var res = eval(a);
    ans.value = res.toFixed(2);

    let history = localStorage.getItem("calcHistory");
    let newEntry = `${a} = ${res.toFixed(2)}`;

    if (history) {
        let historyArray = history.split("\n");
        if (historyArray.includes(newEntry)) return;
        history = history + "\n" + newEntry;
    } else {
        history = newEntry;
    }

    localStorage.setItem("calcHistory", history);
    document.querySelector(".history-list").innerText = history;
}

function Zero() { num("0"); }
function One() { num("1"); }
function Two() { num("2"); }
function Three() { num("3"); }
function Four() { num("4"); }
function Five() { num("5"); }
function Six() { num("6"); }
function Seven() { num("7"); }
function Eight() { num("8"); }
function Nine() { num("9"); }
function Dot() { num("."); }

function add() { document.getElementById("expression").value += "+"; }
function sub() { document.getElementById("expression").value += "-"; }
function mul() { document.getElementById("expression").value += "*"; }
function div() { document.getElementById("expression").value += "/"; }
function mod() { document.getElementById("expression").value += "%"; }
function Opn_braket() { document.getElementById("expression").value += "("; }
function Cls_braket() { document.getElementById("expression").value += ")"; }

function num(numb) {
    var expression = document.getElementById("expression");
    expression.value += numb;
}

document.getElementById("mode-toggle").addEventListener("click", function () {
    const body = document.body;
    body.classList.toggle("light-mode");
    this.classList.toggle("light");

    if (body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        this.textContent = "🌞 Light Mode";
    } else {
        localStorage.setItem("theme", "dark");
        this.textContent = "🌙 Dark Mode";
    }
});

document.getElementById("allclear").addEventListener("click", () => {
    document.getElementById("expression").value = "";
    document.getElementById("ans").value = "0";
    if (!isMobileDevice()) {
        setTimeout(() => {
            document.getElementById("expression").focus();
        }, 100);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
        document.getElementById("expression").value = "";
        document.getElementById("ans").value = "0";
        if (!isMobileDevice()) {
            setTimeout(() => {
                document.getElementById("expression").focus();
            }, 100);
        }
    }
});