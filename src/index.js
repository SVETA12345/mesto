import "./pages/index.css";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { Popup } from "./scripts/Popup.js";
import { initialCards, formsConfig } from "./utils/constants.js";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

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
const validMesto = new FormValidator(formsConfig, popupMesto);
const validProfile = new FormValidator(formsConfig, popupProfile);

function renderer(item) {
  const cardElement = createCard(item);
  defaultCardList.setItem(cardElement);
}

const defaultCardList = new Section(
  { data: initialCards, renderer },
  ".places"
);
defaultCardList.renderItems();

const userProfile = new UserInfo({
  selectorName: ".profile__name",
  selectorJob: ".profile__second-name",
});

const formProfile = new PopupWithForm(".popup_type_profile", {
  handleFormSubmit: (item) => userProfile.setUserInfo(item),
});

const formMesto = new PopupWithForm(".popup_type_card", {
  handleFormSubmit: (item) => renderer(item),
});

const popupPhotoOpen = new PopupWithImage(".popup_type_image");
function createCard(item) {
  const card = new Card(item, ".template", () => {
    //const popupPhotoOpen=new PopupWithImage('.popup_type_image',item.name,item.link)
    popupPhotoOpen.openPopup(item.name, item.link);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

btnOpenEditProfile.addEventListener("click", function () {
  const infoObject = userProfile.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.job;
  formProfile.openPopup();
  validProfile.resetValidation();
});

//popupProfile.addEventListener("submit", handleProfileFormSubmit);

//closePopup(popupCardPhoto);

validMesto.enableValidation();

validProfile.enableValidation();
mestoBtnOpen.addEventListener("click", () => {
  validMesto.resetValidation();
  formMesto.openPopup();
});
//appendCard(initialCards)
formProfile.setEventListeners();
formMesto.setEventListeners();

popupPhotoOpen.setEventListeners();
