const popupBigImgTitle = document.querySelector('.popup__big-img-title');
const popupBigImage = document.querySelector('.popup__big-image');
const popupCard = document.querySelector('.popup_card');

export default class Card {
    constructor(data, selector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const template = document.querySelector(this._selector).content.querySelector('.elements__element');
        return template.cloneNode(true);
    }

    _clickLike(evt) {
        evt.target.classList.toggle('elements__button-like_active');
    }


    _openImagePopup() {
        // popupBigImgTitle.innerText = this._name;
        // popupBigImage.setAttribute('src', this._link);
        // popupBigImage.setAttribute('alt', this._name);
        this._handleCardClick({name: this._name, link: this._link});
    }

    _createCard() {
        this._card = this._getElement();
        this._card.querySelector('.elements__name').innerText = this._name;
        this._cardImg = this._card.querySelector('.elements__picture');
        this._cardImg.src = this._link;
        this._cardImg.setAttribute('alt', this._name);

        this._addListenersToCard();
        return this._card;
    }

    _addListenersToCard() {
        const likeButton = this._card.querySelector('.elements__button-like');
        likeButton.addEventListener('click', this._clickLike);
        const trashIcon = this._card.querySelector('.elements__trash-icon');
        trashIcon.addEventListener('click', () => {
            this._card.remove();
        });
        this._cardImg.addEventListener('click', () => {
            this._openImagePopup()
        });

    }


    getCardElement() {
        return this._createCard();
    }
}