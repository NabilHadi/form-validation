const form = document.querySelector("form");

const emailInput = form.querySelector("input#email");
const countryInput = form.querySelector("input#country");
const zipCodeInput = form.querySelector("input#zip-code");
const passwordInput = form.querySelector("input#password");
const confirmPasswordInput = form.querySelector("input#confirm-password");

const emailRegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

emailInput.addEventListener("input", resetValidation);
countryInput.addEventListener("input", resetValidation);
zipCodeInput.addEventListener("input", resetValidation);
passwordInput.addEventListener("input", resetValidation);
confirmPasswordInput.addEventListener("input", resetValidation);

confirmPasswordInput.addEventListener("input", validatePasswordMatch);

emailInput.addEventListener("blur", validateEmailField);
countryInput.addEventListener("blur", validateEmptyField);
zipCodeInput.addEventListener("blur", validateEmptyField);
passwordInput.addEventListener("blur", validateEmptyField);

confirmPasswordInput.addEventListener("blur", resetValidation);

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  validateEmailField({ target: emailInput });
  validateEmptyField({ target: countryInput });
  validateEmptyField({ target: zipCodeInput });
  validateEmptyField({ target: passwordInput });
  validatePasswordMatch({ target: confirmPasswordInput });

  if (form.checkValidity()) {
    console.log("valid");
  } else {
    console.log("invalid");
  }
});

function resetValidation({ target }) {
  target.setCustomValidity("");
}

function validateEmailField({ target }) {
  if (!target.value.match(emailRegExp)) {
    target.setCustomValidity("Please Enter a Valid Email");
    target.reportValidity();
  }
}

function validateEmptyField({ target }) {
  if (target.value === "") {
    target.setCustomValidity("Please Fill This Field");
    target.reportValidity();
  }
}

function validatePasswordMatch({ target }) {
  if (target.value !== passwordInput.value) {
    target.setCustomValidity("Password Do Not Match");
    target.reportValidity();
  }
}
