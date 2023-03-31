export default class UserInfo {
  constructor({ nameSelector, featureSelector, avatarSelector, id }) {
    this._name = document.querySelector(nameSelector);
    this._feature = document.querySelector(featureSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, feature: this._feature.textContent};
  }

  setUserInfo(name, feature) {
    this._name.textContent = name;
    this._feature.textContent = feature;
  }
  setAvatar(url) {
    this._avatar.src = url;
  }
}
