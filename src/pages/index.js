import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { settings } from "../utils/constants.js";
import UserApi from "../components/UserApi.js";
import CardApi from "../components/CardApi.js";
import PopupDelete from "../components/PopupDelete.js";

const buttonEdit = document.querySelector(".profile__button-edit");
const inputName = document.querySelector(".popup__input_field_name");
const inputFeature = document.querySelector(".popup__input_field_feature");
const profileCloseButton = document.querySelector(".popup__close-icon");
const buttonAdd = document.querySelector(".profile__button-add");
const buttonAvatar = document.querySelector(".profile__avatar-edit");
const closeButtonAdd = document.querySelector(".popup__close-icon_create-card");
const popupBigImageCloseIcon = document.querySelector(
  ".popup__close-icon_popup-card"
);

const formList = Array.from(document.querySelectorAll(".popup__form"));
const cardPopup = new PopupWithImage(".popup_card");
const addCardPopup = new PopupWithForm(".popup_create-card", handleFormAddCard);
const deleteCardPopup = new PopupDelete(".popup_delete", handleCardRemove);
const avatarPopup = new PopupWithForm(".popup_avatar", handleFormUpdateAvatar);
const editProfilePopup = new PopupWithForm(
  ".popup_profile",
handleFormUserInfo
);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  featureSelector: ".profile__feature",
  avatarSelector: ".profile__avatar",
});

const userApi = new UserApi({
  url: "https://mesto.nomoreparties.co/v1/cohort-62/users/me",
  auth: "83b38506-64f5-462f-9bf3-410e2163a0f8",
});
const cardApi = new CardApi({
  url: "https://mesto.nomoreparties.co/v1/cohort-62/cards",
  auth: "83b38506-64f5-462f-9bf3-410e2163a0f8",
});

cardPopup.setEventListeners();
avatarPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();

function createCardElement(item) {
  const card = new Card(
    item,
    "#card",
    ({ name, link }) => cardPopup.open({ name, link }),
    (card, id) => deleteCardPopup.open(card, id),
    (data) => handleLikeClick(data)
  );
  return card.getCardElement();
}
function handleFormUserInfo({ name, feature }, button){
  button.innerText = "Сохранение...";
    userApi
    .updateInfo(name, feature)
    .then(() => {
      userInfo.setUserInfo(name, feature);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfilePopup.close()
      button.innerText = "Сохранить";
    });

}

function handleFormAddCard({ name, link }, button) {
  button.innerText = "Сохранение...";
  cardApi
    .addCard({ name, link })
    .then((card) => {
      section.addItem(createCardElement(card), true);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addCardPopup.close();
      button.innerText = "Сохранить";
    });
}

function handleFormUpdateAvatar({ link }, button) {
  button.innerText = "Сохранение...";
  userApi
    .updateAvatar(link)
    .then(() => {
      userInfo.setAvatar(link);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      avatarPopup.close();
      button.innerText = "Сохранить";
    });
}

function handleCardRemove(card, id) {
  cardApi
    .deleteCard(id)
    .then(() => card.remove())
    .catch((err) => console.log(err))
    .finally(() => deleteCardPopup.close());
}

function handleLikeClick({ likeButton, likeCount, id }) {
  const isLiked = likeButton.classList.contains("elements__button-like_active");
  cardApi
    .like(id, isLiked)
    .then((res) => {
      likeButton.classList.toggle("elements__button-like_active");
      likeCount.innerText = res.likes.length;
    })
    .catch((err) => console.log(err));
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
buttonAvatar.addEventListener("click", () => avatarPopup.open());

const section = new Section(createCardElement, ".elements");

formList.forEach((form) => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
});
userApi
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => console.log(err));
cardApi
  .getCards()
  .then((cards) => section.renderItems(cards))
  .catch((err) => console.log(err));
