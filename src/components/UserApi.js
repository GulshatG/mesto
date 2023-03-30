import Api from "./Api.js";

export default class UserApi extends Api {
  constructor({ url, auth }) {
    super({ url, auth });
  }

  getUserInfo() {
    return fetch(this._url, {
      headers: {
        authorization: this._auth,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject;
      })
      .catch((err) => console.log("err in UserApi" + err));
  }

  updateInfo(name, feature) {
    return fetch(this._url, {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: feature,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject;
      })
      .catch((err) => console.log("err in UserApi" + err));
  }
  updateAvatar(link) {
    return fetch(this._url + "/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject;
      })
      .catch((err) => console.log("err in UserApi" + err));
  }
}
