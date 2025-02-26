class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    //the delete button handaler
    this._deleteBtnEl.addEventListener("click", () => {
      this._handleDelete(this._completed);
      this._remove();
    });
    this._checkboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });

    // const deleteButton = this._todoElement.querySelector(".todo__delete-btn");

    // deleteButton.addEventListener("click", () => {
    //   this._todoElement.remove();
    // });

    //changes completion from true to false, or vice versa
    // this._todoCheckboxEl.addEventListener("change", () => {
    //   this._data.completed = !this._data.completed;
    //   console.log(this._data.completed);
    // });
  }

  _getTemplate() {
    const template = document.querySelector(this._selector);
    if (!template) {
      throw new Error(`Template ${this._selector} not found`);
    }
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _generateNameEl() {
    this._nameEl = this._element.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDateEl() {
    this._dateEl = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckboxEl() {
    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._checkboxLabel = this._element.querySelector(".todo__label");
    this._checkboxEl.checked = this._completed;
    this._checkboxEl.id = `todo-${this._id}`;
    this._checkboxLabel.setAttribute("for", `todo-${this._id}`);
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _remove = () => {
    this._element.remove();

    //Advise to assign null yo the element. It helps garbage collector.
    this._element = null;
  };

  getView() {
    // this._todoElement = this._getTemplate();

    // const todoNameEl = this._todoElement.querySelector(".todo__name");
    // const todoDate = this._todoElement.querySelector(".todo__date");

    // todoNameEl.textContent = this._name;

    //implements dates
    // todoDate.textContent = new Date(this._date).toLocaleString();

    // if (this._date) {
    //   todoDate.textContent = new Date(this._date).toLocaleString();
    // } else {
    //   todoDate.textContent = "No due date set";
    // }
    this._element = this._getTemplate();
    this._deleteBtnEl = this._element.querySelector(".todo__delete-btn");
    this._generateNameEl();
    this._generateDateEl();
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._element;
  }
}

export default Todo;
