import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import { avatarPopupSelector,
         profilePopupSelector,
         placePopupSelector,
         deletePopupSelector,
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


function reportError(err) {
  console.log(`Ошибка ${err}`);
}

function openProfilePopup() {
  profilePopupFormValidator.resetValidation();
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
}

function handleProfileFormSubmit(inputValues) {
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

function handleAvatarFormSubmit(inputValues) {
  return api.updateUserAvatar({ avatar: inputValues.link })
    .then(data => {
      userInfo.setAvatar(data.avatar);
    })
    .catch(err => {
      reportError(err);
    });
}

function openPlacePopup() {
  placePopupFormValidator.resetValidation();
  placePopup.open();
}

function handlePlaceFormSubmit(inputValues) {
  return api.createCard(inputValues)
    .then(data => {
      const newCardElement = createCardElement(getCardData(data));
      cardsList.addItem(newCardElement);
    })
    .catch(err => {
      reportError(err);
    });
}

function onPlaceCardImageClick(img, name) {
  placeImagePopup.open(img, name, name)
}

function deleteCard(cardId, cardElement) {
  api.deleteCard(cardId)
    .then(data => {
      cardElement.remove();
    })
    .catch(err => {
      reportError(err);
    });
}

function onPlaceCardDeleteClick(cardId, cardElement) {
  deletePopup.setSubmitHandler(() => { deleteCard(cardId, cardElement); });
  deletePopup.open();
}

function onPlaceCardLikeClick(cardId, liked) {
  return (liked ? api.addLike(cardId) : api.deleteLike(cardId))
    .then(data => {
      const { likesCount, liked } = getCardData(data);
      return { likesCount, liked };
    });
}

function createCardElement(cardData) {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    onPlaceCardImageClick,
    onPlaceCardDeleteClick,
    onPlaceCardLikeClick
  );
  return card.getElement();
}

function getCardData(card) {
  return {
    id: card._id,
    name: card.name,
    link: card.link,
    likesCount: card.likes.length,
    liked: card.likes.filter(like => like._id === userId).length > 0,
    removable: card.owner._id === userId
  }
}

const deletePopup = new PopupWithConfirmation(deletePopupSelector)
deletePopup.setEventListeners();

const profilePopup = new PopupWithForm(profilePopupSelector, handleProfileFormSubmit);
profilePopup.setEventListeners();
profileEditButton.addEventListener('click', openProfilePopup);

const avatarPopup = new PopupWithForm(avatarPopupSelector, handleAvatarFormSubmit);
avatarPopup.setEventListeners();
avatarContainer.addEventListener('click', openAvatarPopup);

const placePopup = new PopupWithForm(placePopupSelector, handlePlaceFormSubmit);
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
let userId;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(data => {
    const [user, cards] = data;

    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user.avatar);

    const cardsData = cards.map(getCardData)
    cardsList = new Section(
      {
        items: cardsData.slice(0).reverse(),
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
