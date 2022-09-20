// Vars
import { prog, lengthNum, passwordDisplay, copy, alert_box, alert_box_message, checkbox_numbers, checkbox_symbols, checkbox_uppercase, checkbox_lowercase, bar_1, generateBtn, LOWERCASE, UPPERCASE, DIGITS, SYMBOLS, } from "./vars.js";
// const prog = select(".length-changer__input__range") as HTMLInputElement,
//   lengthNum = select(".length-changer__length"),
//   passwordDisplay = select(".copy-sec__password") as HTMLHeadingElement,
//   copy = select(".copy-sec__icon"),
//   alert_box = select(".alert-box"),
//   alert_box_message = select(".alert-box__message"),
//   //  - - Checkboxes
//   checkbox_numbers = select("#numbers") as HTMLInputElement,
//   checkbox_symbols = select("#symbols") as HTMLInputElement,
//   checkbox_uppercase = select("#uppercase") as HTMLInputElement,
//   checkbox_lowercase = select("#lowercase") as HTMLInputElement,
//   //  - - Strength Bars
//   bar_1 = selectAll(".strength__bar"),
//   // - - Generate Button
//   generateBtn = select(".generate-btn"),
//   LOWERCASE = charGenerator(lowercaseLetter(), 20),
//   UPPERCASE = charGenerator(uppercaseLetter(), 20),
//   DIGITS = charGenerator(digits(), 20),
//   SYMBOLS = charGenerator(symbols(), 20);
// - - - - Functions
// - - DOM Query
console.log(prog);
function select(selector) {
    return document.querySelector(selector);
}
function selectAll(selector) {
    return document.querySelectorAll(selector);
}
// - - Copy Password to the user clipboard
function copyPassword() {
    const password = passwordDisplay.innerText;
    navigator.clipboard.writeText(password);
}
// - - Generates Password by options
function generatePassword() {
    const length = +lengthNum.textContent;
    const low_bol = checkbox_lowercase.checked, upp_bol = checkbox_uppercase.checked, dig_bol = checkbox_numbers.checked, symb_bol = checkbox_symbols.checked;
    try {
        if (low_bol || upp_bol || dig_bol || symb_bol) {
            let tempArr = checkArray(), randomPass = orderSwaper(tempArr), joinded = randomPass.slice(0, length).join("");
            strengthCheckProccess();
            showPass(joinded);
        }
        else {
            throw Error("you should choose at least one option");
        }
    }
    catch (err) {
        alert_box.classList.add("alert-box--reveal");
        alert_box_message.textContent = `${err}`;
        setTimeout(() => {
            alert_box.classList.remove("alert-box--reveal");
        }, 2000);
    }
}
//  - - Returns an array of digits
function digits() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
//  - - Returns an array of lowercase letters
function lowercaseLetter() {
    return [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
}
//  - - Returns an array of uppercase letters
function uppercaseLetter() {
    return [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];
}
//  - - Returns an array of symbols
function symbols() {
    return ["$", "_", "."];
}
//  - - return an array with checked values
function checkArray() {
    const low_bol = checkbox_lowercase.checked, upp_bol = checkbox_uppercase.checked, dig_bol = checkbox_numbers.checked, symb_bol = checkbox_symbols.checked, booleanArr = [low_bol, upp_bol, dig_bol, symb_bol], arrays = [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS], resultArr = [];
    for (let item in booleanArr) {
        if (booleanArr[item]) {
            resultArr.push(...arrays[item]);
        }
    }
    return resultArr;
}
//  - - Returns a random order of possible values
function orderSwaper(arr) {
    const reOrder = [], length = arr.length;
    for (let i = 0; i < length; ++i) {
        let item = arr[Math.floor(Math.random() * arr.length)], indexofItem = arr.indexOf(item);
        reOrder[i] = item;
        arr.splice(indexofItem, 1);
    }
    return reOrder;
}
//  - - Creates a password
function charGenerator(arr, length) {
    const randomArr = [];
    for (let i = 0; i < length; ++i) {
        let randomItem = arr[Math.floor(Math.random() * arr.length)];
        randomArr.push(randomItem);
    }
    return randomArr;
}
function strengthCheckProccess() {
    let truthyArr = truthyArrray(), strengthBar = 0, checks = 0;
    truthyArr.forEach((check) => {
        check && strengthBar++;
    });
    resetBar();
    if (+lengthNum.textContent < 8) {
        truthyArr.forEach((check) => {
            check && checks++;
        });
        if (checks > 1) {
            strengthBar--;
        }
    }
    barColor(strengthBar);
    strengthBarMessage(strengthBar);
}
// - - Defines the Bar message
function strengthBarMessage(bar) {
    let display = select(".strength__bar-message");
    switch (bar) {
        case 1:
            display.textContent = "Poor";
            break;
        case 2:
            display.textContent = "Medium";
            break;
        case 3:
            display.textContent = "Good";
            break;
        case 4:
            display.textContent = "Strong";
            break;
        default:
            display.textContent = "Generate";
            break;
    }
}
//  - - Displays the password to user
function showPass(value = "Empty") {
    passwordDisplay.textContent = value;
}
// - - Adds Bar color
function barColor(n) {
    for (let i = 0; i < n; ++i) {
        bar_1[i].classList.remove("strength__bar--no-bg");
    }
}
// - - Truthy array for checkboxes
function truthyArrray() {
    return [
        checkbox_uppercase.checked,
        checkbox_lowercase.checked,
        checkbox_numbers.checked,
        checkbox_symbols.checked,
    ];
}
//  - - Reset the bar
function resetBar() {
    bar_1.forEach((bar) => {
        bar.classList.add("strength__bar--no-bg");
    });
}
// - - - - Events
prog.addEventListener("input", () => {
    const max = +prog.max;
    const realValue = +prog.value;
    const value = (+prog.value / max) * 100;
    prog.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${value}%, #1a1a1a ${value}%, #1a1a1a 100%)`;
    lengthNum.textContent = `${realValue}`;
});
// - - Copy event
copy.addEventListener("click", copyPassword);
// - - Generate Button
generateBtn.addEventListener("click", () => {
    generatePassword();
});
export { select, selectAll, charGenerator, lowercaseLetter, uppercaseLetter, digits, symbols, };
