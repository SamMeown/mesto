function enableValidation(config) {

  function getErrorElement(form, input) {
    const el_class = Array.from(input.classList).find(class_name => {
      return class_name.includes(`${config.inputClass}_${config.inputSpecificModifier}_`);
    });
    const error_el_class = `${config.inputErrorClass}_${el_class.slice(el_class.indexOf(`${config.inputSpecificModifier}_`))}`;
    return form.querySelector(`.${error_el_class}`);
  }

  function showInputError(form, input, error) {
    const errorElement = getErrorElement(form, input);
    errorElement.textContent = error;
    errorElement.classList.add(config.activeInputErrorClass);
    input.classList.add(config.errorInputClass);
  }

  function hideInputError(form, input) {
    const errorElement = getErrorElement(form, input);
    errorElement.classList.remove(config.activeInputErrorClass);
    errorElement.textContent = '';
    input.classList.remove(config.errorInputClass);
  }

  function updateInputValidationMessage(form, input) {
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage);
    } else {
      hideInputError(form, input);
    }
  }

  function hasInvalidInput(inputs) {
    return inputs.some(input => !input.validity.valid);
  }

  function disableSubmitButton(button) {
    button.classList.add(config.inactiveSubmitBtnClass);
  }

  function enableSubmitButton(button) {
    button.classList.remove(config.inactiveSubmitBtnClass);
  }

  function updateSubmitButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
      disableSubmitButton(button);
    } else {
      enableSubmitButton(button);
    }
  }

  function getInputs(form) {
    return Array.from(form.querySelectorAll(`.${config.inputClass}`));
  }

  function getSubmitButton(form) {
    return form.querySelector(`.${config.submitBtnClass}`);
  }

  function addFormEventListeners(form) {
    const inputs = getInputs(form)
    const sumbit_btn = getSubmitButton(form)
    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        updateInputValidationMessage(form, input);
        updateSubmitButtonState(inputs, sumbit_btn);
      });

      input.addEventListener('change', evt => {
        updateInputValidationMessage(form, input);
        updateSubmitButtonState(inputs, sumbit_btn);
      });
    });

    form.addEventListener('reset', evt => {
      inputs.forEach(input => {
        hideInputError(form, input);
      });
      disableSubmitButton(sumbit_btn);
    });

    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  }

  Array.from(document.forms).forEach(form => {
    updateSubmitButtonState(getInputs(form), getSubmitButton(form))
    addFormEventListeners(form);
  });
}
