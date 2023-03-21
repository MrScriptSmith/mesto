const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.classList.remove(activeErrorClass);
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

const checkInputValidity = (input, errorClass, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClass}${input.name}`);
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
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

const setEventListeners = (form, inputList, errorClass, activeErrorClass, submitButton, inactiveButtonClass) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

  });

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorClass, activeErrorClass);
      toggleButtonState(submitButton, inactiveButtonClass);
    });
  });
}

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  // const forms = Array.from(document.querySelectorAll(config.formSelector));
  // forms.forEach((form) => {
  //   form.addEventListener('submit', evt => {
  //     evt.preventDefault();
  //   })
  //   setEventListeners(form);
  // });
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, submitButton, config.inactiveButtonClass);
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  activeErrorClass: 'popup__input-text-error_active',
  errorClassTemplate: '.popup__input-error_type_'
});

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

// enableValidation();
