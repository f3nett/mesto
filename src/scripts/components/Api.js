class Api {
    constructor({url, token}) {
        this._url = url;
        this._token = token;
    }

    getUser() {
    //получение информации о пользователе
        return fetch(`${this._url}/users/me`, {
            headers: {
              authorization: this._token
            }
          })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })  
    }

    setUserData(userData) {
    //обновление информации о пользователе
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: userData.name, about: userData.about})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    setUserPhoto(userPhoto) {
    //обновление аватара пользователя
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: userPhoto.avatar})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    getCards() {
    //получение стартового набора карточек с сервера
        return fetch(`${this._url}/cards`, {
            headers: {
              authorization: this._token
            }
          })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    postCard(card) {
    //пост новой карточки на сервер
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: card.name, link: card.link})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    deleteCard(cardId) {
    //удаление карточки по ее id
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    addLike(cardId) {
    //добавление лайка карточке
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    deleteLike(cardId) {
    //удаление лайка с карточки
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })        
    }
}

export default Api;