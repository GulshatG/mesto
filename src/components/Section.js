export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container =  document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element, isBeginning) {
    if (isBeginning) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
