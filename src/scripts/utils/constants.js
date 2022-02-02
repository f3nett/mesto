const indexConfig = {
  popupProfileSelector: '.popup_type_profile',
  popupPlaceSelector: '.popup_type_place',
  popupImageSelector: '.popup_type_image',
  popupAvatarSelector: '.popup_type_avatar',
  popupRemoveSelector: '.popup_type_confirmation',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
  profileInputNameSelector: '.popup__input_type_profile-name',
  profileInputDescriptionSelector: '.popup__input_type_profile-descriprion',
  profileInputAvatarSelector: '.popup__input_type_avatar-link',
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profilePhotoSelector: '.profile__avatar',
  cardListSelector: '.places'
}
  
const cardConfig = {
  placeCardSelector: '.place-card',
  likeButtonSelector: '.place-card__like-button',
  activeLikeButtonClass: 'place-card__like-button_active',
  trashButtonSelector: '.place-card__trash-button',
  cardButtonSelector: '.place-card__image',
  cardTitleSelector: '.place-card__title',
  cardImageSelector: '.place-card__image',
  cardTemplateSelector: '.place-template',
  likeCounterSelector: '.place-card__like-counter',
  activeTrashBtnClass: 'place-card__trash-button_active'
}

const popupConfig = {
  closeButtonClass: 'popup__close-button',
  openedPopupClass: 'popup_opened',
  removePopupClass: 'popup_type_confirmation',
  inputSelector: '.popup__input',
  formSelector: '.popup__form',
  viewTitleSelector: '.popup__image-title',
  viewSelector: '.popup__image',
  submitSelector: '.popup__submit-button'
}

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_active'
}

export {indexConfig, cardConfig, popupConfig, validateConfig};
