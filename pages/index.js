import initialCards from "../scripts/utils/initialCards.js";
import { indexConfig as config, validateConfig } from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import FormValidator from "../scripts/components/FormValidator.js";

const profile = document.querySelector(config.popupProfileSelector);
const inputProfileName = profile.querySelector(config.profileInputNameSelector);
const inputProfileDescription = profile.querySelector(config.profileInputDescriptionSelector);
const buttonEditProfile = document.querySelector(config.editButtonSelector);
const buttonAddPlace = document.querySelector(config.addButtonSelector);

const profileValidator = new FormValidator(validateConfig, document.forms.profileForm);
const placeValidator = new FormValidator(validateConfig, document.forms.placeForm);

const user = new UserInfo(config.profileNameSelector, config.profileDescriptionSelector);

const popupImage = new PopupWithImage(config.popupImageSelector);

const popupProfile = new PopupWithForm(config.popupProfileSelector, (userData) => {
  user.setUserInfo(userData);
});

const popupPlace = new PopupWithForm(config.popupPlaceSelector, (cardItem) => {
  const card = new Card(cardItem, config.cardTemplateSelector, () => {
    popupImage.open(cardItem);
  });
  const newPlace = card.createCard();
  cardsList.addItem(newPlace);
});

//рендеринг стартового набора карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, config.cardTemplateSelector, () => {
      popupImage.open(cardItem);
    });
    const newPlace = card.createCard();
    cardsList.addItem(newPlace);
  },
},
config.cardListSelector
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
