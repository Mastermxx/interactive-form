/******************************************
Treehouse FSJS Techdegree:
project 3 - Interactive Form
Script by Mark Reijgwart
I am aiming for a "Exceeds Expectations" grade.
If I don't get this grade I would like to redo it.
******************************************/

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
const checkboxErrorMessage = document.querySelector('[data-error]');
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

// ==================  T-SHIRT INFO =================
//  This is a requirement for exceed expectations
//  1. T Shirt Section - Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

const colorCircle = document.querySelector('.chosen-color');

// When the dropdown of the design is changed the color dropdown will show up.
designDropdown.addEventListener('change', function() {

    const selectedDesign = designDropdown.options[designDropdown.selectedIndex].value;
    const colorOptions = colorDropdown.options;

    // This switch statement will check which design is selected,
    // Based on the design selection it will show the colors available for the design and hide the others.
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
        // By default hide the color options and colored circle.
        default:
            colorSelection.style.display = 'none';
            colorCircle.style.backgroundColor = '#fff';
    }
});

// A little extra feature that I wanted to make.
// Based on the color selected in the color dropdown,
// it will show a color circle next to it with the chosen color
colorDropdown.addEventListener('change', function() {
    const selectedColor = colorDropdown.options[colorDropdown.selectedIndex].value;
    if (selectedColor !== 'default') colorCircle.style.backgroundColor = selectedColor;
    else colorCircle.style.backgroundColor = '#fff';
});

// ==================================================
// ====================  REGISTER ===================
// ==================================================

// Select all input checkboxes of the form and store them into an array.
const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
// By default set the total cost of the conferences on 0, to use it for calculations.
let totalCost = 0;

// Function to calculate the total price of the selected workshops.
// If checked add cost, else remove the cost.
function updateTotalCost(price, add) {
    if (add) totalCost = totalCost + parseInt(price);
    else totalCost = totalCost - parseInt(price);
    // Display the totalCost in the DOM
    totalCostDiv.textContent = totalCost;
};

for (let i = 0; i < checkboxes.length; i++) {
    // Store the current checkbox into an object and give them useful properties.
    const currentCheckbox = {
        name:    checkboxes[i].name,
        day:     checkboxes[i].getAttribute('data-day-and-time'),
        price:   checkboxes[i].getAttribute('data-cost'),
        checked: checkboxes[i].checked,
    };

    // Add a change event listener to the currect checkbox
    // In this listener, the price is calculated but also disabled.
    checkboxes[i].addEventListener('change', function(e) {

        const add = e.target.checked;
        const price = currentCheckbox.price;
        checkboxErrorMessage.style.display = 'none';
        updateTotalCost(price, add);

        checkboxes.forEach( checkbox => {
            // Check if the current checkbox contains the same date and time as other checkboxes.
            if (checkbox.getAttribute('data-day-and-time') === checkboxes[i].getAttribute('data-day-and-time')) {
                // Check if the checkbox is not the checked one, in that case 'disable it' and make it grey.
                if (checkbox !== e.target) {
                    checkbox.disabled = true;
                    checkbox.parentNode.style.color = '#ccc';
                    // If it is also checked, uncheck it, get the cost of the workshop and remove the price from the totalCost.
                    if (checkbox.checked) {
                        checkbox.checked = false;
                        const price = checkbox.getAttribute('data-cost')
                        updateTotalCost(price, false);
                    }
                    // Or if the checkbox isn't checked, disable it and reset the color to default.
                    else if (!e.target.checked) {
                        checkbox.disabled = false;
                        checkbox.parentNode.style.color = '';
                    }
                }
            }
        });
    });
};

// ==================================================
// ===============  PAYMENT INFO ====================
// ==================================================

// Be default show the Credit Card option & hide the 2 other payment options
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

// Based on the selection in the payment dropdown, show the correct payment option and hide the others.
// Here I used some Conditional (ternary) operators, which I prefer if everything stays readable.
paymentDropdown.addEventListener("change", function() {
    paypalDiv.style.display = paymentDropdown.value === 'paypal' ? 'inherit' : 'none';
    bitcoinDiv.style.display = paymentDropdown.value === 'bitcoin' ? 'inherit' : 'none';
    creditcardDiv.style.display = paymentDropdown.value === 'credit card' ? 'inherit' : 'none';
});

// ==================================================
// ========  VALIDATION & ERROR MESSAGES ============
// ==================================================

// Validation regular expressions, returns boolean.
const isValidUsername = (username) => /^[a-zA-Z\s]+$/.test(username);
// Validate email on (something + @ + something + . + something) example: 'dave@teamtreehouse.com'
const isValidEmail = (email) => /^[^@]+@[^@.]+.[a-z]+$/i.test(email);
// Validate Credit Card number - field should only accept a number between 13 and 16 digits.
const isValidCreditcard = (creditcard) => /^[0-9]{13,16}$/.test(creditcard);
// Validate Zip Code - field should accept a 5-digit number.
const isValidZipCode = (zipcode) => /^[0-9]{5}$/.test(zipcode);
// Validate CVV number - field should only accept a number that is exactly 3 digits long.
const isValidCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

// These are the error messages being used if the value of an input is incorrect.
const errorMessages = {
    name : 'Please make sure this contains a valid name',
    email : 'Please make sure this contains a valid email address',
    ccnum : 'Should only contain between 13 and 16 numbers',
    zip : 'Only 5 numbers allowed',
    cvv : 'Only 3 numbers allowed'
}

function showOrHideTip(show, element) {
  // show element when show is true, hide when false.
  element.style.display = show ? 'inherit' : 'none';
  // change the border into orange or green.
  element.nextElementSibling.style.borderColor = show ? 'orange' : '#4bc970';
  // get the name of the input and replace the 'user-' or '-' into nothing.
  const nameNoDashes = element.nextElementSibling.name.replace('user-', '').replace('-', '');
  // if the input value is empty show error message, 'This field can not be empty'.
  element.textContent = show ? element.nextElementSibling.value === '' ? 'This field can not be empty' : errorMessages[nameNoDashes] : ''
}

// If the validated element is not valid, show an error message.
const validate = (element, validator) => {
    const text = element.value;
    const valid = validator(text);
    const errorMessage = element.previousElementSibling;
    showOrHideTip(!valid, errorMessage);
};

//  This is a requirement for exceed expectations
//  2. Form provides at least one error message in real time, before the form is submitted.
//  3. Form provides at least one error message that changes depending on the error. I've created one if the input is empty.
// ========================================================================================
// Validate all the input fields on input, by getting the value of the input and check them with regex.
// Every input has it's own regex validation (element, validator).
nameInput.addEventListener('input', () => validate(nameInput, isValidUsername));
emailInput.addEventListener('input', () => validate(emailInput, isValidEmail));
ccInput.addEventListener('input', () => validate(ccInput, isValidCreditcard));
zipInput.addEventListener('input', () => validate(zipInput, isValidZipCode));
cvvInput.addEventListener('input', () => validate(cvvInput, isValidCVV));


// ==================================================
// =========  VALIDATION ON SUBMIT =================
// ==================================================

const allInputs = [
    {element: nameInput, validator: isValidUsername},
    {element: emailInput, validator: isValidEmail},
    {element: ccInput, validator: isValidCreditcard},
    {element: zipInput, validator: isValidZipCode},
    {element: cvvInput, validator: isValidCVV},
];

const resetForm = () => {
    // Select the form and reset it.
    document.querySelector("form").reset();
    // Get all the inputs and reset the styling.
    allInputs.forEach( input => {
        input.element.setAttribute('style', '');
    });

    // Get all the checkboxes, remove disabled, styling and checked.
    checkboxes.forEach( checkbox => {
        checkbox.parentNode.setAttribute('style', '');
        checkbox.disabled = false;
        checkbox.checked = false;
    });

    // Reset the totalCost to 0
    totalCost = 0;
    document.querySelector('[data-totalCost]').textContent = '0';

    // Hide the color selection, the color circle and the other job input.
    colorSelection.style.display = 'none';
    colorCircle.style.backgroundColor = '#fff';
    otherTitleInput.style.display = 'none';
}

registerButton.addEventListener('click', function(event) {
    // Prevent the submit button from doing his normal thing.
    event.preventDefault();

    // If no checkbox is selected, provide error message: 'You need to register at least to one activity.'
    if (!checkboxes.filter(checkbox => checkbox.checked).length) checkboxErrorMessage.style.display = 'inherit';
    else checkboxErrorMessage.style.display = 'none';

    for (let i = 0; i < allInputs.length; i++) {
        // If the selected payment option is not 'credit card' don't validate those fields.
        if (i > 1 && paymentDropdown.value !== 'credit card') break;

        const currentInput = allInputs[i];
        const currentValue = currentInput.element.value; // input value
        const currentValidator = currentInput.validator; // regex validator
        const inputIsValid = currentValidator(currentValue); // validate

        // If an input is not valid on submit.
        if (!inputIsValid) {
            allInputs.forEach( input => {
                // Check all input fields and provide error messaging.
                validate(input.element, input.validator);
            });
            return;
        }
    }

    /// Submit form
    console.log('Submitted - All is OK!');
    // Use the function resetForm, to set everything back to default after submit is success.
    resetForm();

});
