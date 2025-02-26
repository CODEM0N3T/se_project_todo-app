import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const successMessage = document.querySelector(".success-message");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    //TODO - move code from existing submission handler to here
  },
});

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

// The logic in this function are all handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (item) => {
    // Generate todo item
    const todo = generateTodo(item);
    //add it to the todo list
    //refer to the foreach loop in the file
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

// call section instance's renderItems method
section.renderItems();

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    //find the currently opened modal
    const openModal = document.querySelector(".modal_is-opened");
    //and close it
  }
}

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
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
  addTodoPopup.close();
  // closeModal(addTodoPopupEl);
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
