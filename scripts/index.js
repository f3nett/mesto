import initialCards from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const config = {
  popupSelector: '.popup',
  popupProfileSelector: '.popup_type_profile',
  popupPlaceSelector: '.popup_type_place',
  popupImageSelector: '.popup_type_image',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button',
  closeButtonClass: 'popup__close-button',
  profileInputNameSelector: '.popup__input_type_profile-name',
  profileInputDescriptionSelector: '.popup__input_type_profile-descriprion',
  placeInputNameSelector: '.popup__input_type_place-name',
  placeInputURLSelector: '.popup__input_type_place-url',
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  cardListSelector: '.places',
  openedPopupClass: 'popup_opened',
  openedPopupSelector: '.popup_opened',
  cardTemplateSelector: '.place-template'
}

const cardConfig = {
  placeCardSelector: '.place-card',
  likeButtonSelector: '.place-card__like-button',
  activeLikeButtonClass: 'place-card__like-button_active',
  viewTitleSelector: '.popup__image-title',
  viewSelector: '.popup__image',
  trashButtonSelector: '.place-card__trash-button',
  cardButtonSelector: '.place-card__image',
  cardTitleSelector: '.place-card__title',
  cardImageSelector: '.place-card__image'
}

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_active'
}

const popupProfile = document.querySelector(config.popupProfileSelector);
const popupPlace = document.querySelector(config.popupPlaceSelector);
const popupImage = document.querySelector(config.popupImageSelector);
const profileForm = document.forms.profileForm;
const placeForm = document.forms.placeForm;

const buttonEditProfile = document.querySelector(config.editButtonSelector);
const buttonAddPlace = document.querySelector(config.addButtonSelector);

const inputProfileName = popupProfile.querySelector(config.profileInputNameSelector);
const inputProfileDescription = popupProfile.querySelector(config.profileInputDescriptionSelector);
const inputPlaceName = popupPlace.querySelector(config.placeInputNameSelector);
const inputPlaceURL = popupPlace.querySelector(config.placeInputURLSelector);

const profileName = document.querySelector(config.profileNameSelector);
const profileNameDescription= document.querySelector(config.profileDescriptionSelector);
const placeElement = document.querySelector(config.cardListSelector);

const profileValidator = new FormValidator(validateConfig, profileForm);
const placeValidator = new FormValidator(validateConfig, placeForm);

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector(config.openedPopupSelector);
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add(config.openedPopupClass);
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove(config.openedPopupClass);
  document.removeEventListener('keydown', closeByEscape);
}

function openProfileForm() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileNameDescription.textContent;
  //очистка ошибок инпутов
  profileValidator.clearValidationErrors();
  //активация кнопки после присваивания значений инпутам
  profileValidator.toggleButtonState();
  openPopup(popupProfile);
}

function openPlaceForm() {
  //очистка ошибок инпутов
  placeValidator.clearValidationErrors();
  openPopup(popupPlace);
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileNameDescription.textContent = inputProfileDescription.value;
  closePopup(popupProfile);
}

function renderPlace(data) {
  const card = new Card(data, config.cardTemplateSelector);
  const newPlace = card.createCard();
  placeElement.prepend(newPlace);
}

function submitPlaceForm(event) {
  event.preventDefault();
  const newPlaceName = inputPlaceName.value;
  const newPlaceURL = inputPlaceURL.value;
  renderPlace({link: newPlaceURL, name: newPlaceName});
  event.target.reset();
  closePopup(popupPlace);
  //деактивация кнопки после успешного сабмита карточки
  placeValidator.toggleButtonState();
}


initialCards.map(renderPlace);

buttonEditProfile.addEventListener('click', openProfileForm);
buttonAddPlace.addEventListener('click', openPlaceForm);
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm);

const popups = document.querySelectorAll(config.popupSelector);

popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        if (event.target.classList.contains(config.openedPopupClass)) {
          closePopup(popup);
        }
        if (event.target.classList.contains(config.closeButtonClass)) {
          closePopup(popup);
        }
    })
}) 

profileValidator.enableValidation();
placeValidator.enableValidation();

export {cardConfig, validateConfig, popupImage, openPopup};