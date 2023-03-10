export class FormValidator{
    constructor(formsConfig,formElement){
      this._formsConfig=formsConfig;
      this._formElement=formElement
    }
    _inputValid(inputElement){
      if (!inputElement.validity.valid){
        
        this._showInputError(inputElement, inputElement.validationMessage);
        this._showBtnError();
      }
      else {this._hideInputError(inputElement);
        this._hideBtnError()};
    }
    enableValidation(){
      this._setEventListeners()
      
    }
    _setEventListeners(){
      const inputList = Array.from(document.querySelectorAll(this._formsConfig.inputSelector));
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=> {
          this._inputValid(inputElement);
        });
     });
    }
    _showInputError(inputElement,errorMessage){
      const errorElement = document.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._formsConfig.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._formsConfig.errorClass);
    }
    _showBtnError(){
      const btnSaveElement=this._formElement.querySelector(this._formsConfig.submitButtonSelector)
      btnSaveElement.classList.add(this._formsConfig.inactiveButtonClass);
      btnSaveElement.setAttribute('disabled','disabled');
    }
    _hideBtnError(){
      const btnSaveElement=this._formElement.querySelector(this._formsConfig.submitButtonSelector)
      btnSaveElement.classList.remove(this._formsConfig.inactiveButtonClass);
      btnSaveElement.removeAttribute('disabled');
    }
    _hideInputError(inputElement){
      const errorElement = document.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._formsConfig.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._formsConfig.errorClass);
    }
    
  }
  