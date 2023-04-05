import { imagePopup, pictImagePopup, titleImagePopup, press } from './constants.js';

export default class Card {
  constructor(card, setTemplateSelector) {
    this._setTemplateSelector = setTemplateSelector;
    this._name = card.name;
    this._link = card.link;
    this._handleByEscapeBound = this._handleByEscape.bind(this);
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
    this._cardCloseButton = imagePopup.querySelector('.popup__close');

    this._setEventListeners();

    return this._elementCard;
  }

  _handleByEscape(evt) {
    if (evt.key === 'Escape') {
      this._handleCardClose();
    }
  };

  _handleCardClose() {
    imagePopup.classList.remove('popup_visible');

    titleImagePopup.textContent = '';
    pictImagePopup.src = '';
    pictImagePopup.alt = '';
  };

  _handleCardClick() {
    titleImagePopup.textContent = this._name;
    pictImagePopup.src = this._link;
    pictImagePopup.alt = this._name;

    imagePopup.classList.add('popup_visible');
  }

  _handleCardLike() {
    this._cardLikeButton.classList.toggle('cards__heart_active');
  }

  _handleCardTrash() {
    this._cardTrashButton.closest('.cards').remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener(press, () => {
      this._handleCardLike();
    })

    this._cardTrashButton.addEventListener(press, () => {
      this._handleCardTrash();
    })

    this._cardPicture.addEventListener(press, () => {
      this._handleCardClick();
      document.addEventListener('keydown', this._handleByEscapeBound);
    })

    this._cardCloseButton.addEventListener(press, () => {
      this._handleCardClose();
      document.removeEventListener('keydown', this._handleByEscapeBound);
    })
  }
}
