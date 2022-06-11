export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleKeyUp = (event) => {
    if (event.key === 'Escape') {
      this._handleEscClose();
    }
  }

  _handleEscClose = () => {
    this.close();
  }

  _handleClick = (event) => {
    if (event.target === event.currentTarget
      || event.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleKeyUp);
  }

  close() {
    document.removeEventListener('keyup', this._handleKeyUp);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClick);
  }
}
