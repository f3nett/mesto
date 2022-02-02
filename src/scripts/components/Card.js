class Card {
    constructor (data, config, handleCardClick, {handleDeleteCardClick, addLike, deleteLike}, userId) {
        this._cardId = data._cardId;
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes ? data.likes: [];
        this._ownerId = data.ownerId;
        this._cardSelector = config.cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._cardButtonSelector = config.cardButtonSelector;
        this._likeButtonSelector = config.likeButtonSelector;
        this._trashButtonSelector = config.trashButtonSelector;
        this._cardTitleSelector = config.cardTitleSelector;
        this._cardImageSelector = config.cardImageSelector;
        this._activeLikeButtonClass = config.activeLikeButtonClass;
        this._placeCardSelector = config.placeCardSelector;
        this._likeCounterSelector = config.likeCounterSelector;
        this._activeTrashBtnClass = config.activeTrashBtnClass;
        this._userId = userId;
    }

    _getTemplate() {
    //получить шаблон для отрисовки карточки
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector(this._placeCardSelector)
          .cloneNode(true);
    
        return cardElement;
    }

    _likeCard() {
    //обработка событий проставления лайков
        if (this._likes.some((item) => {
            return item._id == this._userId
            }) === true) {
            this._deleteLike();
            this._element.querySelector(this._likeButtonSelector).classList.remove(this._activeLikeButtonClass);
        } else {
                this._addLike();
                this._element.querySelector(this._likeButtonSelector).classList.add(this._activeLikeButtonClass);
        }
    }

    _setEventListeners() {
        if (this._isOwnerCard()) {
        this._element.querySelector(this._trashButtonSelector).addEventListener('click', () => this._handleDeleteCardClick());
        }
        this._element.querySelector(this._likeButtonSelector).addEventListener('click', () => this._likeCard());
        this._element.querySelector(this._cardButtonSelector).addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));   
    }

    _isOwnerCard() {
    //проверка является ли пользователь владельцем карточки
        if (this._ownerId === this._userId) {
        return true;
        }
    }

    removeCard() {
    //удалить карточку из секции
        this._element.remove();
    }

    createCard() {
    //сгенерировать карточку по шаблону
        this._element = this._getTemplate();
        this._element.querySelector(this._cardTitleSelector).textContent = this._name;
        this._element.querySelector(this._cardImageSelector).src = this._link;
        this._element.querySelector(this._cardImageSelector).alt = this._name;
        this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
        if (!this._isOwnerCard()) {
            this._element.querySelector(this._trashButtonSelector).classList.remove(this._activeTrashBtnClass);
        }
        if (this._likes.some((item) => {
            return item._id == this._userId
            }) === true) {
            this._element.querySelector(this._likeButtonSelector).classList.add(this._activeLikeButtonClass);
        }
        this._setEventListeners();
        return this._element;
    } 

    updateLikes(cardData) {
    //обновить кол-во лайков на карточке
            this._likes = cardData.likes;
            this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
        }
}

export default Card;
