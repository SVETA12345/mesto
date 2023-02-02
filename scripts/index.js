const btnOpenEditProfile=document.querySelector('.profile__edit');
const popupProfile=document.querySelector('.popup_type_profile');
const popupcloseProfile=document.querySelector('.popup__close')
const name=document.querySelector('.profile__name');
const job=document.querySelector('.profile__second-name');
let formElementProfile=document.querySelector('.form_profile_name');
let nameInput=document.querySelector('.form__name_theme_first')
let jobInput=document.querySelector('.form__name_theme_job');
const cardsContainer=document.querySelector('.places')
const popupMesto=document.querySelector('.popup_type_card')
const mestoBtnOpen=document.querySelector('.profile__add')
const mestoClose=document.querySelector('.popup__close_theme_mesto')
const cardTemplate=document.querySelector('.template');
let photoInput=document.querySelector('.form__name_mesto_title');
let srcInput=document.querySelector('.form__name_mesto_src');
let formCreate=document.querySelector('.form_create')
const popupCardPhoto=document.querySelector('.popup_type_image');
const popupCardClose=document.querySelector('.popup__close_card_photo');
const initialCards = [
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

function handleProfileFormSubmit (evt) {
  closePopup(popupProfile)
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  name.textContent=nameInput.value
  job.textContent=jobInput.value

}


function openPopup(modal){
modal.classList.add('popup_opened');
}

function closePopup(modal){
modal.classList.remove('popup_opened');
}
function handleFormSubmitMesto (evt) {
    closePopup(popupMesto)
    evt.preventDefault();
    const card=createCard({link:srcInput.value, name:photoInput.value});
    cardsContainer.prepend(card);
    evt.target.reset();
}


function renderCards(cardDataList){
    const cards=cardDataList.map((item) => {
        return createCard(item)
    });
    cardsContainer.append(...cards)
    
}
function createCard(cardData){
    const card=cardTemplate.content.cloneNode(true).querySelector('.place');
    const cardPhoto=card.querySelector('.place__photo')
    cardPhoto.src=cardData.link;
    cardPhoto.alt=cardData.name;
    card.querySelector('.place__title').textContent=cardData.name;
    card.querySelector('.place__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('place__like_active');
    })
    card.querySelector('.place__close').addEventListener('click',() => {
        card.remove();
    })
    const popupPhoto=document.querySelector('.popup__photo');
    cardPhoto.addEventListener('click',()=>{
        popupPhoto.src=cardData.link;
        popupPhoto.alt=cardData.name;      
        popupCardPhoto.classList.add('popup_opened')
        popupCardPhoto.querySelector('.popup__subtitle').textContent=cardData.name;
    }
    )
    return card
}


popupCardClose.addEventListener('click',()=>{
  closePopup(popupCardPhoto)  
})
btnOpenEditProfile.addEventListener('click',function(){
  nameInput.value=name.textContent;
  jobInput.value=job.textContent;
  openPopup(popupProfile)
});
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
popupcloseProfile.addEventListener('click',function(){
  closePopup(popupProfile)
});
mestoBtnOpen.addEventListener('click', () =>{
  openPopup(popupMesto)
})
mestoClose.addEventListener('click', function(){
  closePopup(popupMesto)
});
renderCards(initialCards)
formCreate.addEventListener('submit',handleFormSubmitMesto);

