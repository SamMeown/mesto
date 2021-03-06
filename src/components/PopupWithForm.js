import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  static _submitButtonTitlePending = 'Сохранение...';
  static _submitButtonTitleError = 'Ошибка';

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__submit-btn');
    this._submitButtonTitle = this._submitButton.textContent;
  }

  _getInputValues = () => {
    const inputValues = {};
    this._inputs.forEach(input => inputValues[input.name] = input.value);

    return inputValues;
  }

  setInputValues = (values) => {
    this._inputs.forEach(input => {
      const value = values[input.name];
      if (value) {
        input.value = value;
      }
    });
  }

  getForm() {
    return this._form;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues(), this);
  }

  setPending(pending) {
    this._submitButton.textContent = pending ? PopupWithForm._submitButtonTitlePending : this._submitButtonTitle;
  }

  _setError(hasError) {
    if (hasError) {
      this._submitButton.textContent = PopupWithForm._submitButtonTitleError;
      this._submitButton.classList.add('form__submit-btn_state_error');
    } else {
      this._submitButton.textContent = this._submitButtonTitle;
      this._submitButton.classList.remove('form__submit-btn_state_error');
    }
  }

  displayError() {
    this._setError(true);
    this._displayErrorTimeout = setTimeout(() => {
      this._setError(false);
    }, 1500);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    this._form.reset();
    this.setPending(false);
    clearTimeout(this._displayErrorTimeout);
    this._setError(false);
    super.close();
  }
}
