export default class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _getInputs = () => {
    return Array.from(this._form.querySelectorAll(`.${this._config.inputClass}`));
  }

  _getSubmitButton = () => {
    return this._form.querySelector(`.${this._config.submitBtnClass}`);
  }

  _hasInvalidInput = (inputs) => {
    return inputs.some(input => !input.validity.valid);
  }

  _disableSubmitButton = (button) => {
    button.setAttribute('disabled', '');
    button.classList.add(this._config.inactiveSubmitBtnClass);
  }

  _enableSubmitButton = (button) => {
    button.classList.remove(this._config.inactiveSubmitBtnClass);
    button.removeAttribute('disabled');
  }

  _updateSubmitButtonState = () => {
    const inputs = this._getInputs();
    const button = this._getSubmitButton();
    if (this._hasInvalidInput(inputs)) {
      this._disableSubmitButton(button);
    } else {
      this._enableSubmitButton(button);
    }
  }

  _getErrorElement = (input) => {
    return this._form.querySelector(`.${this._config.inputErrorClass}_${this._config.inputErrorSpecificModifier}_${input.id}`);
  }

  _showInputError(input, error) {
    const errorElement = this._getErrorElement(input);
    errorElement.textContent = error;
    errorElement.classList.add(this._config.activeInputErrorClass);
    input.classList.add(this._config.errorInputClass);
  }

  _hideInputError = (input) => {
    const errorElement = this._getErrorElement(input);
    errorElement.classList.remove(this._config.activeInputErrorClass);
    errorElement.textContent = '';
    input.classList.remove(this._config.errorInputClass);
  }

  _updateInputValidationMessage = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _addFormEventListeners = () => {
    const inputs = this._getInputs()
    inputs.forEach(input => {
      input.addEventListener('input', evt => {
        this._updateInputValidationMessage(input);
        this._updateSubmitButtonState();
      });
    });

    this._form.addEventListener('reset', evt => {
      inputs.forEach(input => {
        this._hideInputError(input);
      });
      const sumbit_btn = this._getSubmitButton()
      this._disableSubmitButton(sumbit_btn);
    });

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
    });
  }

  enableValidation() {
    this._updateSubmitButtonState();
    this._addFormEventListeners();
  }
}
