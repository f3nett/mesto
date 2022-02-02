class Section {
    constructor ({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

    }

    clearItem() {
    //очистить секцию от всех элементов
        this._items = [];
    }

    addItem(element) {
    //добавить элемент в секцию
        this._items.push(element);
        this._container.prepend(element);
    }

    renderItem() {
    //отрисовать все элементы секции
        this._items.forEach((item) => {
            this._renderer(item);
          });
    }
}

export default Section;
