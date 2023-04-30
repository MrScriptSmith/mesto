import Popup from './Popup.js';
import {
  pictImagePopup,
  titleImagePopup
} from '../utils/constants.js';


export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImage = this._popup.querySelector(pictImagePopup);
    this._popupTitle = this._popup.querySelector(titleImagePopup);
  }

  open({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
