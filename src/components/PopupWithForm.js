import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form");
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
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
