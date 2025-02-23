import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const successMessage = document.querySelector(".success-message");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

const section = new Section({
  items: [initialTodos], //pass initial todos
  renderer: (item) => {
    // Generate todo item
    const todo = generateTodo(item);
    //add it to the todo list
    //refer to the foreach loop in the file
    section.addItem(todo);
  },
  containerSelector: ".todo__list",
});

// call section instance's renderItems method
section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
//   document.addEventListener("keydown", handleEscapeClose);
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscapeClose);
};

const handleEscapeClose = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopupEl);
  }
};

// The logic in this function are all handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  if (!name || !dateInput) {
    alert("Please fill out all fields.");
    return;
  }

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo); //use addItem method instead
  closeModal(addTodoPopupEl);
  // Resets the form fields after submission
  addTodoForm.reset();
  newTodoValidator.resetValidation();
  // Displays a success message
  console.log("New todo added successfully:", values);
});

// initialTodos.forEach((item) => {
// const todo = generateTodo(item);
// todosList.append(todo); //use addItem method instead

// Check if the initial todos contain all necessary properties
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
