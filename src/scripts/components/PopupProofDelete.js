import Popup from "./Popup.js";

export default class PopupProofDelete extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._handleDeleteProof = this._handleDeleteProof.bind(this);
  }

  open(deleteProofHandler) {
    this._deleteProofHandler = deleteProofHandler;
    super.open();
  }

  setDeleteProofHandler(handler) {
    this._deleteProofHandler = handler;
  }

  _handleDeleteProof() {
    if (this._deleteProofHandler) {
      this._deleteProofHandler();
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__submit').addEventListener('click', this._handleDeleteProof);
  }
}

