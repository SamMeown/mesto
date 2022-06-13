import '../pages/index.css';
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import initialCards from "../data/cards.js";
import { profilePopupSelector,
         placePopupSelector,
         placeImagePopupSelector,
         profileNameSelector,
         profileAboutSelector,
         profileEditButton,
         profileAddButton,
         placesContainerSelector,
         cardTemplateSelector
       } from "../data/constants.js";


function openProfilePopup() {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
}

function profileFormSubmitHandler(inputValues) {
  userInfo.setUserInfo(inputValues);
}

function openPlacePopup() {
  placePopup.open();
}

function placeFormSubmitHandler(inputValues) {
  const newCardElement = createCardElement(inputValues.link, inputValues.name);
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

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  aboutSelector: profileAboutSelector
});

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);
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
