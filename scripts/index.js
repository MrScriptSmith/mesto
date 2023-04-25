import {
  press,
  initialCards,
  validationConfig,
  forms,
  buttonEditPopup,
  userName,
  userActivity,
  cardName,
  cardLink,
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
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';

const editPopup = new Popup('#popup-edit');
const addPopup = new Popup('#popup-add');
const imagePopup = new PopupWithImage('.image-popup');
editPopup.setEventListener();
addPopup.setEventListener();
imagePopup.setEventListener();

function createAndAddCard(cardObject, cardListInstance, toTop = false) {
  const newCard = new Card(cardObject, '#cardTemplate', imagePopup);
  const cardElement = newCard.generateCard();

  if(toTop) {
    cardListInstance.addItemToTop(cardElement);
  } else {
    cardListInstance.addItemToBottom(cardElement);
  }
}

const cardList = new Section({
  items: initialCards,
  renderer: (card) => {
    createAndAddCard(card, cardList);
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

function saveFormAdd(event) {
  event.preventDefault();
  if (cardName.value && cardLink.value) {
    const cardObject = {
      name: cardName.value,
      link: cardLink.value,
    };
    createAndAddCard(cardObject, cardList, true);
    addPopup.close();
    cardForm.reset();
  }
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
cardForm.addEventListener('submit', saveFormAdd);

