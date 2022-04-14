const profilePopup = document.querySelector('.popup.page__profile-popup');
const profileFormElement = profilePopup.querySelector('.form');

const placePopup = document.querySelector('.popup.page__place-popup');
const placeFormElement = placePopup.querySelector('.form');

const placeImagePopup = document.querySelector('.popup.page__place-image-popup');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditButton = profile.querySelector('.profile__edit-btn');
const profileAddButton = profile.querySelector('.profile__add-btn');

const placesList = document.querySelector('.places__list');

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
  const popupCloseButton = popup.querySelector('.popup__close-btn');
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

function openPlaceImagePopup(img, alt, label) {
  const popupImage = placeImagePopup.querySelector('.popup__image');
  popupImage.src = img;
  popupImage.alt = alt;
  placeImagePopup.querySelector('.popup__image-caption').textContent = label
  openPopup(placeImagePopup);
}

function renderPlaceCard(cardInfo) {
  const placeItem = cardTemplate.firstElementChild.cloneNode(true);
  const placeImage = placeItem.querySelector('.places__image');
  placeImage.src = cardInfo.link;
  placeImage.alt = cardInfo.name;
  placeItem.querySelector('.places__name').textContent = cardInfo.name;

  placesList.prepend(placeItem);
}

function handlePlaceDeleteButtonClick(event) {
  event.target.closest('.places__item').remove();
}

function handlePlaceLikeButtonClick(event) {
  event.target.classList.toggle('places__like-btn_clicked');
}

function handlePlaceImageClick(event) {
  const image = event.target.src;
  const alt = event.target.alt;
  const label = event.target.parentElement.querySelector('.places__name').textContent;
  openPlaceImagePopup(image, alt, label);
}

initialCards.forEach(renderPlaceCard);

profileEditButton.addEventListener('click', openProfilePopup);
addPopupEventListeners(profilePopup);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

profileAddButton.addEventListener('click', openPlacePopup);
addPopupEventListeners(placePopup);
placeFormElement.addEventListener('submit', placeFormSubmitHandler);

addPopupEventListeners(placeImagePopup);

placesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('places__like-btn')) {
    handlePlaceLikeButtonClick(event);
  } else if (event.target.classList.contains('places__delete-btn')) {
    handlePlaceDeleteButtonClick(event);
  } else if (event.target.classList.contains('places__image')) {
    handlePlaceImageClick(event);
  }
});
