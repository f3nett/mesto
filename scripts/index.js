let page = document.querySelector('.page')
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let popupOpenBtn = document.querySelector('.profile-info__edit-button');
let popupCloseBtn = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__name');
let inputDescription = popup.querySelector('.popup__description');
let profileName = document.querySelector('.profile-info__name');
let profileDescription= document.querySelector('.profile-info__description');

function popupToggle() {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_no-scroll');
}

function popupOpen() {
    if (popup.classList.contains('popup_opened') === true) {
        return;
    } else {
        popupToggle();
    }
}

function popupClose() {
    if (popup.classList.contains('popup_opened') === true) {
        inputName.value = profileName.textContent;
        inputDescription.value = profileDescription.textContent;
        popupToggle();
    }
}

function clickOverlay(event) {
    if (event.target === event.currentTarget) {
        popupClose();
    }
}

function submitForm (event) {
    event.preventDefault();
    let name = inputName.value;
    let description = inputDescription.value;
    profileName.textContent = name;
    profileDescription.textContent = description;
    popupToggle();
}

popupOpenBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
popup.addEventListener('click', clickOverlay);
form.addEventListener('submit', submitForm);
