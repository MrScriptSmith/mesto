import {
  imagePopup,
  pictImagePopup,
  titleImagePopup,
  press,
  initialCards,
  validationConfig,
  forms,
  editPopup,
  addPopup,
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
  closeButtons,
  // cardsContainer,
  pressOrMouseDown,
  selectorCardsContainer
} from './utils/constants.js';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';

function createAndAddCard(cardObject, cardListInstance, toTop = false) {
  const newCard = new Card(cardObject, '#cardTemplate', handleOpenImagePopup);
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

// function createCard(card) {
//   const newCard = new Card(card, '#cardTemplate', handleOpenImagePopup);
//   return newCard.generateCard();
// }

// initialCards.forEach((card) => {
//   cardsContainer.append(createCard(card));
// })



forms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

function handleOpenImagePopup(name, link) {
  titleImagePopup.textContent = name;
  pictImagePopup.src = link;
  pictImagePopup.alt = name;
  openPopup(imagePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const nameInput = userName.value;
  const jobInput = userActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
  closePopup(editPopup);
}

function saveFormAdd(event) {
  event.preventDefault();
  if (cardName.value && cardLink.value) {
    const cardObject = {
      name: cardName.value,
      link: cardLink.value,
    };
    createAndAddCard(cardObject, cardList, true);
    closePopup(addPopup);
    cardForm.reset();
  }
}

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const visiblePopup = document.querySelector('.popup_visible');
    closePopup(visiblePopup);
  }
};

buttonEditPopup.addEventListener(press, () => {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  openPopup(editPopup);
});

buttonAddPopup.addEventListener(press, () => {
  openPopup(addPopup);
});

function initClosePopup(button, popup) {
  const handleClick = (evt) => {
    if (evt.target === popup || evt.target === button) {
      closePopup(popup);
    }
  };
  popup.addEventListener(pressOrMouseDown, handleClick);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  initClosePopup(button, popup);
});


profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', saveFormAdd);

