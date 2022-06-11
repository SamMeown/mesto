import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  _setContent = (img, alt, label) => {
    this._popupImage.src = img;
    this._popupImage.alt = alt;
    this._popupImageCaption.textContent = label;
  }

  open(img, alt, label) {
    this._setContent(img, alt, label);
    super.open();
  }
}
