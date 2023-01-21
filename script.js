const popupBtnOpen=document.querySelector('.profile__edit');
const popup=document.querySelector('.popup')
const popupsave=document.querySelector('.popup__save')
const popupclose=document.querySelector('.popup__close')


let formElement=document.querySelector('.form')
let nameInput=document.querySelector('.popup__name')
let jobInput=document.querySelector('.popup__second-name');
popupBtnOpen.addEventListener('click',openPopup);
popupsave.addEventListener('click', handleFormSubmit);
popupsave.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
popupclose.addEventListener('click',closePopup);
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
 
     // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
    // Выберите элементы, куда должны быть вставлены значения полей
    let name=document.querySelector('.profile__name');
    let job=document.querySelector('.profile__second-name');
  // Вставьте новые значения с помощью textContent
    name.textContent=nameInput.value
    job.textContent=jobInput.value
  
}

function openPopup(){

    popup.classList.add('popup_opened');
}
function closePopup(){
    popup.classList.remove('popup_opened');
}
 