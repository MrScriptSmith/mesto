const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const imagePopup = document.querySelector('.image-popup'); //-
const buttonEditPopup = document.querySelector('.profile__button-edit');
const pictImagePopup = imagePopup.querySelector('.image-popup__img'); //-
const titleImagePopup = imagePopup.querySelector('.image-popup__title'); //-
const userName = document.querySelector('.popup__input_type_username');
const userActivity = document.querySelector('.popup__input_type_useractivity');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const submitCardForm = cardForm.querySelector('.popup__submit'); // если будет использоваться 1 раз перенести в функцию открытия попап
const cardsContainer = document.querySelector('.places__cards');
const cardsTemplate = document.querySelector('#cardTemplate').content; //-
const buttonAddPopup = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.popup__close');
const press = 'ontouchstart' in window ? 'touchstart' : 'click'; //-
const pressOrMouseDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown'; //-

const initialCards = [
  {
    name: 'Храм Лемпуянг',
    link: './images/Bally.jpg',
  },
  {
    name: 'Будапешт',
    link: './images/Budapest.jpg',
  },
  {
    name: 'Бурдж-Халифа',
    link: './images/Dubai.jpg',
  },
  {
    name: 'Пирамиды',
    link: './images/Egypt.jpg',
  },
  {
    name: 'Прага',
    link: './images/Prague.jpg',
  },
  {
    name: 'Золотой мост в Дананге',
    link: './images/Vietnam.jpg',
  },
];

function openPopup(popup) { //-
  popup.classList.add('popup_visible'); //-
  document.addEventListener('keydown', closeByEscape);

}

function closePopup(popup) { //-
  popup.classList.remove('popup_visible'); //-
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

function handleCardClick(card) { //-
  titleImagePopup.textContent = card.alt; //-
  pictImagePopup.src = card.src; //-
  pictImagePopup.alt = card.alt; //-
  openPopup(imagePopup); //-
}

function createCard(card) {
  const cardTemplate = cardsTemplate.querySelector('.cards').cloneNode(true); //-
  const nameOfTemplate = cardTemplate.querySelector('.cards__name'); //-
  const imageOfTemplate = cardTemplate.querySelector('.cards__img'); //-
  const heartOfTemplate = cardTemplate.querySelector('.cards__heart'); //-
  const trashOfTemplate = cardTemplate.querySelector('.cards__trash'); //-
  nameOfTemplate.textContent = card.name; //-
  imageOfTemplate.alt = card.name; //-
  imageOfTemplate.src = card.link; //-
  heartOfTemplate.addEventListener(press, (event) => { //-
      event.target.classList.toggle('cards__heart_active'); //-
  }); //-
  trashOfTemplate.addEventListener(press, deleteCard); //-
  imageOfTemplate.addEventListener(press, () => handleCardClick(imageOfTemplate));
  return cardTemplate;
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

function deleteCard(event) {
  event.preventDefault();
  const card = event.target.closest('.cards');
  card.remove();
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

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', saveFormAdd);
