export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach(item => {
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