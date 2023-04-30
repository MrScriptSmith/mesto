import '../pages/index.css';

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
} from './utils/constants.js';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const userInfo = new UserInfo(profileName, profileActivity);

const editPopup = new PopupWithForm('#popup-edit', (data) => {
  console.log(data);
  userInfo.setUserInfo({
    name: data.username,
    activity: data.useractivity
  });
});

const addPopup = new PopupWithForm('#popup-add', (cardObject) => {
  cardList.addItemToTop(createCard(cardObject));
});
const imagePopup = new PopupWithImage('.image-popup');

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, cardForm);

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
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

buttonEditPopup.addEventListener(press, () => {
  const defaultUserInfo = userInfo.getUserInfo();
  userInputName.value = defaultUserInfo.name;
  userInputActivity.value = defaultUserInfo.activity;
  profileFormValidator.toggleButtonState();
  editPopup.open();

});

buttonAddPopup.addEventListener(press, () => {
  addPopup.open();
});
