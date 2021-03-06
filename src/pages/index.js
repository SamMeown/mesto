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
  profilePopupFormValidator.updateValidation();
}

function openAvatarPopup() {
  avatarPopupFormValidator.resetValidation();
  avatarPopup.open();
}

function openPlacePopup() {
  placePopupFormValidator.resetValidation();
  placePopup.open();
}

function getPopupFormSubmitHandler(apiCall, successHandler) {
  function handlePopupFormSubmit(inputValues, popup) {
    popup.setPending(true)
    apiCall(inputValues)
      .finally(() => {
        // сбрасываем pending-текст сразу после запроса, чтобы в случае показа ошибки
        // не перетирался текст ошибки
        popup.setPending(false);
      })
      .then(data => {
        successHandler(data);
        popup.close();
      })
      .catch( err => {
        popup.displayError();
        reportError(err);
      });
  }

  return handlePopupFormSubmit;
}

const handleProfileFormSubmit = getPopupFormSubmitHandler(
  inputValues => api.updateUserInfo(inputValues),
  data => userInfo.setUserInfo(data)
);

const handleAvatarFormSubmit = getPopupFormSubmitHandler(
  inputValues => api.updateUserAvatar({ avatar: inputValues.link }),
  data => userInfo.setAvatar(data.avatar)
);

const handlePlaceFormSubmit = getPopupFormSubmitHandler(
  inputValues => api.createCard(inputValues),
  data => {
    const newCardElement = createCardElement(getCardData(data));
    cardsList.addItem(newCardElement);
  }
);

function onPlaceCardImageClick(img, name) {
  placeImagePopup.open(img, name, name)
}

function deleteCard(cardId, card) {
  api.deleteCard(cardId)
    .then(data => {
      card.remove();
      deletePopup.close();
    })
    .catch(err => {
      reportError(err);
    });
}

function onPlaceCardDeleteClick(cardId, card) {
  deletePopup.setSubmitHandler(() => { deleteCard(cardId, card); });
  deletePopup.open();
}

function onPlaceCardLikeClick(cardId, liked, card) {
  (liked ? api.addLike(cardId) : api.deleteLike(cardId))
    .then(data => {
      const { likesCount, liked } = getCardData(data);
      card.updateLikes(likesCount, liked);
    })
    .catch(err => {
      console.log(`Ошибка ${err}`);
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

// Эта функция для преобразования данных с сервера в данные для объекта карточки Card.
// Она преобразовывает и возвращает только те данные, которые непосредственно необходимы
// объекту Card для функционирования и обстрагирует его от лишних данных и логики.
// Она не является частью класса Card, так как кажется, что классу Card ни к чему знать
// о существовании владельца карточки и списка пользователей, которые ее лайкнули, и их
// внутренней структуре, ему просто надо знать, каково количество лайков и является ли эта
// карточка удаляемой или нет.
// Кроме того, мы используем эту логику из этой функции и в колбэке onPlaceCardLikeClick, и
// если эта фукция будет внутри класса Card, то либо ее придется делать публичной, либо
// в метод обновления лайков карточки придется передавать всю сырую инфу карты целиком, либо
// дублировать логику, и кажется все эти варианты не очень красивые.
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

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCardElement(item);
      cardsList.addItem(cardElement);
    }
  },
  placesContainerSelector
);

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-42', {
  headers: {
    authorization: '6d35ec1d-6d86-4d5b-9eab-6ccf0735e2e6',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(data => {
    const [user, cards] = data;

    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user.avatar);

    const cardsData = cards.map(getCardData)
    cardsList.renderItems(cardsData.slice(0).reverse());
  })
  .catch( err => {
    reportError(err);
  });
