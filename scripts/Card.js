import { press } from './constants.js';

export default class Card {
  constructor(card, setTemplateSelector, handleOpenCardPopup) {
    this._setTemplateSelector = setTemplateSelector;
    this._handleOpenCardPopup = handleOpenCardPopup;
    this._name = card.name;
    this._link = card.link;
  }

  _getCardTemplate() {
    const cardTemplate = document
    .querySelector(this._setTemplateSelector)
    .content
    .querySelector('.cards')
    .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._elementCard = this._getCardTemplate();
    this._elementCard.querySelector('.cards__name').textContent = this._name;
    this._cardPicture = this._elementCard.querySelector('.cards__img');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardLikeButton = this._elementCard.querySelector('.cards__heart');
    this._cardTrashButton = this._elementCard.querySelector('.cards__trash');

    this._setEventListeners();

    return this._elementCard;
  }

  _handleCardLike() {
    this._cardLikeButton.classList.toggle('cards__heart_active');
  }

  _handleCardTrash() {
    this._elementCard.remove();
    this._elementCard = null;
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener(press, () => {
      this._handleCardLike();
    });

    this._cardTrashButton.addEventListener(press, () => {
      this._handleCardTrash();
    });

    this._cardPicture.addEventListener(press, () => {
      this._handleOpenCardPopup(this._name, this._link);
    });
  }
}

