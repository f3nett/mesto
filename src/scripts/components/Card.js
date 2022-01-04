import { cardConfig as config } from "../../scripts/utils/constants.js";

class Card {
    constructor (data, cardSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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

    _setEventListeners() {
        this._element.querySelector(config.trashButtonSelector).addEventListener('click', () => this._removeCard());
        this._element.querySelector(config.likeButtonSelector).addEventListener('click', () => this._likeCard());
        this._element.querySelector(config.cardButtonSelector).addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
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
