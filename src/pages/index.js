import './index.css';

import {
  press,
  initialCards,
  validationConfig,
  buttonEditPopup,
  userInputName,
  userInputActivity,
  profileName,
  profileActivity,
  profileForm,
  cardForm,
  buttonAddPopup,
  selectorCardsContainer,
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const userInfo = new UserInfo(profileName, profileActivity);

const editPopup = new PopupWithForm('#popup-edit', (data) => {
  userInfo.setUserInfo({
    name: data.username,
    activity: data.useractivity
  });
});

const addPopup = new PopupWithForm('#popup-add', (cardObject) => {
  cardList.addItemToTop(createCard(cardObject));
});
const imagePopup = new PopupWithImage('.image-popup');

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

function createCard(cardObject) {
  const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
  return newCard.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (cardObject) => {
    cardList.addItemToBottom(createCard(cardObject));
  }
}, selectorCardsContainer);
cardList.renderer();

buttonEditPopup.addEventListener(press, () => {
  const defaultUserInfo = userInfo.getUserInfo();
  userInputName.value = defaultUserInfo.name;
  userInputActivity.value = defaultUserInfo.activity;
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
  editPopup.open();
});

buttonAddPopup.addEventListener(press, () => {
  formValidators[ cardForm.getAttribute('name') ].resetValidation();
  addPopup.open();
});
