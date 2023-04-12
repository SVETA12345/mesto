export class FormValidator {
  constructor(formsConfig, formElement) {
    this._formsConfig = formsConfig;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._formsConfig.inputSelector)
    );
    this._btnSaveElement = this._formElement.querySelector(
      this._formsConfig.submitButtonSelector
    );
  }
  _inputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      this._disableButton();
    } else {
      this._hideInputError(inputElement);
    }
  }
  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputValid(inputElement);
        const formIsValid = this._inputList.every(
          ({ validity }) => validity.valid
        );
        if (formIsValid) {
          this._enableButton();
        }
      });
    });
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formsConfig.errorClass);
  }
  _disableButton() {
    this._btnSaveElement.classList.add(this._formsConfig.inactiveButtonClass);
    this._btnSaveElement.setAttribute("disabled", "disabled");
  }
  _enableButton() {
    this._btnSaveElement.classList.remove(
      this._formsConfig.inactiveButtonClass
    );
    this._btnSaveElement.removeAttribute("disabled");
  }
  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formsConfig.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._formsConfig.errorClass);
  }
  resetValidation() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
