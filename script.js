const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let popup = document.querySelector('.popup.page__profile-popup');
let popupCloseButton = popup.querySelector('.popup__close-btn');

let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_el_name');
let aboutInput = formElement.querySelector('.form__input_el_about');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let profileEditButton = profile.querySelector('.profile__edit-btn');

let placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#place-card').content;

function openPopup() {
  initPopupForm();
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

function initPopupForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup() {
  document.removeEventListener('keyup', onDocumentKeyUp);
  popup.classList.remove('popup_opened');
}

function onDocumentKeyUp(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup();
}

function renderPlaceCard(cardInfo) {
  const placeItem = cardTemplate.firstElementChild.cloneNode(true);
  const placeImage = placeItem.querySelector('.places__image');
  placeImage.src = cardInfo.link;
  placeImage.alt = cardInfo.name;
  placeItem.querySelector('.places__name').textContent = cardInfo.name;

  placesList.prepend(placeItem);
}

initialCards.forEach(renderPlaceCard);

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

formElement.addEventListener('submit', formSubmitHandler);

placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('places__like-btn')) {
    event.target.classList.toggle('places__like-btn_clicked');
  }
});
