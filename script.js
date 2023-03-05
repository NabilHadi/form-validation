const form = document.querySelector("form");

const emailInput = form.querySelector("input#email");
const countryInput = form.querySelector("select#country");
const zipCodeInput = form.querySelector("input#zip-code");
const passwordInput = form.querySelector("input#password");
const confirmPasswordInput = form.querySelector("input#confirm-password");

emailInput.addEventListener("change", checkEmailInputValidity);
emailInput.addEventListener("input", removeValidationMessage);

countryInput.addEventListener("change", checkZipCodeInputValidity);

zipCodeInput.addEventListener("change", checkZipCodeInputValidity);
zipCodeInput.addEventListener("input", removeValidationMessage);

passwordInput.addEventListener("change", checkPasswordInput);
passwordInput.addEventListener("input", removeValidationMessage);

confirmPasswordInput.addEventListener("change", checkPasswordInput);
confirmPasswordInput.addEventListener("input", removeValidationMessage);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEmailValid = checkEmailInputValidity();
  let isZipCodeValid = checkZipCodeInputValidity();
  let isPassowrdValid = checkPasswordInput();
  if (isEmailValid && isZipCodeValid && isPassowrdValid) {
    console.log("submit");
  } else {
    console.log("invalid", { isEmailValid, isZipCodeValid, isPassowrdValid });
  }
});

function removeValidationMessage(e) {
  e.target.setCustomValidity("");
}

function checkEmailInputValidity() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (emailInput.value.match(emailRegex)) {
    emailInput.setCustomValidity("");
  } else {
    emailInput.setCustomValidity("Please type valid email address");
  }

  return emailInput.reportValidity();
}

function checkZipCodeInputValidity() {
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const constraint = new RegExp(constraints[countryInput.value][0], "");

  if (constraint.test(zipCodeInput.value)) {
    zipCodeInput.setCustomValidity("");
  } else {
    zipCodeInput.setCustomValidity(constraints[countryInput.value][1]);
  }

  return zipCodeInput.reportValidity();
}

function checkPasswordInput() {
  if (passwordInput.value.length <= 8) {
    passwordInput.setCustomValidity("Pleaste enter a password longer than 8");
    return passwordInput.reportValidity();
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Password do not match");
    return confirmPasswordInput.reportValidity();
  }

  return true;
}
