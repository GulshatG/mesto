import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const buttonEdit = document.querySelector('.profile__button-edit');
const inputName = document.querySelector('.popup__input_field_name');
const inputFeature = document.querySelector('.popup__input_field_feature');
const profileCloseButton = document.querySelector('.popup__close-icon');
const buttonAdd = document.querySelector('.profile__button-add');
const closeButtonAdd = document.querySelector('.popup__close-icon_create-card');
const popupBigImageCloseIcon = document.querySelector('.popup__close-icon_popup-card');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const cardPopup = new PopupWithImage('.popup_card');
const addCardPopup = new PopupWithForm('.popup_create-card', handleFormAddCard);
const editProfilePopup = new PopupWithForm('.popup_profile', ({name, feature}) => {
    userInfo.setUserInfo(name, feature);
    editProfilePopup.close();
});
const userInfo = new UserInfo({nameSelector: '.profile__name', featureSelector: '.profile__feature'});

cardPopup.setEventListeners();
addCardPopup.setEventListeners()
editProfilePopup.setEventListeners();


const initialCards = [{
    name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
    name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
    name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
    name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

function createCardElement(item) {
    const card = new Card(item, '#card', ({name, link}) => cardPopup.open({name, link}));
    return card.getCardElement();
}


function handleFormAddCard({name, link}) {
    section.addItem(createCardElement({name, link}), true)
    addCardPopup.close()
}


buttonEdit.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    inputName.value = info.name;
    inputFeature.value = info.feature;
    editProfilePopup.open()
});
profileCloseButton.addEventListener('click', () => editProfilePopup.close());
buttonAdd.addEventListener('click', () => addCardPopup.open());
closeButtonAdd.addEventListener('click', () => addCardPopup.close());
popupBigImageCloseIcon.addEventListener('click', () => cardPopup.close());


const section = new Section({items: initialCards, renderer: createCardElement}, '.elements');
section.renderItems()


const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

formList.forEach((form) => {
    const validator = new FormValidator(settings, form);
    validator.enableValidation();
})