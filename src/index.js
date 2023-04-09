import "./pages/index.css";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { Popup } from "./scripts/Popup.js";
import { initialCards, formsConfig } from "./utils/constants.js";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { Api } from "./scripts/Api.js";
import {PopupWithDeleteCard} from './scripts/PopupWithDeleteCard.js'

const buttonAvatar=document.getElementById("button_avatar")
const popupAvatar=document.querySelector('.popup_type_avatar')
const avatarBtnOpen=document.querySelector('.avatar__open')
const btnYes=document.querySelector('.popup__close_theme_card')
const cardClose=document.querySelector('.place__close')
const popupMesto = document.querySelector(".popup_type_card");
const popupProfile = document.querySelector(".popup_type_profile");
const btnOpenEditProfile = document.querySelector(".profile__edit");
const closeProfile = document.querySelector(".popup__close");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__second-name");
const formElementProfile = document.querySelector(".form_profile_name");
const nameInput = document.querySelector(".form__name_theme_first");
const jobInput = document.querySelector(".form__name_theme_job");
const cardsContainer = document.querySelector(".places");
const mestoBtnOpen = document.querySelector(".profile__add");
const validAvatar= new FormValidator(formsConfig, popupAvatar);
const validMesto = new FormValidator(formsConfig, popupMesto);
const validProfile = new FormValidator(formsConfig, popupProfile);
const closePopup= new Popup(".popup_type_close");
const cardPopupDelete= new PopupWithDeleteCard({btnYes:'.popup__button_theme_card', popupSelector:'.popup_type_close',apiDeleteMyCard});
const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-63/cards',
  headers:{ 
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'}
})
const apiProfile=new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-63/users/me',
  headers: {
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'
  },
})

const apiAvatar=new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-63/users/me/avatar',
  headers: {
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'
  }
})


function apiDeleteMyCard(cardId){
  const apiDeleteCard= new Api({
    url:`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardId}`,
  headers:{ 
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'}
})
  apiDeleteCard.deleteCard()
}

function apiLikeAdd(cardId){
  const apiLikeAdd= new Api({
    url:`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardId}/likes`,
  headers:{ 
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'}
})
  return apiLikeAdd.likeAdd()
}
function apiLikeDlete(cardId){
  const apiLikeDelete= new Api({
    url:`https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardId}/likes`,
  headers:{ 
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'}
})
  return apiLikeDelete.likeDelete()
}

const tasks=api.getAllTasks()
const getProfile=apiProfile.getAllTasks()
getProfile.then((data)=>{
  name.textContent=data.name;
  job.textContent=data.about
})
tasks.then((data) =>{
  function renderer(item) {  
    if (item.owner._id=='f497e1c825cc1aeec8db23f3'){
      const [cardElement,cardClose] = createCardMy(item);
      cardClose.addEventListener('click',()=>{cardPopupDelete.open(item,cardElement) })
      defaultCardList.setItem(cardElement);
    }
    else{
      const cardElement = createCardUser(item);
      defaultCardList.setItem(cardElement);
    }
    
  }
  const defaultCardList = new Section(
    { data:data, renderer },
    ".places"
  );
  defaultCardList.renderItems()
  
  }).catch((err)=>console.log(err))



function rendererCardPopup(item) {
  const apiCard=api.createMestoCard(item.name,item.link)
  formMesto.setBtnText('Сохранение...')
  apiCard.then((data)=>{
    const [cardElement,cardClose] = createCardMy(data);
    cardsContainer.prepend(cardElement)
    cardClose.addEventListener('click',()=>{cardPopupDelete.open(data,cardElement) })        
}).catch((err)=>console.log(err))
.finally(formMesto.setBtnText('Создать'))
}

const apiAvatarDefult=apiProfile.getAllTasks()
apiAvatarDefult.then((res)=>{
  buttonAvatar.style.backgroundImage = `url(${res.avatar})`;
    buttonAvatar.style.backgroundRepeat = "no-repeat"
}
)
function imageUser(item){
  formAvatar.setBtnText('Сохранение...')
  const apiUser=apiAvatar.avatarProfile(item.link)
  console.log(apiUser)
  apiUser.then((item)=>{
    buttonAvatar.style.backgroundImage = `url(${item.avatar})`;
    buttonAvatar.style.backgroundRepeat = "no-repeat"
  }).catch((err)=>console.log(err))
  .finally(formAvatar.setBtnText('Сохранить'))
}
//console.log(data)

//defaultCardList.renderItems();

const userProfile = new UserInfo({
  selectorName: ".profile__name",
  selectorJob: ".profile__second-name",
});
//const formClose= new PopupWithForm(".popup_type_close")

const formProfile = new PopupWithForm(".popup_type_profile",{
  handleFormSubmit: (item) => userProfile.setUserInfo(item,apiProfile),
});



const popupPhotoOpen = new PopupWithImage(".popup_type_image");
function createCardUser(item) {
  const card = new Card(item,  apiLikeAdd, apiLikeDlete, () => {
    //const popupPhotoOpen=new PopupWithImage('.popup_type_image',item.name,item.link)
    popupPhotoOpen.openPopup(item.name, item.link);
  });
  const cardElement = card.generateCard();
  let countLikes=item.likes.length
  cardElement.querySelector('.place__like').addEventListener('click',(evt)=>{
    const apiLike=card.toggleLike()
      apiLike.then((res)=>{
      countLikes=card.clickLike(res,evt,cardElement,countLikes)
    })
    
  }
  ) 
  //const linkClose=card.linkClose()
  //console.log(linkClose) 
  return cardElement;
}

function createCardMy(item) {
  const card = new Card(item,  apiLikeAdd, apiLikeDlete, () => {
    //const popupPhotoOpen=new PopupWithImage('.popup_type_image',item.name,item.link)
    popupPhotoOpen.openPopup(item.name, item.link);
  });
  
  const cardElement=card.generateCard()
  let countLikes=item.likes.length
  cardElement.querySelector('.place__like').addEventListener('click',(evt)=>{
    const apiLike=card.toggleLike()
      apiLike.then((res)=>{
      countLikes=card.clickLike(res,evt,cardElement,countLikes)
    })
    
  }
  )      
        
  const cardClose=cardElement.querySelector('.place__close')
  
  
  return [cardElement,cardClose];
}
btnOpenEditProfile.addEventListener("click", function () {
  const infoObject = userProfile.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.job;
  formProfile.openPopup();
  validProfile.resetValidation();
});


//closePopup(popupCardPhoto);



const formMesto = new PopupWithForm(".popup_type_card",{
  handleFormSubmit: (item) => rendererCardPopup(item),
});
const formAvatar= new PopupWithForm(".popup_type_avatar",{
  handleFormSubmit: (item) => imageUser(item),
});
mestoBtnOpen.addEventListener("click", () => {
  validMesto.resetValidation();
  formMesto.openPopup();
});
avatarBtnOpen.addEventListener('click',()=>{
  validAvatar.resetValidation();
  formAvatar.openPopup()
})
formMesto.setEventListeners()
validMesto.enableValidation();
formAvatar.setEventListeners()

validAvatar.enableValidation();
validProfile.enableValidation();

//appendCard(initialCards)
formProfile.setEventListeners();


popupPhotoOpen.setEventListeners();
