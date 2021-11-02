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
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      return !inputElement.validity.valid;
    });
}

// Поведение кнопки при проверке инпутов на валидность
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
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
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Кнопка отправки
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    // Вызов toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

// Валидация при отправке форм
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // Отмена стандартного поведения
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    });
}

enableValidation(config);