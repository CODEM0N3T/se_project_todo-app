class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);

    if (!this._templateElement) {
      throw new Error(`Template with selector "${selector}" not found`);
    }
  }

  _setEventListeners() {
    //the delete button handaler
    const deleteButton = this._todoElement.querySelector(".todo__delete-btn");
    deleteButton.addEventListener("click", () => {
      this._todoElement.remove();
    });

    //changes completion from true to false, or vice versa
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(this._data.completed);
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    //implements dates
    todoDate.textContent = new Date(this._data.date).toLocaleString();

    if (this._data.date) {
      todoDate.textContent = new Date(this._data.date).toLocaleString();
    } else {
      todoDate.textContent = "No due date set";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
