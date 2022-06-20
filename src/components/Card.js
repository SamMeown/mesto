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
    this._handleCardDeleteClick(this._data.id, this);
  }

  _handlePlaceLikeButtonClick = (placeLikeButton) => {
    this._handleCardLikeClick(this._data.id, !this._data.liked, this);
  }

  _handlePlaceImageClick = (imageInfo) => {
    this._handleCardClick(imageInfo.src, imageInfo.name);
  }

  remove() {
    this._element.remove();
  }

  updateLikes(likesCount, liked) {
    this._data.likesCount = likesCount;
    this._data.liked = liked;
    this._renderLikes();
  }

  _renderLikes = () => {
    this._placeLikeCounter.textContent = this._data.likesCount;
    this._placeLikeBtn.classList.toggle('places__like-btn_clicked', this._data.liked);
  }

  _initSubelements =() => {
    this._placeImage = this._element.querySelector('.places__image');
    this._placeName = this._element.querySelector('.places__name');
    this._placeDeleteBtn = this._element.querySelector('.places__delete-btn');
    this._placeLikeBtn = this._element.querySelector('.places__like-btn');
    this._placeLikeCounter = this._element.querySelector('.places__like-counter');
  }

  _setupContent = () => {
    this._placeImage.src = this._data.link;
    this._placeImage.alt = this._data.name;
    this._placeName.textContent = this._data.name;

    if (!this._data.removable) {
      this._placeDeleteBtn.style.display = 'none';
    }

    this._renderLikes();
  }

  _setupEventListeners = () => {
    this._placeImage.addEventListener('click', event => {
      this._handlePlaceImageClick({name: this._data.name, src: this._data.link});
    });
    this._placeLikeBtn.addEventListener('click', event => {
      this._handlePlaceLikeButtonClick(event.target);
    });

    if (this._data.removable) {
      this._placeDeleteBtn.addEventListener('click', event => {
        this._handlePlaceDeleteButtonClick();
      });
    }
  }

  getElement() {
    if (!this._element) {
      this._element = this._template.firstElementChild.cloneNode(true);
      this._initSubelements();
      this._setupContent();
      this._setupEventListeners();
    }

    return this._element;
  }
}
