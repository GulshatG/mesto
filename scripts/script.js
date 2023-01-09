let popupEl = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__button-edit');
let nameTitle = document.querySelector('.profile__name');
let profileFeature = document.querySelector('.profile__feature');
let inputName = document.querySelector('.popup__input_line_name');
let inputFeature = document.querySelector('.popup__input_line_feature');
let cloceButton = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup__form');

buttonEdit.addEventListener('click', editButtonClicked);
cloceButton.addEventListener('click', clocePopup);
popupForm.addEventListener('submit', saveProfileInfo);

function editButtonClicked() {
    popupEl.classList.add('popup_opened');
    inputName.value = nameTitle.textContent;
    inputFeature.value = profileFeature.textContent;
}

function clocePopup() {
    popupEl.classList.remove('popup_opened');
}

function saveProfileInfo(evn) {
    evn.preventDefault();
 nameTitle.textContent = inputName.value;
 profileFeature.textContent = inputFeature.value;
 clocePopup();   
}