export const profilePopupSelector = '.page__profile-popup';
export const placePopupSelector = '.page__place-popup';
export const placeImagePopupSelector = '.page__place-image-popup';

const profile = document.querySelector('.profile');
export const profileEditButton = profile.querySelector('.profile__edit-btn');
export const profileAddButton = profile.querySelector('.profile__add-btn');

export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__about';

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
