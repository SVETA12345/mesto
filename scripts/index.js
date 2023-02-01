const popupBtnOpen=document.querySelector('.profile__edit');
const popup=document.querySelector('.popup_profile_name')
const popupsave=document.querySelector('.form__save')
const popupclose=document.querySelector('.popup__close')
let name=document.querySelector('.profile__name');
let job=document.querySelector('.profile__second-name');
let formElement=document.querySelector('.form');
let nameInput=document.querySelector('.form__name_theme_first')
let jobInput=document.querySelector('.form__name_theme_job');
const list=document.querySelector('.places')
const popupMesto=document.querySelector('.popup_mesto_name')
const mestoBtnOpen=document.querySelector('.profile__add')
const mestoclose=document.querySelector('.popup__close_theme_mesto')
const template=document.querySelector('.template');
let photoInput=document.querySelector('.form__name_mesto_title');
let srcInput=document.querySelector('.form__name_mesto_src');
let formCreate=document.querySelector('.form_create')
const items = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
popupBtnOpen.addEventListener('click',openPopup);
formElement.addEventListener('submit', handleFormSubmit);
popupclose.addEventListener('click',closePopup);

mestoBtnOpen.addEventListener('click', () =>{
    popupMesto.classList.add('popup_opened');
})
mestoclose.addEventListener('click', closePopupPhoto);
renderCard(items)
formCreate.addEventListener('submit',handleFormSubmitMesto);


function closePopupPhoto(){
    popupMesto.classList.remove('popup_opened');
}
function handleFormSubmitMesto (evt) {
    closePopupPhoto()
    evt.preventDefault();
    const card=CreateCard({link:srcInput.value, name:photoInput.value});
    list.prepend(card);
}

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
    nameInput.value=name.textContent;
    jobInput.value=job.textContent;
    popup.classList.add('popup_opened');
}
function closePopup(){
    popup.classList.remove('popup_opened');
}
function renderCard(items){
    const cards=items.map((item) => {
        return CreateCard(item)
    });
    console.log(cards)
    list.append(...cards)
    
}
function CreateCard(item){
    const card=template.content.cloneNode(true);
    const card_2=card.querySelector('.place')
    card.querySelector('.place__photo').src=item.link;
    card.querySelector('.place__title').textContent=item.name;
    card.querySelector('.place__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('place__like_active');
    })
    console.log(card)
    card.querySelector('.place__close').addEventListener('click',() => {
        card_2.remove();
    })
    card.querySelector('.place__photo').addEventListener('click',()=>{
        popupPhoto=document.querySelector('.popup__photo');
        popupPhoto.src=item.link
        popupCardPhoto=document.querySelector('.popup_card_photo')
        popupCardPhoto.classList.add('popup_opened')
        popupCardPhoto.querySelector('.popup__subtitle').textContent=item.name;
    }
    )
    return card
}
 