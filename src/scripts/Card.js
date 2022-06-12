export default class Card {
  static _templates = {};

  constructor(link, name, templateSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  get _template() {
    if (!Card._templates[this._templateSelector]) {
      Card._templates[this._templateSelector] = document.querySelector(this._templateSelector).content;
    }

    return Card._templates[this._templateSelector];
  }

  _handlePlaceDeleteButtonClick = (placeItem) => {
    placeItem.remove();
  }

  _handlePlaceLikeButtonClick = (placeLikeButton) => {
    placeLikeButton.classList.toggle('places__like-btn_clicked');
  }

  _handlePlaceImageClick = (imageInfo) => {
    this._handleCardClick(imageInfo.src, imageInfo.name);
  }

  _setupContent = (placeItem) => {
    const placeImage = placeItem.querySelector('.places__image');
    const placeName = placeItem.querySelector('.places__name');

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeName.textContent = this._name;

    return placeItem;
  }

  _setupEventListeners = (placeItem) => {
    const placeImage = placeItem.querySelector('.places__image');
    const placeDeleteBtn = placeItem.querySelector('.places__delete-btn');
    const placeLikeBtn = placeItem.querySelector('.places__like-btn');

    placeImage.addEventListener('click', event => {
      this._handlePlaceImageClick({name: this._name, src: this._link});
    });
    placeDeleteBtn.addEventListener('click', event => {
      this._handlePlaceDeleteButtonClick(placeItem);
    });
    placeLikeBtn.addEventListener('click', event => {
      this._handlePlaceLikeButtonClick(event.target);
    });

    return placeItem
  }

  getElement() {
    if (!this._element) {
      this._element = this._template.firstElementChild.cloneNode(true);
      this._element = this._setupContent(this._element);
      this._element = this._setupEventListeners(this._element);
    }

    return this._element;
  }
}
