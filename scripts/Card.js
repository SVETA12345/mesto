import { openPopup } from "./Popup.js";
const popupPhoto = document.querySelector(".popup__photo");
const popupPhotoSubtitle = document.querySelector(".popup__subtitle");
const popupCardPhoto = document.querySelector(".popup_type_image");
export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._image = data.link;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__photo");
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._element.querySelector(".place__title").textContent = this._name;
    return this._element;
  }
  _handleOpenPopup() {
    popupPhoto.src = this._image;
    popupPhoto.alt = this._name;
    popupPhotoSubtitle.textContent = this._name;
    openPopup(popupCardPhoto);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
    });
    this._element
      .querySelector(".place__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("place__like_active");
      });
    this._element
      .querySelector(".place__close")
      .addEventListener("click", () => {
        this._element.remove();
      });
  }
}
