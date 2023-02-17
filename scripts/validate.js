const showInputError = (form, element, errorMessage, settings) => {
    element.classList.add(settings.inputErrorClass);
    const spanError = form.querySelector(`.${element.id}-error`);
    spanError.textContent = errorMessage;
    spanError.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, element) => {
    element.classList.remove(settings.inputErrorClass);
    const spanError = form.querySelector(`.${element.id}-error`);
    spanError.classList.remove(settings.errorClass);
    spanError.textContent = '';
};

function isValid(formElement, inputElement, settings) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, settings);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}


function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
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