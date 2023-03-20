import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupBigImgTitle = this._popup.querySelector(".popup__big-img-title");
    this._popupBigImage = this._popup.querySelector(".popup__big-image");
  }

  open({ name, link }) {
    this._popupBigImgTitle.innerText = name;
    this._popupBigImage.setAttribute("src", link);
    this._popupBigImage.setAttribute("alt", name);
    super.open();
  }
}
