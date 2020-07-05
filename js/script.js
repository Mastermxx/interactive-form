// Basic Info Selectors
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const titleDropdown = document.getElementById('title');
const otherTitleInput = document.getElementById('other-title');

// T-Shirt Info Selectors
const sizeDropdown = document.getElementById('size');
const designDropdown = document.getElementById('design');
const colorSelection = document.getElementById('colors-js-puns');
const colorDropdown = document.getElementById('color');

// Register for Activities Selectors
// const mainConference = document.querySelectorAll('[data-day-and-time]');
const allCheckboxes = document.querySelectorAll('[data-cost]');

// Payment Info Selectors
const paymentDropdown = document.getElementById('payment');
const ccInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const expDateDropdown = document.getElementById('exp-month');
const expYearDropdown = document.getElementById('exp-year');


// ==================================================
// ================  DEFAULT SETTINGS ===============
// ==================================================

// * Default form settings
nameInput.focus(); // Start in the first input field of the form, user-friendly
otherTitleInput.style.display = 'none'; // By default hide the input for an other job title
// colorDropdown.style.display = 'none' // By default hide the color options


colorSelection.style.display = 'none';

// ==================================================
// ===================  BASIC INFO ==================
// ==================================================

// If the user selects 'Other' by the 'Job Role' dropdown, show an input field with 'Your Job Role'
titleDropdown.addEventListener('change', function() {
    if (titleDropdown.options[titleDropdown.selectedIndex].value === 'other') otherTitleInput.style.display = 'inline-block';
    else otherTitleInput.style.display = 'none';
});


// ==================================================
// ==================  T-SHIRT INFO =================
// ==================================================

designDropdown.addEventListener('change', function() {

    const selectedDesign = designDropdown.options[designDropdown.selectedIndex].value;
    const selectedColor = colorDropdown.options[colorDropdown.selectedIndex].value;


    switch(selectedDesign) {
        case 'js puns':
            console.log('JS puns selected')
            colorSelection.style.display = 'block'
            colorDropdown.options[1].style.display = 'block'
            colorDropdown.options[2].style.display = 'block'
            colorDropdown.options[3].style.display = 'block'
            colorDropdown.options[4].style.display = 'none'
            colorDropdown.options[5].style.display = 'none'
            colorDropdown.options[6].style.display = 'none'
            break;
        case 'heart js':
            console.log('I <3 JS selected')
            colorSelection.style.display = 'block'
            colorDropdown.options[1].style.display = 'none'
            colorDropdown.options[2].style.display = 'none'
            colorDropdown.options[3].style.display = 'none'
            colorDropdown.options[4].style.display = 'block'
            colorDropdown.options[5].style.display = 'block'
            colorDropdown.options[6].style.display = 'block'
            break;
        default:
            console.log('default')
            colorDropdown.style.display = 'none'

    }
})


// ==================================================
// ====================  REGISTER ===================
// ==================================================


let checkboxes = [];

const allInputs = document.getElementsByTagName("input");
for (let i = 0; i < allInputs.length; i++) {
    currentInput = allInputs[i];
    if (currentInput.type === 'checkbox')
        checkboxes.push(currentInput)
}

console.log(checkboxes[0].attributes[2].value)

for (let i = 0; i < checkboxes.length; i++) {
    console.log(checkboxes[i].attributes[2].value)
}

// checkboxes[0].addEventListener('click', function(e) {
//     console.log(e.target.attributes);
// });

for (let i = 0; i < checkboxes.length; i++) {
    let currentCheckbox = checkboxes[i]
    currentCheckbox.addEventListener('click', function(e) {
        console.log(e.target.attributes);
    });
}



// Credit Card field should only accept a number between 13 and 16 digits.

// The Zip Code field should accept a 5-digit number.

// The CVV should only accept a number that is exactly 3 digits long.



// ==================================================
// =========  VALIDATION & TOOLTIPS =================
// ==================================================

function isValidUsername(username) {
  return /^[a-z]+$/.test(username);
}

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.previousElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

nameInput.addEventListener("input", createListener(isValidUsername));
emailInput.addEventListener("input", createListener(isValidUsername));


//

nameInput.style.backgroundColor = '#ff5a5a'
emailInput.style.backgroundColor = '#ff5a5a'
titleDropdown.style.backgroundColor = '#ff5a5a'
otherTitleInput.style.backgroundColor = '#ff5a5a'
console.log(`NAME: ${nameInput.value}`);
console.log(`EMAIL ${emailInput.value}`);
console.log(`OTHER JOB: ${otherTitleInput.value}`);

sizeDropdown.style.backgroundColor = '#ff5a5a'
// designDropdown.style.backgroundColor = 'red'
colorDropdown.style.backgroundColor = '#ff5a5a'
console.log(`SIZE: ${sizeDropdown.value}`);
console.log(`DESIGN: ${designDropdown.value}`);
console.log(`COLOR: ${colorDropdown.value}`);

paymentDropdown.style.backgroundColor = '#ff5a5a'
ccInput.style.backgroundColor = '#ff5a5a'
zipInput.style.backgroundColor = '#ff5a5a'
cvvInput.style.backgroundColor = '#ff5a5a'
expDateDropdown.style.backgroundColor = '#ff5a5a'
expYearDropdown.style.backgroundColor = '#ff5a5a'
console.log(`PAYMENT METHOD: ${paymentDropdown.value}`);
console.log(`CARD NUMBER: ${ccInput.value}`);
console.log(`ZIP CODE: ${zipInput.value}`);
console.log(`CVV: ${cvvInput.value}`);
console.log(`EXP DATE: ${expDateDropdown.value}`);
console.log(`EXP YEAR: ${expYearDropdown.value}`);
