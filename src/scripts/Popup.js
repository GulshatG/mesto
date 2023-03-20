export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this._closeIcon = this._popup.querySelector('.popup__close-icon');
    }


    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._closeIcon.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        });
    }


}