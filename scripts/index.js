import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
    const card = new Card(item, '#card', openPopup);
    return card.getCardElement();
}

function editButtonClicked() {
    openPopup(profilePopup);
    inputName.value = profileName.textContent;
    inputFeature.value = profileFeature.textContent;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function saveProfileInfo(evn) {
    evn.preventDefault();
    profileName.textContent = inputName.value;
    profileFeature.textContent = inputFeature.value;
    closePopup(profilePopup);
}

function renderCard(card) {
    elements.append(card);
}

function renderCardAtTheBeginning(name, link) {
    const item = {name: name, link: link};
    elements.prepend(createCardElement(item));
}

function handleFormAddCard(evn) {
    evn.preventDefault();
    const name = inputTitle.value;
    const link = inputLink.value;
    renderCardAtTheBeginning(name, link);
    evn.target.reset();
    closePopup(popupAdd);
}


function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
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


buttonEdit.addEventListener('click', editButtonClicked);
profileCloseButton.addEventListener('click', () => closePopup(profilePopup));
popupFormProfile.addEventListener('submit', saveProfileInfo);
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
popupFormAddCard.addEventListener('submit', handleFormAddCard);
popupBigImageCloseIcon.addEventListener('click', () => closePopup(popupCard));


initialCards.forEach((item) => {
    renderCard(createCardElement(item));
});

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