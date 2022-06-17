export default class Card {
  static _templates = {};

  constructor(data, templateSelector, handleCardClick, handleCardDeleteClick, handleCardLikeClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
  }

  get _template() {
    if (!Card._templates[this._templateSelector]) {
      Card._templates[this._templateSelector] = document.querySelector(this._templateSelector).content;
    }

    return Card._templates[this._templateSelector];
  }

  _handlePlaceDeleteButtonClick = () => {
    this._handleCardDeleteClick(this._data.id, this._element);
  }

  _handlePlaceLikeButtonClick = (placeLikeButton) => {
    this._handleCardLikeClick(this._data.id, !this._data.liked)
      .then(({ likesCount, liked }) => {
        this._data.likesCount = likesCount;
        this._data.liked = liked;
        this._updateLikes();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  _handlePlaceImageClick = (imageInfo) => {
    this._handleCardClick(imageInfo.src, imageInfo.name);
  }

  _updateLikes() {
    const placeLikeCounter = this._element.querySelector('.places__like-counter');
    const placeLikeBtn = this._element.querySelector('.places__like-btn');

    placeLikeCounter.textContent = this._data.likesCount;
    placeLikeBtn.classList.toggle('places__like-btn_clicked', this._data.liked);
  }

  _setupContent = () => {
    const placeImage = this._element.querySelector('.places__image');
    const placeName = this._element.querySelector('.places__name');
    const placeDeleteBtn = this._element.querySelector('.places__delete-btn');

    placeImage.src = this._data.link;
    placeImage.alt = this._data.name;
    placeName.textContent = this._data.name;

    if (!this._data.removable) {
      placeDeleteBtn.style.display = 'none';
    }

    this._updateLikes();
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
        this._handlePlaceDeleteButtonClick();
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
