import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card, this._cardId);
    });
    super.setEventListeners();
  }
  open(card, id) {
    this._card = card;
    this._cardId = id;
    super.open();
  }

  close() {
    super.close();
  }
}
