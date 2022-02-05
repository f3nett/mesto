import '../pages/index.css';
import { indexConfig, cardConfig, popupConfig, validateConfig } from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithRemove from '../scripts/components/PopupWithRemove';
import FormValidator from "../scripts/components/FormValidator.js";
import Api from '../scripts/components/Api';

let userId = '';

const profile = document.querySelector(indexConfig.popupProfileSelector);
const avatar = document.querySelector(indexConfig.popupAvatarSelector);
const inputProfileName = profile.querySelector(indexConfig.profileInputNameSelector);
const inputProfileDescription = profile.querySelector(indexConfig.profileInputDescriptionSelector);
const inputProfileAvatar = avatar.querySelector(indexConfig.profileInputAvatarSelector);
const buttonEditProfile = document.querySelector(indexConfig.editButtonSelector);
const buttonAddPlace = document.querySelector(indexConfig.addButtonSelector);
const buttonEditAvatar = document.querySelector(indexConfig.profilePhotoSelector);

const profileValidator = new FormValidator(validateConfig, document.forms.profileForm);
const avatarValidator = new FormValidator(validateConfig, document.forms.avatarForm);
const placeValidator = new FormValidator(validateConfig, document.forms.placeForm);

const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-34', token: 'f9818e95-aa05-4a44-a493-1bf7e5072c11'});
const user = new UserInfo(indexConfig.profileNameSelector, indexConfig.profileDescriptionSelector, indexConfig.profilePhotoSelector);


//попап с открытым изображением карточки
const popupImage = new PopupWithImage(indexConfig.popupImageSelector, popupConfig);
popupImage.setEventListeners();


//попап с данными пользователя
const popupProfile = new PopupWithForm(indexConfig.popupProfileSelector, (userData) => {
  api.setUserData(userData)
    .then(res => {
      console.log('Данные пользователя обновлены:', res);
      user.setUserInfo(userData);
      popupProfile.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => popupProfile.setLoadingStatus(false)
    );
}, 
popupConfig
);
popupProfile.setEventListeners();


//попап подтверждения удаления карточки
const popupRemove = new PopupWithRemove(indexConfig.popupRemoveSelector, popupConfig);
popupRemove.setEventListeners();


//секция с отрисованными карточками
const cardsList = new Section({
  items: [],
  renderer: (cardItem) => {
    const newPlace = generateCard(cardItem);
    cardsList.addItem(newPlace);
  },
},
indexConfig.cardListSelector
);


//функция генерации новой карточки
function generateCard(cardItem) {
  const card = new Card(cardItem, cardConfig, () => {
  popupImage.open(cardItem);
  }, 
  {handleDeleteCardClick: () => {
    popupRemove.open();
    popupRemove.setItemForRemove(cardItem);
    popupRemove.setSubmitForm({handleSubmit: (cardItem) => {
      api.deleteCard(cardItem._cardId)
        .then(res => {
            console.log(res);
            card.removeCard();
            popupRemove.close();
        })
        .catch(err => {
          console.log(err);
        })
    }
    });
  },
  addLike: () => {
    api.addLike(cardItem._cardId)
      .then (res => {
        console.log('Поставлен лайк на карточку:', res);
        card.updateLikes(res);
      })
      .catch(err => {
        console.log(err);
      })
  },
  deleteLike: () => {
    api.deleteLike(cardItem._cardId)
      .then (res => {
        console.log('Удален лайк с карточки:', res);
        card.updateLikes(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  }
  , userId);

const newPlace = card.createCard();
return newPlace;
}

//попап с добавлением новой карточки
const popupPlace = new PopupWithForm(indexConfig.popupPlaceSelector, (cardItem) => {
  api.postCard(cardItem)
    .then(res => {
      console.log('Добавлена новая карточка:', res);
      const newPlace = generateCard({_cardId: res._id, name: res.name, link: res.link, likes: res.likes, ownerId: res.owner._id});
      cardsList.addItem(newPlace);
      popupPlace.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => popupPlace.setLoadingStatus(false)
    );
}, popupConfig);
popupPlace.setEventListeners();


//попап с изменением аватара
const popupAvatar = new PopupWithForm(indexConfig.popupAvatarSelector, (userPhoto) => {
  api.setUserPhoto(userPhoto)
    .then(res => {
      console.log('Аватар обновлен:', res);
      user.setUserPhoto(userPhoto);
      popupAvatar.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => popupAvatar.setLoadingStatus(false)
    );
}, popupConfig);
popupAvatar.setEventListeners();


//кнопка открытия формы редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileDescription.value = userData.about;
  //очистка ошибок инпутов
  profileValidator.clearValidationErrors();
  popupProfile.open();
});

//кнопка добавления новой карточки
buttonAddPlace.addEventListener('click', () => {
  //очистка ошибок инпутов
  placeValidator.clearValidationErrors();
  popupPlace.open();
});

//кнопка изменения аватара
buttonEditAvatar.addEventListener('click', () => {
  const userPhoto = user.getUserPhoto();
  inputProfileAvatar.value = userPhoto;
  //очистка ошибок инпутов
  avatarValidator.clearValidationErrors();
  popupAvatar.open();
})

//валидация заполнения форм
profileValidator.enableValidation();
placeValidator.enableValidation();
avatarValidator.enableValidation();


Promise.all([api.getUser(), api.getCards()])
  .then(([userData, cardsData]) => {
    userId = user.setUserId(userData);
    user.setUserInfo(userData);
    user.setUserPhoto(userData);
    cardsData.forEach((item) => {
      cardsList.addItem({_cardId: item._id, name: item.name, link: item.link, likes: item.likes, ownerId: item.owner._id});
    });
    cardsList.renderItem();
  })
  .catch(err => {
    console.log(err);
  })

