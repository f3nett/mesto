class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userNameSelector = userNameSelector;
        this._userInfoSelector = userInfoSelector;
    }

    getUserInfo() {
    //возвращает объект с данными пользователя
        const userName = document.querySelector(this._userNameSelector).textContent;
        const userInfo = document.querySelector(this._userInfoSelector).textContent;
        return {userName, userInfo};
    }

    setUserInfo(userData) {
    //принимает новые данные пользователя и добавляет их на страницу 
    if (userData.name !== '' | userData.description !=='') {
        document.querySelector(this._userNameSelector).textContent = userData.name;
        document.querySelector(this._userInfoSelector).textContent = userData.description;
    }
    }
}

export default UserInfo;