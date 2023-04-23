// Константы для модуля card.js, index.js
const press = 'ontouchstart' in window ? 'touchstart' : 'click';

//Константы для модуля  index.js
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


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  visibleErrorClass: 'popup__input-text-error_visible',
  errorClassTemplate: '.popup__input-text-error_type_'
};

const forms = Array.from(document.forms);
const imagePopup = document.querySelector('.image-popup');
const pictImagePopup = imagePopup.querySelector('.image-popup__img');
const titleImagePopup = imagePopup.querySelector('.image-popup__title');
const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const buttonEditPopup = document.querySelector('.profile__button-edit');
const userName = document.querySelector('.popup__input_type_username');
const userActivity = document.querySelector('.popup__input_type_useractivity');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const buttonAddPopup = document.querySelector('.profile__button-add');
const closeButtons = document.querySelectorAll('.popup__close');
// const cardsContainer = document.querySelector('.places__cards');
const cardsContainer = '.places__cards';
const pressOrMouseDown = 'ontouchstart' in window ? 'touchstart' : 'mousedown';


export {
  imagePopup,
  pictImagePopup,
  titleImagePopup,
  press,
  validationConfig,
  forms,
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
  cardForm,
  buttonAddPopup,
  closeButtons,
  cardsContainer,
  pressOrMouseDown,
};
