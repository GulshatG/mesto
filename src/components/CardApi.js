import Api from "./Api.js";

export default class CardApi extends Api {
  constructor({ url, auth }) {
    super({ url, auth });
  }

  getCards() {
    return fetch(this._url, {
      headers: {
        authorization: this._auth,
      },
    }).then(this._checkResponse);
  }
  addCard({ name, link }) {
    return fetch(this._url, {
      method: "POST",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._url + "/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._auth,
      },
    }).then(this._checkResponse);
  }

  like(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(this._url + "/" + id + "/likes", {
      method: method,
      headers: {
        authorization: this._auth,
      },
    }).then(this._checkResponse);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject;
  }
}
