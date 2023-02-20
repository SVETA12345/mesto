const setEventListeners = (formElement,formsConfig) => {
    const inputList = Array.from(document.querySelectorAll(formsConfig.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        inputValid(formElement, inputElement,formsConfig);
      });
   });
  };

function enableValidation(formsConfig) {
    const allForm=Array.from(document.querySelectorAll(formsConfig.formSelector));
    allForm.forEach((formElement)=>{
      formElement.addEventListener('submit',function(evt){
        evt.preventDefault();
      })
      setEventListeners(formElement,formsConfig);
    }) 
  }

  function showInputError(formElement, inputElement, errorMessage,formsConfig){
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formsConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formsConfig.errorClass);
  };

  function showBtnError(formElement,formsConfig){
    const btnSaveElement=formElement.querySelector(formsConfig.submitButtonSelector)
    btnSaveElement.classList.add(formsConfig.inactiveButtonClass);
    btnSaveElement.setAttribute('disabled','disabled');
  }

  function hideBtnError(formElement,formsConfig){
    const btnSaveElement=formElement.querySelector(formsConfig.submitButtonSelector)
    btnSaveElement.classList.remove(formsConfig.inactiveButtonClass);
    btnSaveElement.removeAttribute('disabled');
  }
  
  function hideInputError(inputElement,formsConfig){
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formsConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(formsConfig.errorClass);
  }
  
  function inputValid(formElement, inputElement,formsConfig){
    if (!inputElement.validity.valid){
      showInputError(formElement, inputElement, inputElement.validationMessage,formsConfig);
      showBtnError(formElement,formsConfig);
    }
    else {hideInputError(inputElement,formsConfig);
      hideBtnError(formElement,formsConfig)};
  }
