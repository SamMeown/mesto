export default class Card {
  static _templates = {};

  constructor(data, templateSelector, handleCardClick, handleCardDeleteClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
  }

  get _template() {
    if (!Card._templates[this._templateSelector]) {
      Card._templates[this._templateSelector] = document.querySelector(this._templateSelector).content;
    }

    return Card._templates[this._templateSelector];
  }

  _handlePlaceDeleteButtonClick = (placeItem) => {
    this._handleCardDeleteClick(placeItem);
  }

  _handlePlaceLikeButtonClick = (placeLikeButton) => {
    placeLikeButton.classList.toggle('places__like-btn_clicked');
  }

  _handlePlaceImageClick = (imageInfo) => {
    this._handleCardClick(imageInfo.src, imageInfo.name);
  }

  _setupContent = () => {
    const placeImage = this._element.querySelector('.places__image');
    const placeName = this._element.querySelector('.places__name');
    const placeDeleteBtn = this._element.querySelector('.places__delete-btn');
    const placeLikeCounter = this._element.querySelector('.places__like-counter');

    placeImage.src = this._data.link;
    placeImage.alt = this._data.name;
    placeName.textContent = this._data.name;
    placeLikeCounter.textContent = this._data.likesCount;

    if (!this._data.removable) {
      placeDeleteBtn.style.display = 'none';
    }
  }

  _setupEventListeners = () => {
    const placeImage = this._element.querySelector('.places__image');
    const placeDeleteBtn = this._element.querySelector('.places__delete-btn');
    const placeLikeBtn = this._element.querySelector('.places__like-btn');

    placeImage.addEventListener('click', event => {
      this._handlePlaceImageClick({name: this._data.name, src: this._data.link});
    });
    placeLikeBtn.addEventListener('click', event => {
      this._handlePlaceLikeButtonClick(event.target);
    });

    if (this._data.removable) {
      placeDeleteBtn.addEventListener('click', event => {
        this._handlePlaceDeleteButtonClick(this._element);
      });
    }
  }

  getElement() {
    if (!this._element) {
      this._element = this._template.firstElementChild.cloneNode(true);
      this._setupContent();
      this._setupEventListeners();
    }

    return this._element;
  }
}
