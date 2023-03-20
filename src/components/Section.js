export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element, isBeginning) {
    if (isBeginning) {
      document.querySelector(this._containerSelector).prepend(element);
    } else {
      document.querySelector(this._containerSelector).append(element);
    }
  }
}
