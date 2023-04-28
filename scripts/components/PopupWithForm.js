import Popup from "./Popup.js";
import {
  cardForm
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitCallBack) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitCallBack = submitCallBack;

  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallBack(this._getInputValues());
      this.close()
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
