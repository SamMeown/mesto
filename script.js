let popup = document.querySelector('.popup');
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-btn');

function openPopup() {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
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

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});


