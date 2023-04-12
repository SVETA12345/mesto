import "./index.css";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Popup } from "../components/Popup.js";
import { initialCards, formsConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {PopupWithDeleteCard} from '../components/PopupWithDeleteCard.js'

const buttonAvatar=document.getElementById("button_avatar")
const popupAvatar=document.querySelector('.popup_type_avatar')
const avatarBtnOpen=document.querySelector('.profile__open-avatar')
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
const cardPopupDelete= new PopupWithDeleteCard({btnYes:'.popup__button_theme_card', popupSelector:'.popup_type_close'});
const userProfile = new UserInfo({
  selectorName: ".profile__name",
  selectorJob: ".profile__second-name",
});
const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers:{ 
    authorization: '1c8d4f00-a15b-43e6-a0ec-40bf4915d387',
    'Content-Type': 'application/json'}
})
const apiAvatarDefult=api.getUserData()
apiAvatarDefult.then((res)=>{
userProfile.addAvatarUserInfo(res)
}
).catch((err)=>console.log(err))


function dataUser(item){
  api.sendDataProfile(item.name,item.about).then((data)=>{
    userProfile.setUserInfo(data)
    formProfile.closePopup()
  }
  ).catch((err)=>console.log(err))
}
const defaultCardList = new Section(
  {renderer},
  ".places"
);
function renderer(item,myId) {
  const cardElement=createCard(item,myId) 

  return cardElement 
}
Promise.all([api.getInitialCards(),api.getUserData()]).then((data) =>{
  const myId=data[1]._id
  defaultCardList.renderItems(data[0],myId)
  userProfile.setUserInfo(data[1])
  
  }).catch((err)=>console.log(err))



function rendererCardPopup(item) {
  const apiCard=api.createMestoCard(item.name,item.link)
  formMesto.setBtnText('Сохранение...')
  apiCard.then((data)=>{
    const cardElement = createCard(data,data.owner._id);
    defaultCardList.setItem(cardElement)
    formMesto.closePopup()
    //cardClose.addEventListener('click',()=>{cardPopupDelete.open(data,cardElement) })        
}).catch((err)=>console.log(err))
.finally(formMesto.setBtnText('Создать'))
}






function imageUser(item){
  console.log('item',item)
  formAvatar.setBtnText('Сохранение...')
  const apiUser=api.avatarProfile(item.link)
  console.log('apiuser',apiUser)
  apiUser.then((item)=>{
    formAvatar.addAvatarUserInfo(item)
    formAvatar.closePopup()
  }).catch((err)=>console.log(err))
  .finally(formAvatar.setBtnText('Сохранить'))
}
//console.log(data)

//defaultCardList.renderItems();


//const formClose= new PopupWithForm(".popup_type_close")

function openProfile(){
  const infoObject = userProfile.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.job;
  formProfile.openPopup();
  validProfile.resetValidation();
}

function openMesto(){
  validMesto.resetValidation();
  formMesto.openPopup();
}
function openAvatar(){
  validAvatar.resetValidation();
  formAvatar.openPopup()
}
const popupPhotoOpen = new PopupWithImage(".popup_type_image");

btnOpenEditProfile.addEventListener("click", ()=>{
  openProfile()
});



const createCard = (cardData,myId) => {
  const card = new Card({
    data: { ...cardData, currentUserId: myId},
    handleCardClick: () => {
      popupPhotoOpen.openPopup(cardData.name,cardData.link);
    },
    handleLikeClick: () => {
      api.changeLikeCardStatus(cardData._id, card.isMyLike())
        .then((data) => {
          card._data=data
          card.clickLike()
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
    },
    handleDeleteIconClick: () => {
      console.log('handleDeleteIconClick')
      cardPopupDelete.openPopup();
      cardPopupDelete.setSubmit(()=>{
        api.deleteCard(cardData._id).then(()=>{
          card.deleteCard()
          cardPopupDelete.closePopup()
        }).catch((err)=>console.log(err))
     })
      
    }
  },".template_my_card");
  return card.generateCard();
}
//closePopup(popupCardPhoto);

const formProfile = new PopupWithForm(".popup_type_profile",{
  handleFormSubmit: (item) => dataUser(item),
});
formProfile.setEventListeners();

const formMesto = new PopupWithForm(".popup_type_card",{
  handleFormSubmit: (item) => rendererCardPopup(item),
});
const formAvatar= new PopupWithForm(".popup_type_avatar",{
  handleFormSubmit: (item) => imageUser(item),
});
mestoBtnOpen.addEventListener("click", () => {
  openMesto()
});
avatarBtnOpen.addEventListener('click',()=>{
  openAvatar()
})
formMesto.setEventListeners()
validMesto.enableValidation();
formAvatar.setEventListeners()

validAvatar.enableValidation();
validProfile.enableValidation();

//appendCard(initialCards)

cardPopupDelete.setEventListeners()
popupPhotoOpen.setEventListeners();
