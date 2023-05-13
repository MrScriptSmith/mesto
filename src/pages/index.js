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
  serverConfig,
  buttonEditAvatarPopup,
  avatarForm,
  buttonSubmitPopupAvatar,
  buttonSubmitPopupAdd,
  buttonSubmitPopupEdit
} from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupProofDelete from '../scripts/components/PopupProofDelete.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';


const api = new Api(serverConfig);
const userInfo = new UserInfo(profileName, profileActivity, profileAvatar);



function createCard(cardObject, myUserId) {
  const newCard = new Card(
    cardObject,
    '#cardTemplate',
    imagePopup,
    myUserId,
    (cardId, cardElement) => deletePopup.open(cardId, cardElement),
    async (cardId) => {
      try {
          const result = await api.likeCard(cardId);
          newCard.setLikesCount(result.likes.length);
      } catch (error) {
          console.error(`Ошибка при лайке карточки: ${error}`);
      }
    },
    async (cardId) => {
      try {
          const result = await api.dislikeCard(cardId);
          newCard.setLikesCount(result.likes.length);
      } catch (error) {
          console.error(`Ошибка при дизлайке карточки: ${error}`);
      }
    }
);
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
      avatar: dataProfile.avatar,
      userId: dataProfile._id
    });

    dataCards.forEach((cardData) => {
      const card = createCard(cardData, userInfo.getUserId());
      cardList.addItemToBottom(card);
    });

  } catch (error) {
    console.error(`Ошибка при загрузке данных пользователя: ${error}`);
  }
};
getUserInfo();


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const editPopup = new PopupWithForm('#popup-edit', async (data) => {
  try {
    buttonSubmitPopupEdit.textContent = 'Сохранение...';
    const dataProfile = await api.patchProfileInfo(data);
    userInfo.setUserInfo({
      name: dataProfile.name,
      activity: dataProfile.about,
      avatar: dataProfile.avatar
    });
    editPopup.close();
  } catch (error) {
    console.error(`Ошибка при обновлении информации о профиле: ${error}`);
  } finally {
    buttonSubmitPopupEdit.textContent = 'Сохранить';
  }
});


const addPopup = new PopupWithForm('#popup-add', async (cardObject) => {
  try {
    buttonSubmitPopupAdd.textContent = 'Создание...';
    const addedCard = await api.pushCardInfo(cardObject);
    const newCard = createCard(addedCard, userInfo.getUserId());
    cardList.addItemToTop(newCard);
    addPopup.close();
  } catch (error) {
    console.error(`Ошибка при добавлении карточки: ${error}`);
  } finally {
    buttonSubmitPopupAdd.textContent = 'Создать';
  }

});
const imagePopup = new PopupWithImage('.image-popup');

const deletePopup = new PopupProofDelete('#popup-delete', async (cardId, cardElement) => {
  try {
    await api.deleteCard(cardId);
    cardElement.remove();
    cardElement = null;
  } catch (error) {
    console.error(`Ошибка при удалении карточки: ${error}`);
  }
});

const avatarPopup = new PopupWithForm('#popup-edit-avatar', async (cardObject) => {
  try {
    buttonSubmitPopupAvatar.textContent = 'Сохранение...';
    const updateAvatar = await api.pushAvatar(cardObject);
    userInfo.setUserAvatar(updateAvatar.avatar);
    avatarPopup.close();
  } catch (error) {
    console.error(`Ошибка при обновлении аватара: ${error}`);
  } finally {
    buttonSubmitPopupAvatar.textContent = 'Сохранить';
  }
});

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
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

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

buttonEditAvatarPopup.addEventListener(press, () => {
  formValidators[ avatarForm.getAttribute('name') ].resetValidation();
  avatarPopup.open();

})
