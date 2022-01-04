const indexConfig = {
  popupProfileSelector: '.popup_type_profile',
  popupPlaceSelector: '.popup_type_place',
  popupImageSelector: '.popup_type_image',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
  profileInputNameSelector: '.popup__input_type_profile-name',
  profileInputDescriptionSelector: '.popup__input_type_profile-descriprion',
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  cardListSelector: '.places',
  cardTemplateSelector: '.place-template'
}
  
const cardConfig = {
  placeCardSelector: '.place-card',
  likeButtonSelector: '.place-card__like-button',
  activeLikeButtonClass: 'place-card__like-button_active',
  trashButtonSelector: '.place-card__trash-button',
  cardButtonSelector: '.place-card__image',
  cardTitleSelector: '.place-card__title',
  cardImageSelector: '.place-card__image'
}

const popupConfig = {
  closeButtonClass: 'popup__close-button',
  openedPopupClass: 'popup_opened',
  inputSelector: '.popup__input',
  formSelector: '.popup__form',
  viewTitleSelector: '.popup__image-title',
  viewSelector: '.popup__image'
}

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_active'
}

export {indexConfig, cardConfig, popupConfig, validateConfig};