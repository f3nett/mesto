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
  cardTemplateSelector: '.place-template'
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

export {initialCards, indexConfig, cardConfig, popupConfig, validateConfig};
