export default class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;

    }

    _showInputError = (element, errorMessage) => {
        element.classList.add(this._settings.inputErrorClass);
        const spanError = this._formElement.querySelector(`.${element.id}-error`);
        spanError.textContent = errorMessage;
        spanError.classList.add(this._settings.errorClass);
    };

    // Функция, которая удаляет класс с ошибкой
    _hideInputError = (element) => {
        element.classList.remove(this._settings.inputErrorClass);
        const spanError = this._formElement.querySelector(`.${element.id}-error`);
        spanError.classList.remove(this._settings.errorClass);
        spanError.textContent = '';
    };

    _isValid(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonState();
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }


    enableValidation() {
        this._setEventListeners();
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        }
    }
}