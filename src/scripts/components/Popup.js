class Popup {
    constructor(popupSelector, config) {
        this._popup = document.querySelector(popupSelector);
        this._openedPopupClass = config.openedPopupClass;
        this._closeButtonClass = config.closeButtonClass;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
    //обрабртка события нажатия кнопки Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._openedPopupClass)) {
              this.close();
            }
            if (evt.target.classList.contains(this._closeButtonClass)) {
              this.close();
            }
        });
    }

    open() {
    //открыть попап
        this._popup.classList.add(this._openedPopupClass);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
    //закрыть попап
        this._popup.classList.remove(this._openedPopupClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }
}

export default Popup;
