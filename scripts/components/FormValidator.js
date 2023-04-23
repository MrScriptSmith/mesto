export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(errorTextElement, validationMessage) {
    errorTextElement.textContent = validationMessage;
    errorTextElement.classList.add(this._config.visibleErrorClass);
  }

  _hideInputError(errorTextElement) {
    errorTextElement.classList.remove(this._config.visibleErrorClass);
    errorTextElement.textContent = '';
  }

  _enableButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }
  _disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _checkInputValidity(input) {
    const errorTextElement = document.querySelector(`${this._config.errorClassTemplate}${input.name}`);
    if (!input.validity.valid) {
      this._showInputError(errorTextElement, input.validationMessage);
    } else {
      this._hideInputError(errorTextElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if(!this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _setEventListeners() {

    this._form.addEventListener('reset', () => {
      this._disableButton();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
