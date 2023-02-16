let editPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let editProfileClose = document.querySelector('.popup__close');
let placeholderName = document.querySelector('.input__text_type_name');
let placeholderActivity = document.querySelector('.input__text_type_activity');
let profileName = document.querySelector('.profile__name').textContent;
let profileActivity = document.querySelector('.profile__activity').textContent;
let formElement = document.querySelector('.popup__container');



editPopup.addEventListener('click', function() {
  placeholderName.placeholder = profileName;
  placeholderActivity.placeholder = profileActivity;
  popup.classList.add('popup_opened');
});

editProfileClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});


function handleFormSubmit (evt) {
  evt.preventDefault();
  let nameInput = placeholderName.value;
  let jobInput = placeholderActivity.value;
  profileName.textContent = nameInput;
  profileActivity.textContent = jobInput;
}

formElement.addEventListener('submit', handleFormSubmit);
