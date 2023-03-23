const showInputError = (errorTextElement, validationMessage, visibleErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(visibleErrorClass);
}

const hideInputError = (errorTextElement, visibleErrorClass) => {
  errorTextElement.classList.remove(visibleErrorClass);
  errorTextElement.textContent = '';
}

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;

}

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

const checkInputValidity = (input, errorClass, visibleErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClass}${input.name}`);
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, visibleErrorClass);
  } else {
    hideInputError(errorTextElement);
  }
}

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => !inputElement.validity.valid);
}

const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
  if(!hasInvalidInput(inputList)) {
    enableButton(submitButton, inactiveButtonClass);
  } else {
    disableButton(submitButton, inactiveButtonClass);
  }
}

const setEventListeners = (form, inputList, errorClass, visibleErrorClass, submitButton, inactiveButtonClass) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

  });

  form.addEventListener('reset', () => {
    disableButton(submitButton, inactiveButtonClass);
  });

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorClass, visibleErrorClass);
      toggleButtonState(submitButton, inactiveButtonClass, inputList);
    });
  });
}

const initFormValidation = (form, config) => {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  setEventListeners(form, inputList, config.errorClassTemplate, config.visibleErrorClass, submitButton, config.inactiveButtonClass);
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    initFormValidation(form, config);
  });
};

enableValidation(validationConfig);
