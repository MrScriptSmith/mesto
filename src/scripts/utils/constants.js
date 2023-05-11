const imageBally = new URL('../../images/Bally.jpg', import.meta.url);
const imageBudapest = new URL('../../images/Budapest.jpg', import.meta.url);
const imageDubai = new URL('../../images/Dubai.jpg', import.meta.url);
const imageEgypt = new URL('../../images/Egypt.jpg', import.meta.url);
const imagePrague = new URL('../../images/Prague.jpg', import.meta.url);
const imageVietnam = new URL('../../images/Vietnam.jpg', import.meta.url);


// Константы для модуля card.js, index.js
const press = 'ontouchstart' in window ? 'touchstart' : 'click';

//Константы для модуля  index.js
const initialCards = [
  {
    name: 'Храм Лемпуянг',
    link: imageBally,
  },
  {
    name: 'Будапешт',
    link: imageBudapest,
  },
  {
    name: 'Бурдж-Халифа',
    link: imageDubai,
  },
  {
    name: 'Пирамиды',
    link: imageEgypt,
  },
  {
    name: 'Прага',
    link: imagePrague,
  },
  {
    name: 'Золотой мост в Дананге',
    link: imageVietnam,
  },
];


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  visibleErrorClass: 'popup__input-text-error_visible',
  errorClassTemplate: '.popup__input-text-error_type_'
};

const serverConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  key: '608096ab-91fa-4cd3-8368-f20c618391fd',
  userUrl: '/users/me',
  cardUrl: '#'
};

const forms = Array.from(document.forms);
const pictImagePopup = '.image-popup__img';
const titleImagePopup = '.image-popup__title';
const buttonEditPopup = document.querySelector('.profile__button-edit');
const userInputName = document.querySelector('.popup__input_type_username');
const userInputActivity = document.querySelector('.popup__input_type_useractivity');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');
const profileName = '.profile__name';
const profileActivity = '.profile__activity';
const profileAvatar = '.profile__avatar';
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const buttonAddPopup = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.popup__close');
const cardsContainer = document.querySelector('.places__cards');
const selectorCardsContainer = '.places__cards';
const pressOrMouseDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';


export {
  pictImagePopup,
  titleImagePopup,
  press,
  validationConfig,
  forms,
  initialCards,
  buttonEditPopup,
  userInputName,
  userInputActivity,
  cardName,
  cardLink,
  profileName,
  profileActivity,
  profileAvatar,
  profileForm,
  cardForm,
  buttonAddPopup,
  closeButtons,
  cardsContainer,
  pressOrMouseDown,
  selectorCardsContainer,
  serverConfig
};
