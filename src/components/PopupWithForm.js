import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector,{ handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._popupSaveBtn=document.querySelector('.popup__button')
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }
  setBtnText(text){
    this._popupSaveBtn.textContent=text
  }
  close(){
    super.closePopup();
    this._popupForm.reset();
  }
  open(){
    super.openPopup()
    this._popupForm.reset();
  }
  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners()
  }
}
