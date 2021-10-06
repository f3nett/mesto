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

let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let profileForm = document.forms.profileForm;
let placeForm = document.forms.placeForm;
let imageForm = popup.querySelector('.popup__review-image');

const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const popupCloseBtn = popup.querySelector('.popup__close-button');

let inputProfileName = popup.querySelector('.popup__input_type_profile-name');
let inputProfileDescription = popup.querySelector('.popup__input_type_profile-descriprion');
let inputPlaceName = popup.querySelector('.popup__input_type_place-name');
let inputPlaceURL = popup.querySelector('.popup__input_type_place-url');

let profileName = document.querySelector('.profile__name');
let profileNameDescription= document.querySelector('.profile__description');
let placeElement = document.querySelector('.places');
let templateElement = document.querySelector('.place-template');


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opacity_lite');
  popup.classList.remove('popup_opacity_strong');
  popup.classList.remove('popup_opened');
  profileForm.classList.remove('popup__form_opened');
  placeForm.classList.remove('popup__form_opened');
  imageForm.classList.remove('popup__review-image_opened');
  popupContainer.classList.remove('popup__container_type_form');
  popupContainer.classList.remove('popup__container_type_image');
}

function openForm() {
  openPopup();
  popup.classList.add('popup_opacity_strong');
  popupContainer.classList.add('popup__container_type_form');
}

function openProfileForm() {
  openForm();
  profileForm.classList.add('popup__form_opened');
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileNameDescription.textContent;
}

function openPlaceForm() {
  openForm();
  placeForm.classList.add('popup__form_opened');
}

function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileNameDescription.textContent = inputProfileDescription.value;
  closePopup();
}

function renderPlace(data) {
  let newPlace = templateElement.content.cloneNode(true);
  newPlace.querySelector('.place-card__title').textContent = data.name;
  newPlace.querySelector('.place-card__image').src = data.link;
  newPlace.querySelector('.place-card__image').alt = data.name;
  setListenerRemove(newPlace);
  setListenerLike(newPlace);
  setListenerReview(newPlace);
  placeElement.prepend(newPlace);
  
}

function submitPlaceForm(event) {
  event.preventDefault();
  const newPlaceName = inputPlaceName.value;
  const newPlaceURL = inputPlaceURL.value;
  renderPlace({link: newPlaceURL, name: newPlaceName});
  event.target.reset();
  closePopup();
}

function removePlace(event) {
  const place = event.target.closest('.place-card');
  place.remove();
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
  openPopup();
  popup.classList.add('popup_opacity_lite');
  popupContainer.classList.add('popup__container_type_image');
  imageForm.classList.add('popup__review-image_opened');
  imageForm.querySelector('.popup__image-title').textContent = event.target.alt;
  imageForm.querySelector('.popup__image').src = event.target.src;
  imageForm.querySelector('.popup__image').alt = event.target.alt;
}

function setListenerReview(image) {
  image.querySelector('.place-card__image').addEventListener('click', openImage);
}

initialCards.map(renderPlace);

editProfileBtn.addEventListener('click', openProfileForm);
addPlaceBtn.addEventListener('click', openPlaceForm);
popupCloseBtn.addEventListener('click', closePopup);
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm);
