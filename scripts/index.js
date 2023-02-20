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
const popupPhoto = document.querySelector(".popup__photo");


function handleProfileFormSubmit(evt) {
  name.textContent=nameInput.value
  job.textContent=jobInput.value
  closePopup(popupProfile);
}
function closePopupEsc(evt) {
  console.log(evt.key)
  if (evt.key === 'Escape') {
    
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupOverlay(evt,modal){
    if (evt.target===evt.currentTarget){
    closePopup(modal)};
}

function openPopup(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(modal) {
  document.removeEventListener('keydown', closePopupEsc);
  modal.classList.remove("popup_opened");
}
function handleFormSubmitMesto(evt) { 
  const card = createCard({ link: srcInput.value, name: photoInput.value });
  cardsContainer.prepend(card);
  evt.target.reset();
  closePopup(popupMesto);
}

function renderCards(cardDataList) {
  const cards = cardDataList.map((item) => {
    return createCard(item);
  });
  cardsContainer.append(...cards);
}
function createCard(cardData) {
  const card = cardTemplate.content.querySelector(".place").cloneNode(true);
  const cardPhoto = card.querySelector(".place__photo");
  const cardTitle= card.querySelector(".place__title");
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  card.querySelector(".place__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__like_active");
  });
  card.querySelector(".place__close").addEventListener("click", () => {
    card.remove();
  });
  cardPhoto.addEventListener("click", () => {
    popupPhoto.src = cardData.link;
    popupPhoto.alt = cardData.name;
    openPopup(popupCardPhoto);
    popupCardPhoto.querySelector(".popup__subtitle").textContent =
      cardData.name;
  });
  return card;
}

enableValidation(formsConfig);  


popupCardClose.addEventListener("click", () => {
  closePopup(popupCardPhoto);
});
btnOpenEditProfile.addEventListener("click", function () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
});

closeProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});
mestoBtnOpen.addEventListener("click", () => {
  if (srcInput.value==='' && photoInput.value===''){
    showBtnError(popupMesto,formsConfig)
  }
  openPopup(popupMesto);
});
mestoClose.addEventListener("click", function () {
  closePopup(popupMesto);
});
renderCards(initialCards);
formCreate.addEventListener("submit", handleFormSubmitMesto);
popupProfile.addEventListener("submit", handleProfileFormSubmit);
popupProfile.addEventListener('click', function(evt){
  closePopupOverlay(evt,popupProfile)
});
popupMesto.addEventListener('click', function(evt){
  closePopupOverlay(evt,popupMesto)
});

popupCardPhoto.addEventListener('click', function(evt){
  closePopupOverlay(evt,popupCardPhoto)
});
