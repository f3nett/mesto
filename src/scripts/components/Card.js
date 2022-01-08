class Card {
    constructor (data, config, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = config.cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._cardButtonSelector = config.cardButtonSelector;
        this._likeButtonSelector = config.likeButtonSelector;
        this._trashButtonSelector = config.trashButtonSelector;
        this._cardTitleSelector = config.cardTitleSelector;
        this._cardImageSelector = config.cardImageSelector;
        this._activeLikeButtonClass = config.activeLikeButtonClass;
        this._placeCardSelector = config.placeCardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector(this._placeCardSelector)
          .cloneNode(true);
    
        return cardElement;
    }

    _removeCard() {
        this._element.remove();
    }

    _likeCard() {
        this._element.querySelector(this._likeButtonSelector).classList.toggle(this._activeLikeButtonClass);
    }

    _setEventListeners() {
        this._element.querySelector(this._trashButtonSelector).addEventListener('click', () => this._removeCard());
        this._element.querySelector(this._likeButtonSelector).addEventListener('click', () => this._likeCard());
        this._element.querySelector(this._cardButtonSelector).addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector(this._cardTitleSelector).textContent = this._name;
        this._element.querySelector(this._cardImageSelector).src = this._link;
        this._element.querySelector(this._cardImageSelector).alt = this._name;
        this._setEventListeners();
        return this._element;
    }
}

export default Card;
