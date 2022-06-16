import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from "../components/UserInfo.js";
import initialCards from "../data/cards.js";
import { avatarPopupSelector,
         profilePopupSelector,
         placePopupSelector,
         placeImagePopupSelector,
         profileNameSelector,
         profileAboutSelector,
         avatarContainer,
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

function openAvatarPopup() {
  avatarPopupFormValidator.resetValidation();
  avatarPopup.open();
}

function avatarFormSubmitHandler(inputValues) {
  // TODO:
  console.log(inputValues);
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

function deleteCard(card) {
  card.remove();
}

function onPlaceCardDeleteClick(card) {
  deletePopup.setSubmitHandler(() => { deleteCard(card); });
  deletePopup.open();
}

function createCardElement(link, name) {
  const card = new Card(link, name, cardTemplateSelector, onPlaceCardImageClick, onPlaceCardDeleteClick);
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

const deletePopupSelector = '.page__delete-popup';
const deletePopup = new PopupWithConfirmation(deletePopupSelector)
deletePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);
profilePopup.setEventListeners();
profileEditButton.addEventListener('click', openProfilePopup);

const avatarPopup = new PopupWithForm(avatarPopupSelector, avatarFormSubmitHandler);
avatarPopup.setEventListeners();
avatarContainer.addEventListener('click', openAvatarPopup);

const placePopup = new PopupWithForm(placePopupSelector, placeFormSubmitHandler);
placePopup.setEventListeners();
profileAddButton.addEventListener('click', openPlacePopup);

const placeImagePopup = new PopupWithImage(placeImagePopupSelector);
placeImagePopup.setEventListeners();

// Enabling form validation for our forms
const profilePopupFormValidator = new FormValidator(validatorConfig, profilePopup.getForm());
profilePopupFormValidator.enableValidation();

const avatarPopupFormValidator = new FormValidator(validatorConfig, avatarPopup.getForm());
avatarPopupFormValidator.enableValidation();

const placePopupFormValidator = new FormValidator(validatorConfig, placePopup.getForm());
placePopupFormValidator.enableValidation();
