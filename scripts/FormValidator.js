class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError = (element, errorMessage) => {
        element.classList.add(settings.inputErrorClass);
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
            hideInputError(inputElement);
        } else {
            showInputError(inputElement, inputElement.validationMessage);
        }
    }
    
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
        toggleButtonState(inputList, buttonElement);
        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                toggleButtonState(inputList, buttonElement);
            }, 0);
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    }
    
    
    _enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._settings.formSelector));
        formList.forEach((formElement) => {
            setEventListeners(formElement, settings);
        });
    }
    
    function hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    function toggleButtonState(inputList, buttonElement, settings) {
        if (hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
            buttonElement.classList.add(settings.inactiveButtonClass);
        } else {
            buttonElement.disabled = false;
            buttonElement.classList.remove(settings.inactiveButtonClass);
        }
    }
    
    const settings = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
    }
    enableValidation(settings);
}