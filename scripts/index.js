let editButtonPopup = document.querySelector(".profile__button-edit");
let editPopup = document.querySelector(".popup");
let editProfileClose = document.querySelector(".popup__close");
let userName = document.querySelector(".popup__input_type_name");
let userActivity = document.querySelector(".popup__input_type_activity");
let profileName = document.querySelector(".profile__name");
let profileActivity = document.querySelector(".profile__activity");
let submitFormAndSave = document.querySelector(".popup__form");


editButtonPopup.addEventListener("click", function () {
  userName.value = profileName.textContent;
  userActivity.value = profileActivity.textContent;
  openPopup(editPopup);
});

editProfileClose.addEventListener("click", function () {
  closePopup(editPopup);
});

submitFormAndSave.addEventListener("submit", handleFormSubmit);

function openPopup(popup) {
  popup.classList.add("popup_opened");
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
