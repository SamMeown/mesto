function getErrorElement(form, input, config) {
  return form.querySelector(`.${config.inputErrorClass}_${config.inputErrorSpecificModifier}_${input.id}`);
}

function showInputError(form, input, error, config) {
  const errorElement = getErrorElement(form, input, config);
  errorElement.textContent = error;
  errorElement.classList.add(config.activeInputErrorClass);
  input.classList.add(config.errorInputClass);
}

function hideInputError(form, input, config) {
  const errorElement = getErrorElement(form, input, config);
  errorElement.classList.remove(config.activeInputErrorClass);
  errorElement.textContent = '';
  input.classList.remove(config.errorInputClass);
}

function updateInputValidationMessage(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some(input => !input.validity.valid);
}

function disableSubmitButton(button, config) {
  button.setAttribute('disabled', '');
  button.classList.add(config.inactiveSubmitBtnClass);
}

function enableSubmitButton(button, config) {
  button.classList.remove(config.inactiveSubmitBtnClass);
  button.removeAttribute('disabled');
}

function updateSubmitButtonState(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
}

function getInputs(form, config) {
  return Array.from(form.querySelectorAll(`.${config.inputClass}`));
}

function getSubmitButton(form, config) {
  return form.querySelector(`.${config.submitBtnClass}`);
}

function addFormEventListeners(form, config) {
  const inputs = getInputs(form, config)
  const sumbit_btn = getSubmitButton(form, config)
  inputs.forEach(input => {
    input.addEventListener('input', evt => {
      updateInputValidationMessage(form, input, config);
      updateSubmitButtonState(inputs, sumbit_btn, config);
    });
  });

  form.addEventListener('reset', evt => {
    inputs.forEach(input => {
      hideInputError(form, input, config);
    });
    disableSubmitButton(sumbit_btn, config);
  });

  form.addEventListener('submit', evt => {
    evt.preventDefault();
  });
}

function enableValidation(config) {
  Array.from(document.forms).forEach(form => {
    updateSubmitButtonState(getInputs(form, config), getSubmitButton(form, config), config)
    addFormEventListeners(form, config);
  });
}
