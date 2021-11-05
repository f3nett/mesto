const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_active'
}

// Показывать спан с текстом ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

// Скрывать спан с текстом ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

// Поведение спана с текстом ошибки при проверке на валидность
const isValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

// Проверка валидности всех инпутов формы
const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        return !inputElement.validity.valid;
    });
}

// Поведение кнопки при проверке инпутов на валидность
const toggleButtonState = (formElement, validationConfig) => {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputs)) {
        // сделать кнопку неактивной
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        // иначе сделать кнопку активной
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// Ввод в инпуты
const setEventListeners = (formElement, validationConfig) => { 
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Вызов toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(formElement, validationConfig);

    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(formElement, validationConfig);
        });
    });
}

// Валидация при отправке форм
const enableValidation = (validationConfig) => {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // Отмена стандартного поведения
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });s
}

// Очистка ошибок ввода формы
const clearValidationErrors = (formElement, validationConfig) => {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputs.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });
}

enableValidation(config);