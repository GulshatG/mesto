const popupEditInfo = document.querySelector('.popup_edit-info');
const popupAddCard = document.querySelector('.popup_add-card');
const buttonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileFeature = document.querySelector('.profile__feature');
const inputName = document.querySelector('.popup__input_field_name');
const inputTitle = document.querySelector('.popup__input_field_title');
const inputFeature = document.querySelector('.popup__input_field_feature');
const inputLink = document.querySelector('.popup__input_field_link');
const closeButtonPopupEditInfo = document.querySelector('.popup__close-icon_edit-info');
const closeButtonAddCard = document.querySelector('.popup__close-icon_add-card');
const closeButtonCardPopup = document.querySelector('.popup__close-icon_popup-card');
const popupFormEditInfo = document.querySelector('.popup__form_edit-info');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const elements = document.querySelector('.elements');
const templateCard = document.querySelector('#card').content;
const profileButtonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_card');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(name, link) {
    let card = templateCard.querySelector('.elements__element').cloneNode(true);
    let cardImg = card.querySelector('.elements__picture');
    cardImg.src = link;
    cardImg.setAttribute('alt', name);
    card.querySelector('.elements__name').innerText = name;
    card.querySelector('.elements__button-like').addEventListener('click', likeButtonClicked);
    card.querySelector('.elements__trash-icon').addEventListener('click', trashButtonClicked);
    card.querySelector('.elements__picture').addEventListener('click', cardImageClicked);

    return card;
}

function renderCard(name, link) {
    elements.append(createCard(name, link));
}

function renderCardWithPrepend(name, link) {
    elements.prepend(createCard(name, link));
}

function profileButtonAddClicked() {
    openPopup(popupAddCard);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


function editButtonClicked() {
    openPopup(popupEditInfo);
    inputName.value = profileName.textContent;
    inputFeature.value = profileFeature.textContent;
}

function likeButtonClicked(evt) {
    evt.target.classList.toggle('elements__button-like_active');
}

function trashButtonClicked(evt) {
    let element = evt.target.closest('.elements__element');
    element.remove();
}

function closeButtonPopupEditInfoClicked() {
    closePopup(popupEditInfo);
}

function closeButtonPopupAddCardClicked() {
    closePopup(popupAddCard);
}
function closeButtonCardPopupClicked(){
    closePopup(popupCard);
}
function cardImageClicked(evt){
    let image = popupCard.querySelector('.popup__image');
    let info = popupCard.querySelector('.popup__image-info');
    let subtitle = evt.target.parentElement.querySelector('.elements__name').innerText;
    image.src = evt.target.src;
    image.setAttribute('alt', evt.target.getAttribute('alt'));
    info.innerText = subtitle;
    openPopup(popupCard);
}


function popupFormEditInfoSubmitted(evn) {
    evn.preventDefault();
    profileName.textContent = inputName.value;
    profileFeature.textContent = inputFeature.value;
    closePopup(popupEditInfo);
}

function popupFormAddCardSubmitted(evn) {
    evn.preventDefault();
    renderCardWithPrepend(inputTitle.value, inputLink.value);
    inputTitle.value = '';
    inputLink.value = '';
    closePopup(popupAddCard);
}


buttonEdit.addEventListener('click', editButtonClicked);
closeButtonPopupEditInfo.addEventListener('click', closeButtonPopupEditInfoClicked);
popupFormEditInfo.addEventListener('submit', popupFormEditInfoSubmitted);
popupFormAddCard.addEventListener('submit', popupFormAddCardSubmitted);
profileButtonAdd.addEventListener('click', profileButtonAddClicked);
closeButtonAddCard.addEventListener('click', closeButtonPopupAddCardClicked);
closeButtonCardPopup.addEventListener('click', closeButtonCardPopupClicked);
initialCards.forEach((item) => {
    renderCard(item.name, item.link);
})