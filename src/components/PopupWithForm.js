import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._form.querySelector(".popup__button");
  }

  _getInputValues() {
    const inputs = {};
    this._formInputs.forEach((input) => {
      inputs[input.name] = input.value;
    });
    return inputs;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._button);
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
