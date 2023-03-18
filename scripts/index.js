import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const profilePopup = document.querySelector('.popup_profile');
const buttonEdit = document.querySelector('.profile__button-edit');
const profileFeature = document.querySelector('.profile__feature');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.popup__input_field_name');
const inputFeature = document.querySelector('.popup__input_field_feature');
const profileCloseButton = document.querySelector('.popup__close-icon');
const popupFormProfile = document.querySelector('.popup__form_profile');
const elements = document.querySelector('.elements');
const buttonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_create-card');
const closeButtonAdd = document.querySelector('.popup__close-icon_create-card');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const inputTitle = document.querySelector('.popup__input_field_title');
const inputLink = document.querySelector('.popup__input_field_link');
const popupCard = document.querySelector('.popup_card');
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


// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEsc);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEsc);
// }


function renderCardAtTheBeginning(name, link) {
    const item = {name: name, link: link};
    elements.prepend(createCardElement(item));
}

function handleFormAddCard({name, link}) {
    // const name = inputTitle.value;
    // const link = inputLink.value;
    section.addItem(createCardElement({name, link}), true)
    addCardPopup.close()
}




function addListenersToAllPopup() {
    const popups = Array.from(document.querySelectorAll('.popup'));
    popups.forEach((popup) => {

        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
        });

    })
}


buttonEdit.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    inputName.value = info.name;
    inputFeature.value = info.feature;
    editProfilePopup.open()
});
profileCloseButton.addEventListener('click', () => editProfilePopup.close());
// popupFormProfile.addEventListener('submit', saveProfileInfo);
buttonAdd.addEventListener('click', () => addCardPopup.open());
closeButtonAdd.addEventListener('click', () => addCardPopup.close());
// popupFormAddCard.addEventListener('submit', handleFormAddCard);
popupBigImageCloseIcon.addEventListener('click', () => cardPopup.close());


const section = new Section({items: initialCards, renderer: createCardElement}, '.elements');
section.renderItems()
// initialCards.forEach((item) => {
//     renderCard(createCardElement(item));
// });

addListenersToAllPopup();

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