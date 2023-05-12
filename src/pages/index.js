import './index.css';

import {
  press,
  validationConfig,
  buttonEditPopup,
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

const api = new Api(serverConfig);
const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);

function createCard(cardObject) {
  const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
  return newCard.generateCard();
}

const cardList = new Section({
  renderer: (cardObject) => {
    cardList.addItemToBottom(createCard(cardObject));
  }
}, selectorCardsContainer);

async function getUserInfo() {
  try {
    const [dataProfile, dataCards] = await Promise.all([
      api.pullProfileInfo(),
      api.pullCardInfo(),
    ]);
    userInfo.setUserInfo({
      name: dataProfile.name,
      activity: dataProfile.about,
      avatar: dataProfile.avatar
    });

    dataCards.forEach((cardData) => {
      const card = createCard(cardData);
      // card.setLikesCount(cardData.likes.length);
      cardList.addItemToBottom(card);
      // cardList.addItemToBottom(createCard(cardData));
    });

    // const cardList = new Section({
    //   items: dataCards,
    //   renderer: cardObject => {
    //     const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
    //     cardList.addItemToBottom(newCard.generateCard());
    //   }
    // }, selectorCardsContainer);

    // cardList.renderer();

  } catch (error) {
    console.error(`Ошибка при загрузки: ${error}`);
  }
};
getUserInfo();


const editPopup = new PopupWithForm('#popup-edit', async (data) => {
  try {
    const dataProfile = await api.patchProfileInfo(data);
    userInfo.setUserInfo({
      name: dataProfile.name,
      activity: dataProfile.about,
      avatar: dataProfile.avatar
    });
  } catch (error) {
    console.error(`Ошибка при обновлении информации о профиле: ${error}`);
  }
});


const addPopup = new PopupWithForm('#popup-add', async (cardObject) => {
  try {
    await api.pushCardInfo(cardObject);
    cardList.addItemToTop(createCard(cardObject));
  } catch (error) {
    console.error(`Ошибка при обновлении информации о профиле: ${error}`);
  }

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




// async function patchUserInfo() {
//   try {
//     const defaultUserInfo = userInfo.getUserInfo();
//     const editPopup = new PopupWithForm('#popup-edit', async () => {
//       const dataProfile = await api.patchProfileInfo(defaultUserInfo);
//       userInfo.setUserInfo({
//         name: dataProfile.username,
//         activity: dataProfile.useractivity
//       });
//     });

//     editPopup.setEventListeners();
//   } catch (error) {
//     console.error(`Ошибка при загрузки: ${error}`);
//   }
// }

// patchUserInfo();






// const editPopup = new PopupWithForm('#popup-edit', (data) => {
//   userInfo.setUserInfo({
//     name: data.username,
//     activity: data.useractivity
//   });

// });



// cardList.renderer();
