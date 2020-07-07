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

/* ==================  T-SHIRT INFO =================
    This is a requirement for exceed expectations
    1. T Shirt Section - Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
*/
const colorCircle = document.querySelector('.chosen-color');

designDropdown.addEventListener('change', function() {

    const selectedDesign = designDropdown.options[designDropdown.selectedIndex].value;
    const colorOptions = colorDropdown.options;

    switch(selectedDesign) {
        case 'js puns':
            colorSelection.style.display = 'block';
            colorOptions[0].selected = true;
            colorOptions[1].style.display = 'block';
            colorOptions[2].style.display = 'block';
            colorOptions[3].style.display = 'block';
            colorOptions[4].style.display = 'none';
            colorOptions[5].style.display = 'none';
            colorOptions[6].style.display = 'none';
            colorCircle.style.backgroundColor = '#fff';
            break;
        case 'heart js':
            colorSelection.style.display = 'block';
            colorOptions[0].selected = true;
            colorOptions[1].style.display = 'none';
            colorOptions[2].style.display = 'none';
            colorOptions[3].style.display = 'none';
            colorOptions[4].style.display = 'block';
            colorOptions[5].style.display = 'block';
            colorOptions[6].style.display = 'block';
            colorCircle.style.backgroundColor = '#fff';
            break;
        default:
            colorSelection.style.display = 'none';
            colorCircle.style.backgroundColor = '#fff';
    }
});


colorDropdown.addEventListener('change', function() {
    const selectedColor = colorDropdown.options[colorDropdown.selectedIndex].value;
    if (selectedColor !== 'default') colorCircle.style.backgroundColor = selectedColor;
    else colorCircle.style.backgroundColor = '#fff';
});

// ==================================================
// ====================  REGISTER ===================
// ==================================================

const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
const checkboxArray = [];

let totalCost = 0;

function updateTotalCost(price, add) {
    if (add) totalCost = totalCost + parseInt(price);
    else totalCost = totalCost - parseInt(price);
    totalCostDiv.textContent = totalCost;
}

for (let i = 0; i < checkboxes.length; i++) {
    const currentCheckbox = {
        name:    checkboxes[i].name,
        day:     checkboxes[i].getAttribute('data-day-and-time'),
        price:   checkboxes[i].getAttribute('data-cost'),
        checked: checkboxes[i].checked,
    };
    checkboxArray.push(currentCheckbox);

    checkboxes[i].addEventListener('change', function(e) {
    const add = e.target.checked;
        const price = currentCheckbox.price;
        updateTotalCost(price, add);
    });
}

// ==================================================
// ===============  PAYMENT INFO ====================
// ==================================================

paymentDropdown.addEventListener("change", function() {
    paypalDiv.style.display = paymentDropdown.value === 'paypal' ? 'inherit' : 'none';
    bitcoinDiv.style.display = paymentDropdown.value === 'bitcoin' ? 'inherit' : 'none';
    creditcardDiv.style.display = paymentDropdown.value === 'credit card' ? 'inherit' : 'none';
});

// ==================================================
// =========  VALIDATION & TOOLTIPS =================
// ==================================================

/**
 * // The Zip Code field should accept a 5-digit number.
 * @param zipcode - 5-digit number
 * @returns {boolean}
*/
const isValidUsername = (username) => /^[a-zA-Z\s]+$/.test(username);
// Validate email on (something + @ + something + . + something) example: 'dave@teamtreehouse.com'
const isValidEmail = (email) => /^[0-9]{13,16}$/.test(email);
// Credit Card field should only accept a number between 13 and 16 digits.
const isValidCreditcard = (creditcard) => /^[0-9]{13,16}$/.test(creditcard);
// The Zip Code field should accept a 5-digit number.
const isValidZipCode = (zipcode) => /^[0-9]{5}$/.test(zipcode);
// The CVV should only accept a number that is exactly 3 digits long.
const isValidCVV = (cvv) => /^[0-9]{3}$/.test(cvv);



function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  element.style.display = show ? 'inherit' : 'none';
  element.nextElementSibling.style.borderColor = show ? 'orange' : '#4bc970';
}

const errors = {};

function createListener(element, validator) {
    validate(element, validator);
    const currentElementObj = element.name.replace('-', '');
    errors[currentElementObj] = !validator(element.value);
};

const validate = (element, validator) => {
    const text = element.value;
    const valid = validator(text);
    const tooltip = element.previousElementSibling;
    showOrHideTip(!valid, tooltip);
};

nameInput.addEventListener('input', () => createListener(nameInput, isValidUsername));
emailInput.addEventListener('input', () => createListener(emailInput, isValidEmail));
ccInput.addEventListener('input', () => createListener(ccInput, isValidCreditcard));
zipInput.addEventListener('input', () => createListener(zipInput, isValidZipCode));
cvvInput.addEventListener('input', () => createListener(cvvInput, isValidCVV));


// ==================================================
// =========  VALIDATION ON SUBMIT =================
// ==================================================

// Check if name is not null & valid
// check if email is not null & valid
// check if at least 1 checkbox is checked
// If "Credit Card" is the selected payment option,
// the three fields accept only numbers:
// a 13 to 16-digit credit card number,
// a 5-digit zip code,
// and 3-number CVV value.

registerButton.addEventListener('click', function(event) {
    event.preventDefault();



    const allInputs = [
        {element: nameInput, validator: isValidUsername},
        {element: emailInput, validator: isValidEmail},
        {element: ccInput, validator: isValidCreditcard}, //2
        {element: zipInput, validator: isValidZipCode}, // 3
        {element: cvvInput, validator: isValidCVV}, // 4
    ];

    for (let i = 0; i < allInputs.length; i++) {
        // if (i > 1 && paymentDropdown.value !== 'credit card') 
        const currentInput = allInputs[i];
        const currentValue = currentInput.element.value; // input value
        const currentValidator = currentInput.validator; // regex validator
        const inputIsValid = currentValidator(currentValue); // validate

        if (!inputIsValid) {
            allInputs.forEach( input => {
                validate(input.element, input.validator);
            });
            return;
        }
    }

    /// submit form
    console.log('All is OK!');
});
