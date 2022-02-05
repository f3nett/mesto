import Popup from "./Popup";

class PopupWithRemove extends Popup {
    constructor(popupSelector, config) {
        super(popupSelector, config);
        this._popup = document.querySelector(popupSelector);
    }

    setItemForRemove(item) {
    //устанавливает объект для удаления
        this._item = item;
    }

    setSubmitForm({handleSubmit}) {
    //устанавливает саблит из коллбека
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
    //добавляет обработчик сабмита формы
        super.setEventListeners(); 
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._item);
        });
    }
}

export default PopupWithRemove;
