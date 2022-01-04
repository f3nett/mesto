import Popup from "./Popup.js";
import { popupConfig as config } from "../utils/constants.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector(config.formSelector);
        this._formSubmit = formSubmit;
        this._inputList = this._popup.querySelectorAll(config.inputSelector);
    }

    _getInputValues() {
    //собирает данные всех полей формы
        this._inputValues = {};
        this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
    //добавляет не только обработчик клика иконке закрытия, но и обработчик сабмита формы
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
        super.close();
        this._popupForm.reset();
    }
}

export default PopupWithForm;
