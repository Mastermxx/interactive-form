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
// const checkboxes = document.querySelectorAll('[data-day-and-time]');
// const allCheckboxes = document.querySelectorAll('[data-cost]');
const totalCostDiv = document.querySelector('[data-totalCost]');


// Payment Info Selectors
const paymentDropdown = document.getElementById('payment');
const ccInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const expDateDropdown = document.getElementById('exp-month');
const expYearDropdown = document.getElementById('exp-year');

const creditcardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

// Register button
const registerButton = document.querySelector('button');


// ==================================================
// ================  DEFAULT SETTINGS ===============
// ==================================================


// * Default form settings
nameInput.focus(); // Start in the first input field of the form, user-friendly
otherTitleInput.style.display = 'none'; // By default hide the input for an other job title
colorSelection.style.display = 'none'; // By default hide the color options


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
/* This is a requiredment for exceed expectations
1. T Shirt Section
Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu. */


designDropdown.addEventListener('change', function() {

    const selectedDesign = designDropdown.options[designDropdown.selectedIndex].value;
    const selectedColor = colorDropdown.options[colorDropdown.selectedIndex].value;
    const colorOptions = colorDropdown.options;

    switch(selectedDesign) {
        case 'js puns':
            colorSelection.style.display = 'block'
            colorOptions[0].selected = 'true'
            colorOptions[1].style.display = 'block'
            colorOptions[2].style.display = 'block'
            colorOptions[3].style.display = 'block'
            colorOptions[4].style.display = 'none'
            colorOptions[5].style.display = 'none'
            colorOptions[6].style.display = 'none'
            break;
        case 'heart js':
            colorSelection.style.display = 'block'
            colorOptions[0].selected = 'true'
            colorOptions[1].style.display = 'none'
            colorOptions[2].style.display = 'none'
            colorOptions[3].style.display = 'none'
            colorOptions[4].style.display = 'block'
            colorOptions[5].style.display = 'block'
            colorOptions[6].style.display = 'block'
            break;
        default:
            colorSelection.style.display = 'none'
    }
})


colorDropdown.addEventListener('change', function() {

    const selectedColor = colorDropdown.options[colorDropdown.selectedIndex].value;
    const colorOptions = colorDropdown.options;
    const colorCircle = document.querySelector('.chosen-color')

    switch(selectedColor) {
        case selectedColor:
            colorCircle.style.backgroundColor = selectedColor;
            break;
        case 'Select a color':
            colorCircle.style.backgroundColor = '#fff';
            break;
        default:
            colorCircle.style.backgroundColor = '#fff';
    }
})


// ==================================================
// ====================  REGISTER ===================
// ==================================================


const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
let totalCost = 0;
const checkboxObjects = [];

for (let i = 0; i < checkboxes.length; i++) {
    const currentCheckbox = {
        name:    checkboxes[i].name,
        day:     checkboxes[i].getAttribute('data-day-and-time'),
        price:   checkboxes[i].getAttribute('data-cost'),
        checked: checkboxes[i].checked,
    };
    checkboxObjects.push(currentCheckbox);

    checkboxes[i].addEventListener('change', function(e) {
        checkboxObjects[i].checked = e.target.checked;

        if (checkboxObjects[i].checked === true) {
            totalCost = totalCost + parseInt(checkboxObjects[i].price);
        } else {
            totalCost = totalCost - parseInt(checkboxObjects[i].price);
        }

        totalCostDiv.textContent = totalCost;
    });
}


// ==================================================
// ===============  PAYMENT INFO ====================
// ==================================================


paymentDropdown.addEventListener("change", function() {

    switch(paymentDropdown.value) {
        case 'credit card':
            creditcardDiv.style.display = 'inherit'
            paypalDiv.style.display = 'none'
            bitcoinDiv.style.display = 'none'
            break;
        case 'paypal':
            creditcardDiv.style.display = 'none'
            paypalDiv.style.display = 'inherit'
            bitcoinDiv.style.display = 'none'
            break;
        case 'bitcoin':
            creditcardDiv.style.display = 'none'
            paypalDiv.style.display = 'none'
            bitcoinDiv.style.display = 'inherit'
            break;
        default:
            creditcardDiv.style.display = 'inherit'
            paypalDiv.style.display = 'none'
            bitcoinDiv.style.display = 'none'
    }

});


// ==================================================
// =========  VALIDATION & TOOLTIPS =================
// ==================================================


// Validate name on only letters and spaces.
function isValidUsername(username) {
  return /^[a-zA-Z\s]+$/.test(username);
}

// Validate email on (something + @ + something + . + something) example: 'dave@teamtreehouse.com'
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Credit Card field should only accept a number between 13 and 16 digits.
// NEEDS FIX
function isValidCreditcard(creditcard) {
    return /^[0-9]{13}$/.test(creditcard);
}

// The Zip Code field should accept a 5-digit number.
function isValidZipCode(zipcode) {
    return /^[0-9]{5}$/.test(zipcode);
}

// The CVV should only accept a number that is exactly 3 digits long.
function isValidCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}


function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = 'inherit';
    element.nextElementSibling.style.borderColor = 'orange'
  } else {
    element.style.display = 'none';
    element.nextElementSibling.style.borderColor = '#4bc970'
  }
}

const errors = {}

function createListener(validator) {
  return e => {

    const inputValue = e.target.value;
    const valid = validator(inputValue);
    const showTip = inputValue !== '' && !valid;
    const tooltip = e.target.previousElementSibling;
    const currentElement = e.target.name;
    showOrHideTip(showTip, tooltip);

    const currentElementObj = e.target.name.replace('-', '');
    if(valid) errors[currentElementObj] = true;
    else errors[currentElementObj] = false;
    console.log(currentElement)
  };
}


// Validation Basic Info
nameInput.addEventListener('input', createListener(isValidUsername));
emailInput.addEventListener('input', createListener(isValidEmail));
// Validation Payment Info
ccInput.addEventListener('input', createListener(isValidCreditcard));
zipInput.addEventListener('input', createListener(isValidZipCode));
cvvInput.addEventListener('input', createListener(isValidCVV));


// ==================================================
// =========  VALIDATION ON SUBMIT =================
// ==================================================


// registerButton

// Check if name is not null & valid
// check if email is not null & valid
// check if at least 1 checkbox is checked
// If "Credit Card" is the selected payment option,
// the three fields accept only numbers:
// a 13 to 16-digit credit card number,
// a 5-digit zip code,
// and 3-number CVV value.

// if all this is the case, you are able to submit


document.body.addEventListener('click', function() {
    console.log(errors)

    if( isValidUsername(nameInput.value) &&
        isValidEmail(emailInput.value) &&
        isValidCreditcard(ccInput.value) &&
        isValidZipCode(zipInput.value) &&
        isValidCVV(cvvInput.value)) {
            registerButton.disabled = false;
        }
});
//
//
registerButton.addEventListener('click', function() {
    event.preventDefault();
    const allInputs = [
        {element: nameInput, validator: isValidUsername},
        {element: emailInput, validator: isValidEmail},
        {element: ccInput, validator: isValidCreditcard},
        {element: zipInput, validator: isValidZipCode},
        {element: cvvInput, validator: isValidCVV},
    ];

    const validate = (el, validator) => {
        const text = el.value;
        const valid = validator(text);
        const tooltip = el.previousElementSibling;
        showOrHideTip(!valid, tooltip);
    };

    for(let i = 0; i < allInputs.length; i++){
        const currentInput = allInputs[i];
        const inputIsValid = currentInput.validator(currentInput.element.value)
        if(!inputIsValid){
            allInputs.forEach( input => {
                validate(input.element, input.validator);
            });
            return;
        }
    }

    /// submit form
    console.log('All is OK!');
})
