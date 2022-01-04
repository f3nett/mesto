import { popupConfig as config } from "../utils/constants.js";

class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(config.openedPopupClass)) {
              this.close();
            }
            if (evt.target.classList.contains(config.closeButtonClass)) {
              this.close();
            }
        });
    }

    open() {
        this._popup.classList.add(config.openedPopupClass);
        this.setEventListeners();
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    close() {
        this._popup.classList.remove(config.openedPopupClass);
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
}

export default Popup;
