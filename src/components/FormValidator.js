export default class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = this._getInputs();
    this._submitBtn = this._getSubmitButton();
  }

  _getInputs = () => {
    return Array.from(this._form.querySelectorAll(`.${this._config.inputClass}`));
  }

  _getSubmitButton = () => {
    return this._form.querySelector(`.${this._config.submitBtnClass}`);
  }

  _hasInvalidInput = () => {
    return this._inputs.some(input => !input.validity.valid);
  }

  _disableSubmitButton = () => {
    this._submitBtn.setAttribute('disabled', '');
    this._submitBtn.classList.add(this._config.inactiveSubmitBtnClass);
  }

  _enableSubmitButton = () => {
    this._submitBtn.classList.remove(this._config.inactiveSubmitBtnClass);
    this._submitBtn.removeAttribute('disabled');
  }

  _updateSubmitButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
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

  _updateInputValidation = (input) => {
    this._updateInputValidationMessage(input);
    this._updateSubmitButtonState();
  }

  updateValidation() {
    this._inputs.forEach(input => {
      this._updateInputValidation(input);
    });
  }

  resetValidation() {
    this._inputs.forEach(input => {
      this._hideInputError(input);
    });
    this._disableSubmitButton();
  }

  _addFormEventListeners = () => {
    this._inputs.forEach(input => {
      input.addEventListener('input', evt => {
        this._updateInputValidation(input);
      });
    });
  }

  enableValidation() {
    this._updateSubmitButtonState();
    this._addFormEventListeners();
  }
}
