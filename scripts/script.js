import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const profilePopupSelector = '.page__profile-popup';
const profilePopupElement = document.querySelector('.page__profile-popup');
const profileFormElement = profilePopupElement.querySelector('.form');
const profileNameInput = profileFormElement.querySelector('#name-input');
const profileAboutInput = profileFormElement.querySelector('#about-input');

const placePopupSelector = '.page__place-popup';
const placePopupElement = document.querySelector('.page__place-popup');
const placeFormElement = placePopupElement.querySelector('.form');
const placeNameInput = placeFormElement.querySelector('#place-name-input');
const placeLinkInput = placeFormElement.querySelector('#place-link-input');

const placeImagePopupSelector = '.page__place-image-popup';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const profileAddButton = profile.querySelector('.profile__add-btn');

const placesContainerSelector = '.places__list';

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
  profilePopup.open();
}

function setInputValue(input, value) {
  input.value = value;
  input.dispatchEvent(new InputEvent('input'));
}

function profileFormSetupHandler(values) {
  setInputValue(profileNameInput, profileName.textContent);
  setInputValue(profileAboutInput, profileAbout.textContent);
}

function profileFormSubmitHandler(inputValues) {
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
}

function openPlacePopup() {
  placePopup.open();
}

function placeFormSubmitHandler(inputValues) {
  const newCardElement = createCardElement(placeLinkInput.value, placeNameInput.value);
  cardsList.addItem(newCardElement);
}

function onPlaceCardImageClick(img, name) {
  placeImagePopup.open(img, name, name)
}

function createCardElement(link, name) {
  const card = new Card(link, name, cardTemplateSelector, onPlaceCardImageClick);
  return card.getElement();
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCardElement(item.link, item.name);
      cardsList.addItem(cardElement);
    }
  },
  placesContainerSelector
);
cardsList.renderItems();

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler, profileFormSetupHandler);
profilePopup.setEventListeners();
profileEditButton.addEventListener('click', openProfilePopup);

const placePopup = new PopupWithForm(placePopupSelector, placeFormSubmitHandler);
placePopup.setEventListeners();
profileAddButton.addEventListener('click', openPlacePopup);

const placeImagePopup = new PopupWithImage(placeImagePopupSelector);
placeImagePopup.setEventListeners();

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
