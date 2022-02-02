// ========== DOM ELEMENTS ==========

const containerForm = document.querySelector(".container-form");
const btnSignUp = document.querySelectorAll(".btn-signup");
const close = document.querySelector(".form-close");

// const form__datas = document.querySelectorAll(".form__data");

const fname = document.getElementById("first");
const lname = document.getElementById("last");
const emailInput = document.getElementById("email");
const dob = document.getElementById("birthdate");
const qty = document.getElementById("quantity");
const locationsInputs = document.getElementsByName("location");
const conditionsInput = document.getElementById("checkbox1");

const btnSubmit = document.querySelector(".btn-submit");

const successMessage = document.querySelector(".message");
const msgContent = document.querySelector(".message__content");
const btnClose = document.querySelector(".btn-close");
const closeCross = document.querySelector(".confirmation-close");

// ========== FUNCTIONS AND EVENTS ==========

// ---------- Navigation bar adaptation ----------

/**
 * Adapt navigation bar to responsive disposition
 */
function navBarResponsive() {
    var navigationBar = document.getElementById("header-container");
    if (navigationBar.className === "header-container") {
        navigationBar.className += " responsive";
    } else {
        navigationBar.className = "header-container";
    }
}



// ---------- Modal visibility ----------

/**
 * Modal launching
 */
function openForm() {
    containerForm.style.display = "block";
}

/**
 * Modal closing
 */
function closeForm() {
    containerForm.style.display = "none";
}

btnSignUp.forEach((btn) => btn.addEventListener("click", openForm));
close.addEventListener("click", closeForm);


// ---------- Modal submission ----------

/**
 * Show error message if input not valid
 * @param {Object} input - The given input
 * @param {string} message - The error message
 */
function showErrorMessage(input, message) {
    const form__data = input.parentElement;
    form__data.className = 'form__data error'
    const errorMessage = form__data.querySelector('.errorMessage');
    errorMessage.innerHTML = message;
    input.focus();
}

/**
 * Hide error message if input was not valid
 * @param {Object} input 
 */
function showSuccess(input) {
    const form__data = input.parentElement;
    form__data.className = 'form__data success';
    const errorMessage = form__data.querySelector('.errorMessage');
    errorMessage.innerHTML = '';
}

/**
 * Check if all inputs are valid
 * @returns {Boolean}
 */
function checkInputValidation() {

    let fields = {
        firstName: false,
        lastName: false,
        email: false,
        birthDate: false,
        tournamentsQuantity: false,
        location: false,
        conditions: false
    };

    // First name input
    const regexAsciiLetters = /[a-zA-Z]/;
    if (fname.value.length ===0) {
        showErrorMessage(fname, "Veuillez saisir votre prénom.");
    } else if (fname.value.length < 2) {
        showErrorMessage(fname, "Veuillez entrer minimum 2 caractères pour le prénom.");
    } else if (!regexAsciiLetters.test(fname.value)) {
        showErrorMessage(fname, "Veuillez entrer des caractères de A à Z.");
    } else {
        showSuccess(fname);
        fields.firstName = true;
    }

    // Last name input
    if (lname.value.length === 0) {
        showErrorMessage(lname, "Veuillez saisir votre nom.");
    }
    if (lname.value.length < 2) {
        showErrorMessage(lname, "Veuillez entrer minimum 2 caractères pour le nom.");
    } else if (regexAsciiLetters.test(lname.value) == false) {
        showErrorMessage(lname, "Veuillez entrer des caractères de A à Z.");
    } else {
        showSuccess(lname);
        fields.lastName = true;
    }

    // Email input
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput.value.length === 0) {
        showErrorMessage(emailInput, "Veuillez saisir votre adresse e-mail.");
    } else if (!regexEmail.test(emailInput.value)) {
        showErrorMessage(emailInput, "Veuillez saisir un e-mail valide.");
    } else {
        showSuccess(emailInput);
        fields.email = true;
    }

    // Birthdate input
    let todayDate = new Date();
    let dobDate = new Date(dob.value);
    if (dob.value == '') {
        showErrorMessage(dob, "Veuillez entrer votre date de naissance.");
    } else if (dobDate >= todayDate) {
        showErrorMessage(dob, "La date de naissance doit être antérieure à aujourd'hui.");
    } else {
        showSuccess(dob);
        fields.birthDate = true;
    }

    // Tournament quantity input
    if (qty.value.length === 0) {
        showErrorMessage(qty, "Veuillez saisir un nombre.");
    } else {
        showSuccess(qty, fields.tournamentsQuantity);
        fields.tournamentsQuantity = true;
    }

    // Location choice inputs
    let locationChecked = false;
    for (var i = 0; i < locationsInputs.length; i++) {
        if (locationsInputs[i].checked) {
            locationChecked = true;
            break;
        }
    }
    if (!locationChecked) {
        showErrorMessage(locationsInputs[0], "Veuillez choisir une ville.");
    } else {
        showSuccess(locationsInputs[0]);
        fields.location = true;
    }

    // Conditions checked input
    if (conditionsInput.checked === false) {
        showErrorMessage(conditionsInput, "Vous devez vérifier que vous acceptez les termes et conditions.");
    } else {
        showSuccess(conditionsInput);
        fields.conditions = true;
    }

    // Submit form if all fields are valid
    let fieldsValues = Object.values(fields);
    return !fieldsValues.includes(false);

    // if (fieldsValues.includes(false)) {
    //     return false;
    // }
    // if (!fieldsValues.includes(false) ) {
    //     return true;
    // }
}

/**
 * Launch registration confirmation if all inputs are valid
 */
function confirmMessage() {
    successMessage.style.display = "block";
}

// Event
btnSubmit.addEventListener("click", function(event) {
    event.preventDefault(); // Keep form informations if not valid
    if (checkInputValidation()) {
        closeForm();
        confirmMessage();
    }
});

// ---------- Registration visibility ----------

/**
 * Close registration confirmation when done
 */
function closeMessage() {
    // msgContent.classList.toggle('isClosed');
    // setTimeout(() => {
    //     msgContent.classList.remove('isClosed');
        successMessage.style.display = "none";
    // }, 800);
}

btnClose.addEventListener("click", closeMessage);
closeCross.addEventListener("click", closeMessage);





/*_____________________________________________*/
//  document addEventlistener submit, (e) => {
//     try {
//         e.preventDefault() // empecher reload de la page
        
//         document.querySelector('button').style.display = 'none'
        
//         // FORMDATA ne fonctionne que SI vous avez mis des attributs NAME sur les champs de formualire
//         const FD = new FormData(document.querySelector('form'))
        
//         console.log([...FD.entries()])
        
//         console.log(Object.fromEntries(FD.entries()))
        
//         } catch(error) {
//         console.warn(error)
//         }finally {
        
//         document.querySelector('button').style.display = 'block'
        
//         }
//         }
        