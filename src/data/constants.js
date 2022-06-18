export const profilePopupSelector = '.page__profile-popup';
export const avatarPopupSelector = '.page__avatar-popup';
export const placePopupSelector = '.page__place-popup';
export const deletePopupSelector = '.page__delete-popup';
export const placeImagePopupSelector = '.page__place-image-popup';

const profile = document.querySelector('.profile');
export const avatarContainer = profile.querySelector('.profile__picture-container');
export const profileEditButton = profile.querySelector('.profile__edit-btn');
export const profileAddButton = profile.querySelector('.profile__add-btn');

export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';
export const profileAvatarSelector = '.profile__picture';

export const placesContainerSelector = '.places__list';

export const cardTemplateSelector = '#place-card';

export const validatorConfig = {
  inputClass: 'form__input',
  errorInputClass: 'form__input_type_error',
  inputErrorClass: 'form__input-error',
  inputErrorSpecificModifier: 'el',
  activeInputErrorClass: 'form__input-error_active',
  submitBtnClass: 'form__submit-btn',
  inactiveSubmitBtnClass: 'form__submit-btn_disabled'
};
