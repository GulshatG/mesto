import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { settings, initialCards } from "../utils/constants.js";

const buttonEdit = document.querySelector(".profile__button-edit");
const inputName = document.querySelector(".popup__input_field_name");
const inputFeature = document.querySelector(".popup__input_field_feature");
const profileCloseButton = document.querySelector(".popup__close-icon");
const buttonAdd = document.querySelector(".profile__button-add");
const closeButtonAdd = document.querySelector(".popup__close-icon_create-card");
const popupBigImageCloseIcon = document.querySelector(
  ".popup__close-icon_popup-card"
);
const formList = Array.from(document.querySelectorAll(".popup__form"));
const cardPopup = new PopupWithImage(".popup_card");
const addCardPopup = new PopupWithForm(".popup_create-card", handleFormAddCard);
const editProfilePopup = new PopupWithForm(
  ".popup_profile",
  ({ name, feature }) => {
    userInfo.setUserInfo(name, feature);
    editProfilePopup.close();
  }
);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  featureSelector: ".profile__feature",
});

cardPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

function createCardElement(item) {
  const card = new Card(item, "#card", ({ name, link }) =>
    cardPopup.open({ name, link })
  );
  return card.getCardElement();
}

function handleFormAddCard({ name, link }) {
  section.addItem(createCardElement({ name, link }), true);
  addCardPopup.close();
}

buttonEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputFeature.value = info.feature;
  editProfilePopup.open();
});
profileCloseButton.addEventListener("click", () => editProfilePopup.close());
buttonAdd.addEventListener("click", () => addCardPopup.open());
closeButtonAdd.addEventListener("click", () => addCardPopup.close());
popupBigImageCloseIcon.addEventListener("click", () => cardPopup.close());

const section = new Section(createCardElement, ".elements");
section.renderItems(initialCards);

formList.forEach((form) => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
});
