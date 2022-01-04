class FormValidator {
    constructor (config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement
    }

    // Показывать спан с текстом ошибки
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // Скрывать спан с текстом ошибки
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    // Поведение спана с текстом ошибки при проверке на валидность
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    // Проверка валидности всех инпутов формы
    _hasInvalidInput = (inputs) => {
        return inputs.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            return !inputElement.validity.valid;
        });
    }

    // Поведение кнопки при проверке инпутов на валидность
    toggleButtonState = () => {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputs)) {
            // сделать кнопку неактивной
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            // иначе сделать кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    // Ввод в инпуты
    _setEventListeners () { 
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        // Вызов toggleButtonState, чтобы не ждать ввода данных в поля
        this.toggleButtonState();

        inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this.toggleButtonState();
            });
        });
    }

    // Валидация при отправке форм
    enableValidation () {
        const forms = Array.from(document.querySelectorAll(this._formSelector));

        forms.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                // Отмена стандартного поведения
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    }

    // Очистка ошибок ввода формы
    clearValidationErrors () {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputs.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

}

export default FormValidator;
