import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import initialCards from "../data/cards.js";
import { avatarPopupSelector,
         profilePopupSelector,
         placePopupSelector,
         placeImagePopupSelector,
         profileNameSelector,
         profileAboutSelector,
         profileAvatarSelector,
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

function reportError(err) {
  console.log(`Ошибка ${err}`);
}

function profileFormSubmitHandler(inputValues) {
  return api.updateUserInfo(inputValues)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .catch( err => {
      reportError(err);
    });
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
  return api.createCard(inputValues)
    .then(data => {
      data.removable = true;
      const newCardElement = createCardElement(data);
      cardsList.addItem(newCardElement);
    })
    .catch(err => {
      reportError(err);
    });
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

function createCardElement(cardData) {
  const card = new Card(cardData, cardTemplateSelector, onPlaceCardImageClick, onPlaceCardDeleteClick);
  return card.getElement();
}

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  aboutSelector: profileAboutSelector,
  avatarSelector: profileAvatarSelector
});

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-42', {
  headers: {
    authorization: '6d35ec1d-6d86-4d5b-9eab-6ccf0735e2e6',
    'Content-Type': 'application/json'
  }
});

let cardsList;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(data => {
    const [user, cards] = data;

    userInfo.setUserInfo(user);
    userInfo.setAvatar(user.avatar);

    cards.forEach(card => card.removable = card.owner._id === user._id);
    cardsList = new Section(
      {
        items: cards.slice(0).reverse(),
        renderer: (item) => {
          const cardElement = createCardElement(item);
          cardsList.addItem(cardElement);
        }
      },
      placesContainerSelector
    );
    cardsList.renderItems();


  })
  .catch( err => {
    reportError(err);
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
