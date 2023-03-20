export default class UserInfo {
  constructor({nameSelector, featureSelector}) {
    this._name = document.querySelector(nameSelector);
    this._feature = document.querySelector(featureSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, feature: this._feature.textContent};
  }

  setUserInfo(name, feature) {
    this._name.textContent = name;
    this._feature.textContent = feature;
  }
}
