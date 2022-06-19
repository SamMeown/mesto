import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  static _submitButtonTitlePending = 'Сохранение...';

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

  _setInputValue = (input, value) => {
    input.value = value;
    input.dispatchEvent(new InputEvent('input'));
  }

  setInputValues = (values) => {
    this._inputs.forEach(input => {
      const value = values[input.name];
      if (value) {
        this._setInputValue(input, value);
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }
}
