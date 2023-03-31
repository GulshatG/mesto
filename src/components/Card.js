
export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleCardRemove,
    handleLikeClick,
      userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getElement() {
    const template = document
      .querySelector(this._selector)
      .content.querySelector(".elements__element");
    return template.cloneNode(true);
  }

  _clickLike() {
    this._likeButton.classList.toggle("elements__button-like_active");
  }

  _openImagePopup() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _createCard() {
    this._card = this._getElement();
    this._card.querySelector(".elements__name").innerText = this._name;
    this._cardImg = this._card.querySelector(".elements__picture");
    this._cardImg.src = this._link;
    this._cardImg.setAttribute("alt", this._name);
    this._likeButton = this._card.querySelector(".elements__button-like");
    this._likeCount = this._card.querySelector(".elements__like-count");
    this._likeCount.innerText = this._likes.length;
    this._trachIcon = this._card.querySelector(".elements__trash-icon");
    if (this._ownerId !== this._userId) {
      this._trachIcon.remove();
    }
    if (this._isLiked()) {
      this._likeButton.classList.add("elements__button-like_active");
    }
    this._addListenersToCard();
    return this._card;
  }
  _isLiked() {
    let isLiked = false;
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        isLiked = true;
        return;
      }
    });
    return isLiked;
  }

  _addListenersToCard() {
    this._likeButton.addEventListener("click", () => {
      const isLiked = this._likeButton.classList.contains("elements__button-like_active");
      this._handleLikeClick({
        isLiked: isLiked,
        id: this._id,
        setLike: this.setLike.bind(this)
      });
    });
    if (this._ownerId === this._userId) {
      const trashIcon = this._card.querySelector(".elements__trash-icon");
      trashIcon.addEventListener("click", () =>
        this._handleCardRemove(this._card, this._id)
      );
    }
    this._cardImg.addEventListener("click", this._openImagePopup.bind(this));
  }

  getCardElement() {
    return this._createCard();
  }
  setLike(count){
    this._likeButton.classList.toggle("elements__button-like_active");
    this._likeCount.innerText = count;
  }
}
