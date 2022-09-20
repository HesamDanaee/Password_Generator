// Imported Vars
import {
  prog,
  lengthNum,
  passwordDisplay,
  copy,
  alert_box,
  alert_box_message,
  checkbox_numbers,
  checkbox_symbols,
  checkbox_uppercase,
  checkbox_lowercase,
  bar_1,
  generateBtn,
  LOWERCASE,
  UPPERCASE,
  DIGITS,
  SYMBOLS,
} from "./vars.js";

// - - - - Functions

// - - DOM Query
console.log(prog);

function select(selector: string) {
  return document.querySelector(selector) as HTMLElement;
}

function selectAll(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<Element>;
}

// - - Copy Password to the user clipboard

function copyPassword() {
  const password = passwordDisplay.innerText;
  navigator.clipboard.writeText(password);
}

// - - Generates Password by options

function generatePassword() {
  const length = +lengthNum.textContent!;
  const low_bol = checkbox_lowercase.checked,
    upp_bol = checkbox_uppercase.checked,
    dig_bol = checkbox_numbers.checked,
    symb_bol = checkbox_symbols.checked;

  try {
    if (low_bol || upp_bol || dig_bol || symb_bol) {
      let tempArr: (string | number)[] = checkArray(),
        randomPass = orderSwaper(tempArr),
        joinded = randomPass.slice(0, length).join("");

      strengthCheckProccess();

      showPass(joinded);
    } else {
      throw Error("you should choose at least one option");
    }
  } catch (err) {
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
  const low_bol = checkbox_lowercase.checked,
    upp_bol = checkbox_uppercase.checked,
    dig_bol = checkbox_numbers.checked,
    symb_bol = checkbox_symbols.checked,
    booleanArr = [low_bol, upp_bol, dig_bol, symb_bol],
    arrays = [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS],
    resultArr: (string | number)[] = [];

  for (let item in booleanArr) {
    if (booleanArr[item]) {
      resultArr.push(...arrays[item]);
    }
  }

  return resultArr;
}

//  - - Returns a random order of possible values

function orderSwaper(arr: (string | number)[]) {
  const reOrder: (string | number)[] = [],
    length = arr.length;

  for (let i = 0; i < length; ++i) {
    let item = arr[Math.floor(Math.random() * arr.length)],
      indexofItem = arr.indexOf(item);

    reOrder[i] = item;

    arr.splice(indexofItem, 1);
  }

  return reOrder;
}

//  - - Creates a password

function charGenerator(arr: (string | number)[], length: number) {
  const randomArr: (string | number)[] = [];

  for (let i = 0; i < length; ++i) {
    let randomItem = arr[Math.floor(Math.random() * arr.length)];

    randomArr.push(randomItem);
  }
  return randomArr;
}

function strengthCheckProccess() {
  let truthyArr = truthyArrray(),
    strengthBar = 0,
    checks = 0;

  truthyArr.forEach((check) => {
    check && strengthBar++;
  });

  resetBar();

  if (+lengthNum.textContent! < 8) {
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

function strengthBarMessage(bar: number) {
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

function barColor(n: number) {
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

// - - - Export Functions

export {
  select,
  selectAll,
  charGenerator,
  lowercaseLetter,
  uppercaseLetter,
  digits,
  symbols,
};
