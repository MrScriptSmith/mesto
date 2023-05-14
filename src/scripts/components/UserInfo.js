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
    if (name !== undefined) {
      this._userName.textContent = name;
    }
    if (activity !== undefined) {
      this._userActivity.textContent = activity;
    }
    if (avatar !== undefined) {
      this._userAvatar.src = avatar;
    }
    if (userId !== undefined) {
      this._userId = userId;
    }
  }

  getUserId() {
    return this._userId;
  }
}
