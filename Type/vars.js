import { select, selectAll, charGenerator, lowercaseLetter, uppercaseLetter, digits, symbols, } from "./app.js";
// Vars
const prog = select(".length-changer__input__range"), lengthNum = select(".length-changer__length"), passwordDisplay = select(".copy-sec__password"), copy = select(".copy-sec__icon"), alert_box = select(".alert-box"), alert_box_message = select(".alert-box__message"), 
//  - - Checkboxes
checkbox_numbers = select("#numbers"), checkbox_symbols = select("#symbols"), checkbox_uppercase = select("#uppercase"), checkbox_lowercase = select("#lowercase"), 
//  - - Strength Bars
bar_1 = selectAll(".strength__bar"), 
// - - Generate Button
generateBtn = select(".generate-btn"), LOWERCASE = charGenerator(lowercaseLetter(), 20), UPPERCASE = charGenerator(uppercaseLetter(), 20), DIGITS = charGenerator(digits(), 20), SYMBOLS = charGenerator(symbols(), 20);
export { prog, lengthNum, passwordDisplay, copy, alert_box, alert_box_message, checkbox_numbers, checkbox_symbols, checkbox_uppercase, checkbox_lowercase, bar_1, generateBtn, LOWERCASE, UPPERCASE, DIGITS, SYMBOLS, };
