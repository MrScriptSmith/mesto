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








// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add('input_type_error');
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add('input__text-error_active');
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove('input_type_error');
//   errorElement.classList.remove('input__text-error_active');
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
//   const buttonElement = formElement.querySelector('.popup__submit');
//   // console.log(inputList);
//   // console.log(buttonElement);
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));
//     fieldsetList.forEach((fieldset) => {
//       setEventListeners(fieldset);
//     });

//   });
// }

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     // console.log(buttonElement);
//     buttonElement.classList.add('submit_inactive');
//   } else {
//     buttonElement.classList.remove('submit_inactive');
//     buttonElement.classList.add('submit_active');
//   }
// }

// enableValidation();
