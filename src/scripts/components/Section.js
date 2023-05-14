export default class Section {
  constructor( { renderer }, containerSelector) {
    this._visualize = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemToBottom(element) {
    this._container.append(element);
  }

  addItemToTop(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      const CardElement = this._visualize(item, userId);
      this.addItemToBottom(CardElement);
    })
  }
}
