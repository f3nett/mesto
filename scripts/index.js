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


const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');
const profileForm = document.forms.profileForm;
const placeForm = document.forms.placeForm;

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddPlace = document.querySelector('.profile__add-button');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');
const buttonClosePlace = popupPlace.querySelector('.popup__close-button');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

const inputProfileName = popupProfile.querySelector('.popup__input_type_profile-name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_profile-descriprion');
const inputPlaceName = popupPlace.querySelector('.popup__input_type_place-name');
const inputPlaceURL = popupPlace.querySelector('.popup__input_type_place-url');

const profileName = document.querySelector('.profile__name');
const profileNameDescription= document.querySelector('.profile__description');
const placeElement = document.querySelector('.places');
const templateElement = document.querySelector('.place-template');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', () => escapePopup(event, popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', () => escapePopup(event, popup));
}

function openProfileForm() {
  openPopup(popupProfile);
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileNameDescription.textContent;
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileNameDescription.textContent = inputProfileDescription.value;
  closePopup(popupProfile);
}

function createCard(data) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector('.place-card__title').textContent = data.name;
  newCard.querySelector('.place-card__image').src = data.link;
  newCard.querySelector('.place-card__image').alt = data.name;
  setListenerRemove(newCard);
  setListenerLike(newCard);
  setListenerReview(newCard);
  return newCard;
}

function renderPlace(data) {
  const newPlace = createCard(data)
  placeElement.prepend(newPlace);
}

function submitPlaceForm(event) {
  event.preventDefault();
  const newPlaceName = inputPlaceName.value;
  const newPlaceURL = inputPlaceURL.value;
  renderPlace({link: newPlaceURL, name: newPlaceName});
  event.target.reset();
  closePopup(popupPlace);
}

function removePlace(event) {
  event.target.closest('.place-card').remove();
}

function setListenerRemove(place) {
  place.querySelector('.place-card__trash-button').addEventListener('click', removePlace);
}

function likePlace(event) {
  event.target.classList.toggle('place-card__like-button_active');
}

function setListenerLike(place) {
  place.querySelector('.place-card__like-button').addEventListener('click', likePlace);
}

function openImage(event) {
  openPopup(popupImage);
  popupImage.querySelector('.popup__image-title').textContent = event.target.alt;
  popupImage.querySelector('.popup__image').src = event.target.src;
  popupImage.querySelector('.popup__image').alt = event.target.alt;
}

function setListenerReview(image) {
  image.querySelector('.place-card__image').addEventListener('click', openImage);
}

function clickOverlay(event, popup) {
  if (event.target === event.currentTarget) { 
    closePopup(popup);
  }
}

function escapePopup(event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}


initialCards.map(renderPlace);

buttonEditProfile.addEventListener('click', openProfileForm);
buttonAddPlace.addEventListener('click', () => openPopup(popupPlace));
buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile));
buttonClosePlace.addEventListener('click', () => closePopup(popupPlace));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm); 
popupProfile.addEventListener('click', () => clickOverlay(event, popupProfile));
popupPlace.addEventListener('click', () => clickOverlay(event, popupPlace));
popupImage.addEventListener('click', () => clickOverlay(event, popupImage));
