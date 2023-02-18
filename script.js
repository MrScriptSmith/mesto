let editButtonPopup = document.querySelector(".profile__button-edit");
let editPopup = document.querySelector(".popup");
let editProfileClose = document.querySelector(".popup__close");
let userName = document.querySelector(".popup__input-name");
let userActivity = document.querySelector(".popup__input-activity");
let profileName = document.querySelector(".profile__name");
let profileActivity = document.querySelector(".profile__activity");
let formElement = document.querySelector(".popup__container");
let saveProfile = document.querySelector(".popup__submit");
let cardsHeartActive = document.querySelectorAll(".cards__name");
// let cardsHeart = document.querySelectorAll(".cards__name");
// let cardsHeartTarget = window.getComputedStyle(cardsHeart, '::after');

editButtonPopup.addEventListener("click", function () {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  openPopup(editPopup);
});

editProfileClose.addEventListener("click", function () {
  closePopup(editPopup);
});

saveProfile.addEventListener("click", function() {
  profileName.textContent = userName.value;
  profileActivity.textContent = userActivity.value;
  closePopup(editPopup);
});

// cardsHeartActive.addEventListener()

// cardsHeart.addEventListener('click', function(event) {
//   activeElement (event, cardsHeartTarget);
// });


formElement.addEventListener("submit", handleFormSubmit);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// function cardsHeartActive(element) {
//   element.classList.add('.cards__name-form_active');
// }

// function activeElement(event, pseudoElement) {
//   if (event.target === pseudoElement) {
//     pseudoElement.style.backgroundColor = 'black';
//   } else {
//     return;
//   }
// }

function handleFormSubmit(event) {
  event.preventDefault();
  let nameInput = userName.value;
  let jobInput = userActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
}
