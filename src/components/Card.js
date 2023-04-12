import { PopupWithDeleteCard } from "./PopupWithDeleteCard.js";

export class Card {
  constructor({
    data,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
  }) {

    this._data = data;
    this._currentUserId = data.currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick=handleDeleteIconClick;
  }
  likeClick(action) {
    this._handleLikeClick = action;
  }
  _getTemplate() {
    this._templateSelector = ".template_my_card";
      
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".place__photo");
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector(".place__title").textContent = this._data.name;
    this._element.querySelector(".place__subtitle").textContent =
      this._data.likes.length;
      this._element.querySelector('.place__close')
      .classList.add(this._data.owner._id == this._currentUserId ? 'place__close' : 'place__close_hidden');
    this.renderLike(this._element);
    return this._element;
  }
  isMyLike() {
    let isMyLike = false;
    for (let i = 0; i < this._data.likes.length; i++) {
      if (this._data.likes[i]._id == this._currentUserId) {
        isMyLike = true;
        break;
      }
    }
    return isMyLike;
  }
  renderLike(cardElement) {
    this._element = cardElement;
    this.clickLike()
  }
  clickLike() {
    let isMyLike = this.isMyLike(this._data);
    if (isMyLike) {
      this._element
        .querySelector(".place__like")
        .classList.add("place__like_active");
    } else {
      this._element
        .querySelector(".place__like")
        .classList.remove("place__like_active");
    }
    this._element.querySelector(".place__subtitle").textContent =
      this._data.likes.length;
  }
  deleteCard(){
    this._element.remove()
  }
  _setEventListeners() {
    this._element
      .querySelector(".place__photo")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
    this._element
      .querySelector(".place__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
      if (this._data.owner._id == this._currentUserId){
        this._element.querySelector('.place__close').addEventListener('click',()=>{      
          this._handleDeleteIconClick()
        })
      }
    //return countLikes;
  }
}
