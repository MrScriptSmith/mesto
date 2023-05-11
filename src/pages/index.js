import './index.css';

import {
  press,
  initialCards,
  validationConfig,
  buttonEditPopup,
  // userInputName,
  // userInputActivity,
  profileName,
  profileActivity,
  profileAvatar,
  profileForm,
  cardForm,
  buttonAddPopup,
  selectorCardsContainer,
  serverConfig
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';


async function updateUserInfo() {
  try {
    const api = new Api(serverConfig);
    const [dataProfile, dataCards] = await Promise.all([
      api.updateUserInfo(),
      api.updateCardInfo(),
    ]);
    userInfo.setUserInfo({
      name: dataProfile.name,
      activity: dataProfile.about,
      avatar: dataProfile.avatar
    });

    const cardList = new Section({
      items: dataCards,
      renderer: cardObject => {
        const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
        cardList.addItemToBottom(newCard.generateCard());
      }
    }, selectorCardsContainer);

    cardList.renderer();

  } catch (error) {
    console.error(`Ошибка при загрузки: ${error}`);
  }
};
updateUserInfo();




const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

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

// function createCard(cardObject) {
//   const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
//   return newCard.generateCard();
// }

// const cardList = new Section({
//   items: initialCards,
//   renderer: (cardObject) => {
//     cardList.addItemToBottom(createCard(cardObject));
//   }
// }, selectorCardsContainer);
// cardList.renderer();

buttonEditPopup.addEventListener(press, () => {
  const defaultUserInfo = userInfo.getUserInfo();
  editPopup.setInputValues(defaultUserInfo);
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
  editPopup.open();
});

buttonAddPopup.addEventListener(press, () => {
  formValidators[ cardForm.getAttribute('name') ].resetValidation();
  addPopup.open();
});
