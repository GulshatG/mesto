let popupEl = document.querySelector('.popup');
let button = document.querySelector('.profile__button-edit');
let nameTitle = document.querySelector('.profile__name');
let feature = document.querySelector('.profile__feature');
let inputName = document.querySelector('#nameInput');
let inputFeature = document.querySelector('#feature');
let cloceButton = document.querySelector('.popup__close-icon');
let buttonSave = document.querySelector('.popup__button');

button.addEventListener('click', editButtonClicked);
cloceButton.addEventListener('click', clocePopup);
buttonSave.addEventListener('click', save);

function editButtonClicked() {
    popupEl.classList.add('popup_opened');
    inputName.value = nameTitle.textContent;
    inputFeature.value = feature.textContent;
}

function clocePopup() {
    popupEl.classList.remove('popup_opened');
}

function save(evn) {
    evn.preventDefault();
 nameTitle.textContent = inputName.value;
 feature.textContent = inputFeature.value;
 clocePopup();   
}