import '../pages/index.css';
import { initialCards, indexConfig, cardConfig, popupConfig, validateConfig } from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";

const profile = document.querySelector(indexConfig.popupProfileSelector);
const inputProfileName = profile.querySelector(indexConfig.profileInputNameSelector);
const inputProfileDescription = profile.querySelector(indexConfig.profileInputDescriptionSelector);
const buttonEditProfile = document.querySelector(indexConfig.editButtonSelector);
const buttonAddPlace = document.querySelector(indexConfig.addButtonSelector);

const profileValidator = new FormValidator(validateConfig, document.forms.profileForm);
const placeValidator = new FormValidator(validateConfig, document.forms.placeForm);
const user = new UserInfo(indexConfig.profileNameSelector, indexConfig.profileDescriptionSelector);

const popupImage = new PopupWithImage(indexConfig.popupImageSelector, popupConfig);
popupImage.setEventListeners();

const popupProfile = new PopupWithForm(indexConfig.popupProfileSelector, (userData) => {
  user.setUserInfo(userData);
}, popupConfig);
popupProfile.setEventListeners();

//функция генерации новой карточки
function generateCard(cardItem) {
  const card = new Card(cardItem, cardConfig, () => {
  popupImage.open(cardItem);
});
const newPlace = card.createCard();
return newPlace;
}

const popupPlace = new PopupWithForm(indexConfig.popupPlaceSelector, (cardItem) => {
  const newPlace = generateCard(cardItem);
  cardsList.addItem(newPlace);
}, popupConfig);
popupPlace.setEventListeners();

//рендеринг стартового набора карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const newPlace = generateCard(cardItem);
    cardsList.addItem(newPlace);
  },
},
indexConfig.cardListSelector
); 

cardsList.renderItem();

//кнопка открытия формы редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.userName;
  inputProfileDescription.value = userData.userInfo;
  //очистка ошибок инпутов
  profileValidator.clearValidationErrors();
  //активация кнопки после присваивания значений инпутам
  profileValidator.toggleButtonState();
  popupProfile.open();
});

//кнопка добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  //предварительная деактивация кнопки
  placeValidator.toggleButtonState();
  //очистка ошибок инпутов
  placeValidator.clearValidationErrors();
  popupPlace.open();
});

//валидация заполнения форм
profileValidator.enableValidation();
placeValidator.enableValidation();
