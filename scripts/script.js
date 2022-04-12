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

let profilePopup = document.querySelector('.popup.page__profile-popup');
let profileFormElement = profilePopup.querySelector('.form');

let placePopup = document.querySelector('.popup.page__place-popup');
let placeFormElement = placePopup.querySelector('.form');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let profileEditButton = profile.querySelector('.profile__edit-btn');
let profileAddButton = profile.querySelector('.profile__add-btn');

let placesList = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#place-card').content;

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
  let popupCloseButton = popup.querySelector('.popup__close-btn');
  popupCloseButton.addEventListener('click', evt => closePopup(popup));
  popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

function closeClickedPopup(event) {
  popup = event.currentTarget.closest('.popup');
  closePopup(popup);
}

function openProfilePopup() {
  const profileNameInput = profileFormElement.querySelector('.form__input_el_name');
  const profileAboutInput = profileFormElement.querySelector('.form__input_el_about');
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
}

function profileFormSubmitHandler(event) {
  event.preventDefault();
  const profileNameInput = profileFormElement.querySelector('.form__input_el_name');
  const profileAboutInput = profileFormElement.querySelector('.form__input_el_about');
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
  const placeNameInput = placeFormElement.querySelector('.form__input_el_place-name');
  const placeLinkInput = placeFormElement.querySelector('.form__input_el_place-link');
  renderPlaceCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  });

  closeClickedPopup(event);
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

profileEditButton.addEventListener('click', openProfilePopup);
addPopupEventListeners(profilePopup);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

profileAddButton.addEventListener('click', openPlacePopup);
addPopupEventListeners(placePopup);
placeFormElement.addEventListener('submit', placeFormSubmitHandler);
