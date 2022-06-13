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
         cardTemplateSelector,
         validatorConfig
       } from "../data/constants.js";


function openProfilePopup() {
  profilePopupFormValidator.resetValidation();
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
}

function profileFormSubmitHandler(inputValues) {
  userInfo.setUserInfo(inputValues);
}

function openPlacePopup() {
  placePopupFormValidator.resetValidation();
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

// Enabling form validation for our forms
const profilePopupFormValidator = new FormValidator(validatorConfig, profilePopup.getForm());
profilePopupFormValidator.enableValidation();

const placePopupFormValidator = new FormValidator(validatorConfig, placePopup.getForm());
placePopupFormValidator.enableValidation();
