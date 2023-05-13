import Popup from "./Popup.js";

export default class PopupProofDelete extends Popup {
  constructor(selectorPopup, deleteCardCallback) {
    super(selectorPopup);
    this._handleDeleteProof = this._handleDeleteProof.bind(this);
    this._deleteCardCallback = deleteCardCallback;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    super.open();
    this._cardElement = cardElement;
  }

  setDeleteProofHandler(handler) {
    this._deleteProofHandler = handler;
  }

  _handleDeleteProof() {
    if (this._cardId) {
      this._deleteCardCallback(this._cardId, this._cardElement);
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__submit').addEventListener('click', this._handleDeleteProof);
  };

  }
