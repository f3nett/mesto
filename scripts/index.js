let page = document.querySelector('.page')
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let popupOpenBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__input_type_name');
let inputDescription = popup.querySelector('.popup__input_type_descriprion');
let profileName = document.querySelector('.profile__name');
let profileDescription= document.querySelector('.profile__description');

function popupOpen() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function submitForm (event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popupClose();
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
form.addEventListener('submit', submitForm);
