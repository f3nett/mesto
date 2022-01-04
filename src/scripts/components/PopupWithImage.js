import Popup from "./Popup.js";
import { popupConfig as config } from "../utils/constants.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
    }
    
    open(card) {
        this._popup.querySelector(config.viewTitleSelector).textContent = card.name;
        this._popup.querySelector(config.viewSelector).src = card.link;
        this._popup.querySelector(config.viewSelector).alt = card.name;
        super.open();
    }
}

export default PopupWithImage;