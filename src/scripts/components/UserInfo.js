export default class UserInfo {
  constructor(selectorUserName, selectorUserActivity) {
    this._userName = document.querySelector(selectorUserName);
    this._userActivity = document.querySelector(selectorUserActivity);
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      useractivity: this._userActivity.textContent
    };
  }

  setUserInfo({ name, activity }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  }
}
