export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear = () => {
    this._container.innerHTML = '';
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
