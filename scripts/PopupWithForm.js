import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, setupHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._setupHandler = setupHandler;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues = () => {
    const inputs = this._form.querySelectorAll('.form__input');
    const inputValues = {};
    inputs.forEach(input => inputValues[input.name] = input.value);

    return inputValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  open() {
    if (this._setupHandler) {
      this._setupHandler();
    }
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
