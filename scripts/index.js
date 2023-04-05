import {
  press,
  initialCards,
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
  buttonAddPopup,
  closeButtons,
  cardsContainer,
  pressOrMouseDown
} from './constants.js';

import Card from './card.js';

function createCard(card) {
  const newCard = new Card(card, "#cardTemplate");
  return newCard.generateCard();
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
})


function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closeByEscape); // добавить в класс?
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
    cardsContainer.prepend(createCard(cardObject));
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

