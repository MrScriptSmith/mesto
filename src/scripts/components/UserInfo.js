export default class UserInfo {
  constructor(selectorUserName, selectorUserActivity, selectorUserAvatar) {
    this._userName = document.querySelector(selectorUserName);
    this._userActivity = document.querySelector(selectorUserActivity);
    this._userAvatar = document.querySelector(selectorUserAvatar);
    this._userId = null;
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      useractivity: this._userActivity.textContent,
      userId: this._userId
    };
  }

  setUserInfo({ name, activity, avatar, userId }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
    this._userAvatar.src = avatar;
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }

  setUserAvatar(avatarUrl) {
    this._userAvatar.src = avatarUrl;
  }
}
