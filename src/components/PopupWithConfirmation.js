import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitHandler();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }
}
