class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      //call the renderer, and pass it the item as an argument
      this._renderer(item);
    });
  }

  addItem(element) {
    if (!this._container) {
      console.error("Error: Container element not found.");
      return;
    }
    //Add element to the container
    this._container.append(element);
  }
}

export default Section;
