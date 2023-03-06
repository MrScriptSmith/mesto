const editButtonPopup = document.querySelector('.profile__button-edit');
const editPopup = document.querySelector('#popup-edit');
const addPopup = document.querySelector('#popup-add');
const sizePopup = document.querySelector('.popup-size');
const imageSizePopup = document.querySelector('.popup-size__img');
const titleSizePopup = document.querySelector('.popup-size__title');
const editPopupClose = document.querySelector('#popup-edit-close');
const addPopupClose = document.querySelector('#popup-add-close');
const sizePopupClose = document.querySelector('.popup-size__close')
const userName = document.querySelector('#popup-edit-input-name');
const userActivity = document.querySelector('#popup-edit-input-activity');
const cardName = document.querySelector('#popup-add-input-card-name');
const cardLink = document.querySelector('#popup-add-input-card-link');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const submitEditPopupAndSave = document.querySelector('#popup-edit-form');
const saveAddPopup = document.querySelector('#popup-add-form');
const cardsContainer = document.querySelector('.places__cards');
const cardsTemplate = document.querySelector('#cards').content;
const addButtonPopup = document.querySelector('.profile__button-add');


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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const nameInput = userName.value;
  const jobInput = userActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
  closePopup(editPopup);
}

function createCard(card) {
  const cardTemplate = cardsTemplate.querySelector('.cards').cloneNode(true);
  const nameOfTemplate = cardTemplate.querySelector('.cards__name');
  const imageOfTemplate = cardTemplate.querySelector('.cards__img');
  const heartOfTemplate = cardTemplate.querySelector('.cards__heart');
  const trashOfTemplate = cardTemplate.querySelector('.cards__trash');
  nameOfTemplate.textContent = card.name;
  imageOfTemplate.alt = card.name;
  imageOfTemplate.src = card.link;
  heartOfTemplate.addEventListener('click', (event) => {
    event.target.classList.toggle('cards__heart_active');
  });
  trashOfTemplate.addEventListener('click', deleteCard);
  imageOfTemplate.addEventListener('click', openImage);
  return cardTemplate;
};

function openImage (event) {
  event.preventDefault();
  const image = event.target;
  titleSizePopup.textContent = image.alt;
  imageSizePopup.src = image.src;
  openPopup(sizePopup);
};

function saveFormAdd(event) {
  event.preventDefault();
  if (cardName.value && cardLink.value) {
    const cardObject = {
      name: cardName.value,
      link: cardLink.value
    };
    heartActive(cardsContainer, false);
    cardsContainer.prepend(createCard(cardObject));
    closePopup(addPopup);
    heartActive(cardsContainer, true);
  }
};

function heartActive() {
  cardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('cards__heart')) {
      event.target.classList.toggle('cards__heart_active');
    }
  });
};

function deleteCard(event) {
  event.preventDefault();
  const card = event.target.closest('.cards');
  card.remove();
};

editButtonPopup.addEventListener('click', () => {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  openPopup(editPopup);
});

addButtonPopup.addEventListener('click', () => {
  saveAddPopup.reset();
  openPopup(addPopup);
});

editPopupClose.addEventListener('click', () => {
  closePopup(editPopup);
});

addPopupClose.addEventListener('click', () => {
  closePopup(addPopup);
});

sizePopupClose.addEventListener('click', () => {
  closePopup(sizePopup);
});

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

submitEditPopupAndSave.addEventListener('submit', handleFormSubmit);
saveAddPopup.addEventListener('submit', saveFormAdd);




// cardsHeart.forEach(heart => {
//   heart.addEventListener('click', () => {
//     heart.classList.toggle('cards__heart_active');
//   });
// });

// const cardsHeartButtons = document.querySelectorAll('.cards__heart');
// cardsHeartButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     button.classList.toggle('cards__heart_active');
//   });
// });



// cardsHeart.forEach(heart => {
//   heart.addEventListener('click', (event) => {
//     event.target.classList.toggle('cards__heart_active');
//   });
// });

// const heartButtons = document.querySelectorAll('.cards__heart');
// cardsHeart.forEach(heart => {
//   heart.addEventListener('click', () => {
//     heart.classList.toggle('cards__heart_active');
//   });
// });

// cardsHeart.addEventListener('click', (event) => {
//   event.target.classList.add('.cards__heart_active');
// });


// cardsHeart.forEach((heart) => {
//   heart.addEventListener('click', (event) => {
//     event.target.style.backgroundImage = "url('../images/Heart_black.svg')";
//   });
// });

// cardsHeart.addEventListener('click', (event) => {
//   event.target.style.backgroundImage = "url('../images/Heart_black.svg')";
// });
