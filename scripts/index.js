import { openPopup, closePopup } from "./Popup.js";
import { initialCards, formsConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const btnOpenEditProfile = document.querySelector(".profile__edit");
const popupProfile = document.querySelector(".popup_type_profile");
const closeProfile = document.querySelector(".popup__close");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__second-name");
const formElementProfile = document.querySelector(".form_profile_name");
const nameInput = document.querySelector(".form__name_theme_first");
const jobInput = document.querySelector(".form__name_theme_job");
const cardsContainer = document.querySelector(".places");
const popupMesto = document.querySelector(".popup_type_card");
const mestoBtnOpen = document.querySelector(".profile__add");
const mestoClose = document.querySelector(".popup__close_theme_mesto");
const cardTemplate = document.querySelector(".template");
const photoInput = document.querySelector(".form__name_mesto_title");
const srcInput = document.querySelector(".form__name_mesto_src");
const formCreate = document.querySelector(".form_create");
const popupCardPhoto = document.querySelector(".popup_type_image");
const popupCardClose = document.querySelector(".popup__close_card_photo");
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

function handleProfileFormSubmit(evt) {
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}



function handleFormSubmitMesto(evt) {
  const cardElement = createCard({
    link: srcInput.value,
    name: photoInput.value,
  });

  // Добавляем в DOM
  cardsContainer.prepend(cardElement);

  closePopup(popupMesto);
  evt.target.reset();
}

function initialStatePopup(formElement) {
  const valid = new FormValidator(formsConfig, formElement);
  valid.resetValidation();
}

function createCard(item) {
  const card = new Card(item, ".template");
  const cardElement = card.generateCard();
  return cardElement;
}

btnOpenEditProfile.addEventListener("click", function () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
  initialStatePopup(popupProfile);
});


formCreate.addEventListener("submit", handleFormSubmitMesto);
popupProfile.addEventListener("submit", handleProfileFormSubmit);


closePopup(popupCardPhoto);

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  // Добавляем в DOM
  cardsContainer.append(cardElement);
});

const allForm = Array.from(document.querySelectorAll(formsConfig.formSelector));

popupMesto.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
const validMesto = new FormValidator(formsConfig, popupMesto);
validMesto.enableValidation();
popupProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
});
const validProfile = new FormValidator(formsConfig, popupProfile);
validProfile.enableValidation();
mestoBtnOpen.addEventListener("click", () => {
  openPopup(popupMesto);
  initialStatePopup(popupMesto);
});
