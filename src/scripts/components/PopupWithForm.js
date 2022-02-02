import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit, config) {
        super(popupSelector, config);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector(config.formSelector);
        this._submitBtn = this._popup.querySelector(config.submitSelector);
        this._formSubmit = formSubmit;
        this._inputList = this._popup.querySelectorAll(config.inputSelector);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _getInputValues() {
    //собирает данные всех полей формы
        this._inputValues = {};
        this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    _handleSubmit(evt) {
    //функция саблита формы
        evt.preventDefault();
        this.setLoadingStatus(true);
        this._formSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
    //добавляет обработчик сабмита формы
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleSubmit);
    }

    close() {
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
        super.close();
        this._popupForm.reset();
    }

    setLoadingStatus(is_load) {
    //устанавливает надпись на кнопке сабмита в зависимости от статуса загрузки
        if (is_load) {
            this._submitText = this._submitBtn.textContent;
            this._submitBtn.textContent = 'Сохранение...'
        } else {
            this._submitBtn.textContent = this._submitText;
        }
    }
    
}

export default PopupWithForm;
