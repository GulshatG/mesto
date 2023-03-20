import Popup from "./Popup.js";
const popupBigImgTitle = document.querySelector('.popup__big-img-title');
const popupBigImage = document.querySelector('.popup__big-image');
export default class PopupWithImage extends Popup{
   open({name, link}) {
       popupBigImgTitle.innerText = name;
       popupBigImage.setAttribute('src', link);
       popupBigImage.setAttribute('alt', name);
       super.open();
   }
}