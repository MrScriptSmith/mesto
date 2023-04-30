export default class UserInfo {
  constructor(selectorUserName, selectorUserActivity) {
    this._userName = document.querySelector(selectorUserName);
    this._userActivity = document.querySelector(selectorUserActivity);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      activity: this._userActivity.textContent
    };
  }

  setUserInfo({ name, activity }) {
    this._userName.textContent = name;
    this._userActivity.textContent = activity;
  }
}
