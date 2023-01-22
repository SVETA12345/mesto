const popupBtnOpen=document.querySelector('.profile__edit');
const popup=document.querySelector('.popup')
const popupsave=document.querySelector('.popup__save')
const popupclose=document.querySelector('.popup__close')
let name=document.querySelector('.profile__name');
let job=document.querySelector('.profile__second-name');


let formElement=document.querySelector('.form')

let nameInput=document.querySelector('.popup__name_first')
let jobInput=document.querySelector('.popup__name_job');
popupBtnOpen.addEventListener('click',openPopup);
popupsave.addEventListener('click', handleFormSubmit);
formElement.addEventListener('submit', handleFormSubmit);
popupclose.addEventListener('click',closePopup);
function handleFormSubmit (evt) {
    closePopup()
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
 
     // Получите значение полей jobInput и nameInput из свойства value                                               // О том, как это делать, расскажем позже.
    // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
    name.textContent=nameInput.value
    job.textContent=jobInput.value
  
}

function openPopup(){
    nameInput.value=name.innerText;
    jobInput.value=job.innerText;
    popup.classList.add('popup_opened');
}
function closePopup(){
    popup.classList.remove('popup_opened');
}
 