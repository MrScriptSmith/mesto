import { press } from '../utils/constants.js';

export default class Card {
  constructor(card, setTemplateSelector, popupWithImage, myUserId, handleDeleteClick) {
    this._setTemplateSelector = setTemplateSelector;
    this._name = card.name;
    this._link = card.link;
    this._popupWithImage = popupWithImage;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCount = card.likes.length;
    this._ownerUserId = card.owner._id;
    this._myUserId = myUserId;
    this._cardId = card._id;
    // this._handleCardTrash = this._handleCardTrash.bind(this);
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
    this._cardLikeCount = this._elementCard.querySelector('.cards__heart-count');

    this._checkCardId();
    this._setLikesCount(this._likeCount);
    this._setEventListeners();

    return this._elementCard;
  }

  _checkCardId() {
    if(this._ownerUserId !== this._myUserId) {
      this._cardTrashButton.style.display = 'none';
    }
  }

  _handleCardClick() {
    this._popupWithImage.open({ name: this._name, link: this._link });
  }

  _handleCardLike() {
    this._cardLikeButton.classList.toggle('cards__heart_active');
  }

  _handleCardTrash() {
    this._handleDeleteClick(this._cardId, this._elementCard);
  }

  _setLikesCount(count) {
    this._cardLikeCount.textContent = count.toString();
  }

  _setEventListeners() {

    this._cardLikeButton.addEventListener(press, () => {
      this._handleCardLike();
    });

    this._cardTrashButton.addEventListener(press, () => {
      this._handleCardTrash();
    });

    this._cardPicture.addEventListener(press, () => {
      this._handleCardClick();
    });
  }

  // _removeEventListeners() {
  //   this._cardTrashButton._removeEventListener(press, this._handleCardTrash);
  // }

  // removeCard() {
  //   this._removeEventListeners();
  //   this._elementCard.remove();
  //   this._elementCard = null;
  // }
}

