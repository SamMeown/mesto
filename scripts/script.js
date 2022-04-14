const profilePopup = document.querySelector('.page__profile-popup');
const profileFormElement = profilePopup.querySelector('.form');
const profileNameInput = profileFormElement.querySelector('.form__input_el_name');
const profileAboutInput = profileFormElement.querySelector('.form__input_el_about');

const placePopup = document.querySelector('.page__place-popup');
const placeFormElement = placePopup.querySelector('.form');
const placeNameInput = placeFormElement.querySelector('.form__input_el_place-name');
const placeLinkInput = placeFormElement.querySelector('.form__input_el_place-link');

const placeImagePopup = document.querySelector('.page__place-image-popup');
const popupImage = placeImagePopup.querySelector('.popup__image');
const popupImageCaption = placeImagePopup.querySelector('.popup__image-caption');

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
  popup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget
      || event.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
}

function closeClickedPopup(event) {
  popup = event.currentTarget.closest('.popup');
  closePopup(popup);
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
}

function profileFormSubmitHandler(event) {
  event.preventDefault();
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
  const newCard = buildPlaceCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  });
  addPlaceCard(newCard);

  closeClickedPopup(event);
}

function openPlaceImagePopup(img, alt, label) {
  popupImage.src = img;
  popupImage.alt = alt;
  popupImageCaption.textContent = label
  openPopup(placeImagePopup);
}

function buildPlaceCard(cardInfo) {
  const placeItem = cardTemplate.firstElementChild.cloneNode(true);
  const placeImage = placeItem.querySelector('.places__image');
  placeImage.src = cardInfo.link;
  placeImage.alt = cardInfo.name;
  placeItem.querySelector('.places__name').textContent = cardInfo.name;

  placeItem.addEventListener('click', event => {
    if (event.target.classList.contains('places__like-btn')) {
      handlePlaceLikeButtonClick(event.target);
    } else if (event.target.classList.contains('places__delete-btn')) {
      handlePlaceDeleteButtonClick(placeItem);
    } else if (event.target.classList.contains('places__image')) {
      handlePlaceImageClick({name: cardInfo.name, src: cardInfo.link});
    }
  });

  return placeItem
}

function addPlaceCard(card) {
  placesList.prepend(card);
}

function handlePlaceDeleteButtonClick(placeItem) {
  placeItem.remove();
}

function handlePlaceLikeButtonClick(placeLikeButton) {
  placeLikeButton.classList.toggle('places__like-btn_clicked');
}

function handlePlaceImageClick(imageInfo) {
  openPlaceImagePopup(imageInfo.src, imageInfo.name, imageInfo.name);
}


initialCards.forEach(info => addPlaceCard(buildPlaceCard(info)));

profileEditButton.addEventListener('click', openProfilePopup);
addPopupEventListeners(profilePopup);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

profileAddButton.addEventListener('click', openPlacePopup);
addPopupEventListeners(placePopup);
placeFormElement.addEventListener('submit', placeFormSubmitHandler);

addPopupEventListeners(placeImagePopup);
