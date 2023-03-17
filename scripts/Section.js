class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }
    renderItems() {
        this._items.forEach( item => {
            const element = renderer(item);
            this.addItem(element);
        });
    }
    addItem(element) {
        document.querySelector(this._containerSelector).append(element);
    }
}