import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const successMessage = document.querySelector(".success-message");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// The logic in this function are all handled in the Todo class.
// const generateTodo = (data) => {
//   const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
//   // const todoElement = todo.getView();

//   return todo.getView();
// };

const renderTodo = (item) => {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (item) => {
    // Generate todo item
    const todo = renderTodo(item);
    //add it to the todo list
    //refer to the foreach loop in the file
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

// call section instance's renderItems method
section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;

    if (!name || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = new Date(date);
    formattedDate.setMinutes(
      formattedDate.getMinutes() + formattedDate.getTimezoneOffset()
    );

    const id = uuidv4();
    const values = { name, date: formattedDate, id };

    const todo = renderTodo(values);
    section.addItem(todo);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    addTodoForm.reset();
    newTodoValidator.resetValidation();

    console.log("New todo added successfully:", values);
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

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
