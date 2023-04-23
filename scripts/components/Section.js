export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._visualize = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderer() {
    this._renderedItems.forEach(item => {
      this._visualize(item);
    })
  }
}
