import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector, config) {
        super(popupSelector, config);
        this._popup = document.querySelector(popupSelector);
        this._viewTitleSelector = config.viewTitleSelector;
        this._viewSelector = config.viewSelector;
    }
    
    open(card) {
        this._popup.querySelector(this._viewTitleSelector).textContent = card.name;
        this._popup.querySelector(this._viewSelector).src = card.link;
        this._popup.querySelector(this._viewSelector).alt = card.name;
        super.open();
    }
}

export default PopupWithImage;