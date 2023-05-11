export default class UserInfo {
  constructor(selectorUserName, selectorUserActivity, selectorUserAvatar) {
    this._userName = document.querySelector(selectorUserName);
    this._userActivity = document.querySelector(selectorUserActivity);
    this._userAvatar = document.querySelector(selectorUserAvatar);
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      useractivity: this._userActivity.textContent
    };
  }

  setUserInfo({ name, activity, avatar }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
    this._userAvatar.src = avatar;
  }
}
