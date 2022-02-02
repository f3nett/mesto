class UserInfo {
    constructor(userNameSelector, userInfoSelector, userPhotoSelector) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
        this._userPhotoSelector = userPhotoSelector;
    }

    getUserInfo() {
    //возвращает объект с данными пользователя
        const name = document.querySelector(this._userNameSelector).textContent;
        const about = document.querySelector(this._userInfoSelector).textContent;
        return {name, about};
    }

    getUserPhoto() {
    //возвращает установленный аватар
        const avatar = document.querySelector(this._userPhotoSelector).src;
        return avatar;
    }

    setUserId(userData) {
    //возвращает id пользователя
        return this._userId = userData._id;
    }

    setUserInfo(userData) {
    //принимает новые данные пользователя и добавляет их на страницу 
    if (userData.name !== '' | userData.about !=='') {
        document.querySelector(this._userNameSelector).textContent = userData.name;
        document.querySelector(this._userInfoSelector).textContent = userData.about;
    }
    }

    setUserPhoto(userPhoto) {
    //устанавливает новый аватар
        document.querySelector(this._userPhotoSelector).src = userPhoto.avatar;
    }
}

export default UserInfo;
