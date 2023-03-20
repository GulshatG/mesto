export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const template = document.querySelector(this._selector).
        content.
        querySelector('.elements__element');
    return template.cloneNode(true);
  }

  _clickLike() {
    this._likeButton.classList.toggle('elements__button-like_active');
  }

  _openImagePopup() {
    this._handleCardClick({name: this._name, link: this._link});
  }

  _createCard() {
    this._card = this._getElement();
    this._card.querySelector('.elements__name').innerText = this._name;
    this._cardImg = this._card.querySelector('.elements__picture');
    this._cardImg.src = this._link;
    this._cardImg.setAttribute('alt', this._name);
    this._likeButton = this._card.querySelector('.elements__button-like');

    this._addListenersToCard();
    return this._card;
  }

  _addListenersToCard() {
    this._likeButton.addEventListener('click', this._clickLike.bind(this));
    const trashIcon = this._card.querySelector('.elements__trash-icon');
    trashIcon.addEventListener('click', () => {
      this._card.remove();
    });
    this._cardImg.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  getCardElement() {
    return this._createCard();
  }
}
