import { openPopup, popupCard } from './index.js'
const popupBigImgTitle = document.querySelector('.popup__big-img-title');
const popupBigImage = document.querySelector('.popup__big-image');

export default class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
    }

    _getElement() {
        const template = document.querySelector(this._selector).content.querySelector('.elements__element');
        const element = template.cloneNode(true);
        return element;
    }

    _clickLike(evt) {
        evt.target.classList.toggle('elements__button-like_active');
    }


    _openImagePopup() {
        popupBigImgTitle.innerText = this._name;
        popupBigImage.setAttribute('src', this._link);
        popupBigImage.setAttribute('alt', this._name);
        openPopup(popupCard);
    }

    _createCard() {
        const card = this._getElement();
        card.querySelector('.elements__name').innerText = this._name;
        const cardImg = card.querySelector('.elements__picture');
        cardImg.src = this._link;
        cardImg.setAttribute('alt', this._name);
        const likeButton = card.querySelector('.elements__button-like');
        likeButton.addEventListener('click', this._clickLike);
        const trashIcon = card.querySelector('.elements__trash-icon');
        trashIcon.addEventListener('click', () => {
            card.remove();
        });
        cardImg.addEventListener('click', () => {
            this._openImagePopup()
        });
        return card;
    }

    getCardElement() {
        return this._createCard();
    }
}