let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__close-btn');

let formElement = document.querySelector('.profile-form');
let nameInput = formElement.querySelector('.profile-form__input_el_name');
let aboutInput = formElement.querySelector('.profile-form__input_el_about');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let profileEditButton = profile.querySelector('.profile__edit-btn');

let placesList = document.querySelector('.places__list');

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

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

formElement.addEventListener('submit', formSubmitHandler);
