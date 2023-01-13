let popupEl = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileFeature = document.querySelector('.profile__feature');
let inputName = document.querySelector('.popup__input_field_name');
let inputFeature = document.querySelector('.popup__input_field_feature');
let cloceButton = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup__form');

function editButtonClicked() {
    popupEl.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputFeature.value = profileFeature.textContent;
}

function clocePopup() {
    popupEl.classList.remove('popup_opened');
}

function saveProfileInfo(evn) {
    evn.preventDefault();
    profileName.textContent = inputName.value;
    profileFeature.textContent = inputFeature.value;
    clocePopup();
}

buttonEdit.addEventListener('click', editButtonClicked);
cloceButton.addEventListener('click', clocePopup);
popupForm.addEventListener('submit', saveProfileInfo);