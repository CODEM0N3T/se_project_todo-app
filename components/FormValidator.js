class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._formSelector = settings.formSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  }

  //TODO - implement all the other methods

  _checkInputValidity(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    const isValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
    this._submitButton.disabled = !isValid;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isValid);
  }

  _setEventListeners() {
    // this._inputList = Array.from(
    //   this._formEl.querySelectorAll(this._inputSelector)
    // );
    // //(2) TODO - finish implementing _setEventListeners

    // const buttonElement = this._formEl.querySelector(
    //   this._submitButtonSelector
    // );
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
      const errorElement = this._formEl.querySelector(
        `#${inputElement.id}-error`
      );
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    });
    this._toggleButtonState();
  }
}
export default FormValidator;
