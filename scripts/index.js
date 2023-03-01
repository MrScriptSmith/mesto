const editButtonPopup = document.querySelector('.profile__button-edit');
const editPopup = document.querySelector('#popup-edit');
const editProfileClose = document.querySelector('#popup-edit-close');
const userName = document.querySelector('#popup-edit-input-name');
const userActivity = document.querySelector('#popup-edit-input-activity');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const submitFormAndSave = document.querySelector('#popup-edit-form');
const cardsContainer = document.querySelector('.places__cards');
const cardsTemplate = document.querySelector('#cards').content;


const initialCards = [
  {
    name: 'Храм Лемпуянг',
    link: './images/Bally.jpg'
  },
  {
    name: 'Будапешт',
    link: './images/Budapest.jpg'
  },
  {
    name: 'Бурдж-Халифа',
    link: './images/Dubai.jpg'
  },
  {
    name: 'Пирамиды',
    link: './images/Egypt.jpg'
  },
  {
    name: 'Прага',
    link: './images/Prague.jpg'
  },
  {
    name: 'Золотой мост в Дананге',
    link: './images/Vietnam.jpg'
  }
];

initialCards.forEach((card) => {
  const cardTemplate = cardsTemplate.querySelector('.cards').cloneNode(true);
  const nameOfTemplate = cardTemplate.querySelector('.cards__name');
  const imageOfTemplate = cardTemplate.querySelector('.cards__img');
  nameOfTemplate.textContent = card.name;
  imageOfTemplate.alt = card.name;
  imageOfTemplate.src = card.link;
  cardsContainer.append(cardTemplate);
});

editButtonPopup.addEventListener('click', function () {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  openPopup(editPopup);
});

editProfileClose.addEventListener('click', function () {
  closePopup(editPopup);
});

submitFormAndSave.addEventListener('submit', handleFormSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  let nameInput = userName.value;
  let jobInput = userActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
  closePopup(editPopup);
}
