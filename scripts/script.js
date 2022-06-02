import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profilePopup = document.querySelector('.page__profile-popup');
const profileFormElement = profilePopup.querySelector('.form');
const profileNameInput = profileFormElement.querySelector('#name-input');
const profileAboutInput = profileFormElement.querySelector('#about-input');

const placePopup = document.querySelector('.page__place-popup');
const placeFormElement = placePopup.querySelector('.form');
const placeNameInput = placeFormElement.querySelector('#place-name-input');
const placeLinkInput = placeFormElement.querySelector('#place-link-input');

const placeImagePopup = document.querySelector('.page__place-image-popup');
const popupImage = placeImagePopup.querySelector('.popup__image');
const popupImageCaption = placeImagePopup.querySelector('.popup__image-caption');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const profileAddButton = profile.querySelector('.profile__add-btn');

const placesContainer = document.querySelector('.places__list');

const cardTemplateSelector = '#place-card';

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup(popup) {
  document.removeEventListener('keyup', onDocumentKeyUp);
  popup.classList.remove('popup_opened');
}

function onDocumentKeyUp(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup.popup_opened');
    closePopup(popup);
  }
}

function addPopupEventListeners(popup) {
  popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget
      || event.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
}

function closeClickedPopup(event) {
  const popup = event.currentTarget.closest('.popup');
  closePopup(popup);
}

function openProfilePopup() {
  profileFormElement.reset();
  setInputValue(profileNameInput, profileName.textContent);
  setInputValue(profileAboutInput, profileAbout.textContent);
  openPopup(profilePopup);
}

function setInputValue(input, value) {
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

function profileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closeClickedPopup(event);
}

function openPlacePopup() {
  placeFormElement.reset();
  openPopup(placePopup);
}

function placeFormSubmitHandler(event) {
  event.preventDefault();
  const newCardElement = createCardElement(placeLinkInput.value, placeNameInput.value);
  addPlaceCard(newCardElement);

  closeClickedPopup(event);
}

function openPlaceImagePopup(img, alt, label) {
  popupImage.src = img;
  popupImage.alt = alt;
  popupImageCaption.textContent = label
  openPopup(placeImagePopup);
}

function onPlaceCardImageClick(img, name) {
  openPlaceImagePopup(img, name, name);
}

function addPlaceCard(card) {
  placesContainer.prepend(card);
}

function createCardElement(link, name) {
  const card = new Card(link, name, cardTemplateSelector, onPlaceCardImageClick);
  return card.getElement();
}

initialCards.forEach(info => {
  const cardElement = createCardElement(info.link, info.name);
  addPlaceCard(cardElement)
});

profileEditButton.addEventListener('click', openProfilePopup);
addPopupEventListeners(profilePopup);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

profileAddButton.addEventListener('click', openPlacePopup);
addPopupEventListeners(placePopup);
placeFormElement.addEventListener('submit', placeFormSubmitHandler);

addPopupEventListeners(placeImagePopup);

// Enabling form validation for all forms
function enableValidation(config) {
  Array.from(document.forms).forEach(form => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
  });
}

enableValidation({
  inputClass: 'form__input',
  errorInputClass: 'form__input_type_error',
  inputErrorClass: 'form__input-error',
  inputErrorSpecificModifier: 'el',
  activeInputErrorClass: 'form__input-error_active',
  submitBtnClass: 'form__submit-btn',
  inactiveSubmitBtnClass: 'form__submit-btn_disabled'
});
