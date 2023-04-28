import {
  press,
  initialCards,
  validationConfig,
  forms,
  buttonEditPopup,
  userName,
  userActivity,
  profileName,
  profileActivity,
  profileForm,
  buttonAddPopup,
  selectorCardsContainer,
} from './utils/constants.js';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

const editPopup = new Popup('#popup-edit');
const addPopup = new PopupWithForm('#popup-add', (cardObject) => {
  cardList.addItemToTop(createCard(cardObject));
});
const imagePopup = new PopupWithImage('.image-popup');

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

forms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const nameInput = userName.value;
  const jobInput = userActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
  editPopup.close();
}

buttonEditPopup.addEventListener(press, () => {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  editPopup.open();
});

buttonAddPopup.addEventListener(press, () => {
  addPopup.open();
});

profileForm.addEventListener('submit', handleProfileFormSubmit);


