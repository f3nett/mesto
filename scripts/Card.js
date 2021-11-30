import { openPopup } from "./index.js";
import { config } from "./index.js";

class Card {
    constructor (data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector(config.placeCardSelector)
          .cloneNode(true);
    
        return cardElement;
    }

    _removeCard() {
        this._element.remove();
    }

    _likeCard() {
        this._element.querySelector(config.likeButtonSelector).classList.toggle(config.activeLikeButtonClass);
    }

    _openCardImage() {
        const popupImage = document.querySelector(config.popupImageSelector);
        openPopup(popupImage);
        popupImage.querySelector(config.viewTitleSelector).textContent = this._name;
        popupImage.querySelector(config.viewSelector).src = this._link;
        popupImage.querySelector(config.viewSelector).alt = this._name;
    } 

    _setEventListeners() {
        this._element.querySelector(config.trashButtonSelector).addEventListener('click', () => this._removeCard());
        this._element.querySelector(config.likeButtonSelector).addEventListener('click', () => this._likeCard());
        this._element.querySelector(config.cardButtonSelector).addEventListener('click', () => this._openCardImage());
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(config.cardTitleSelector).textContent = this._name;
        this._element.querySelector(config.cardImageSelector).src = this._link;
        this._element.querySelector(config.cardImageSelector).alt = this._name;

        return this._element;
      }
}

export default Card;
