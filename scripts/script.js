const popupEl = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button-edit');
const profileFeature = document.querySelector('.profile__feature');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.popup__input_field_name');
const inputFeature = document.querySelector('.popup__input_field_feature');
const cloceButton = document.querySelector('.popup__close-icon');
const popupForm = document.querySelector('.popup__form');
const elements = document.querySelector('.elements');
const template = document.querySelector('#card').content;
const buttonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup__button-add');
const cloceButtonAdd = document.querySelector('.button-add__close-icon');
const buttonAddName = document.querySelector('.button-add__name');
const buttonAddPicter  = document.querySelector('.button-add__img');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const inputTitle = document.querySelector('.popup__input_field_title');
const inputLink = document.querySelector('.popup__input_field_link');
const popupCard = document.querySelector('.popup__card');
const popupBigImgTitle = document.querySelector('.popup__big-img-title');
const popupBigImage = document.querySelector('.popup__big-image');
const popupBigImageCloseIcon = document.querySelector('.popup__close-icon_popup-card');

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

function editButtonClicked() {
    popupEl.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputFeature.value = profileFeature.textContent;
}

function closePopup() {
    popupEl.classList.remove('popup_opened');
}

function buttonAddClicked() {
    popupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
    popupAdd.classList.remove('popup_opened'); 
}

function closePopupCard() {
    popupCard.classList.remove('popup_opened'); 
}

function saveProfileInfo(evn) {
    evn.preventDefault();
    profileName.textContent = inputName.value;
    profileFeature.textContent = inputFeature.value;
    closePopup();
}

function createCard(name, link) {
    const card = template.cloneNode(true);
    card.querySelector('.elements__name').innerText = name;
    const cardImg = card.querySelector('.elements__picture');
    cardImg.src = link;
    cardImg.setAttribute('alt', name);
    const likeButton = card.querySelector('.elements__button-like');
    likeButton.addEventListener('click', () => {
        let likeImg =  likeButton.firstElementChild;
        let likeUrl = likeImg.getAttribute('src');
        if (likeUrl === "../image/Vector-active.svg") {
            likeImg.setAttribute('src',"../image/Vector.svg");
        }
        else {
            likeImg.setAttribute('src',"../image/Vector-active.svg");
        }
    });
    const trashIcon = card.querySelector('.elements__trash-icon');
    trashIcon.addEventListener('click', () => {
        trashIcon.closest('.elements__element').remove();
    });
    cardImg.addEventListener('click', () => cardImageClicked(name, link));
    return card;
}

function cardImageClicked(name, link) {
    popupBigImgTitle.innerText = name;
    popupBigImage.setAttribute('src', link);
    popupBigImage.setAttribute('alt', name);
    popupCard.classList.add('popup_opened');
}

function renderCard(name, link) {
   const card = createCard(name, link);
    elements.append(card);
}

function renderCardToPrepend(name, link) {
    const card = createCard(name, link);
    elements.prepend(card);
}

function popupFormAddCardSubmited(evn) {
    evn.preventDefault();
    const name = inputTitle.value;
    const link = inputLink.value;
    renderCardToPrepend(name, link);
    inputTitle.value = "";
    inputLink.value = "";
    closePopupAdd();
}

buttonEdit.addEventListener('click', editButtonClicked);
cloceButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfileInfo);
buttonAdd.addEventListener('click', buttonAddClicked);
cloceButtonAdd.addEventListener('click', closePopupAdd);
popupFormAddCard.addEventListener('submit', popupFormAddCardSubmited);
popupBigImageCloseIcon.addEventListener('click', closePopupCard);

initialCards.forEach((item) => {
    renderCard(item.name, item.link);
})