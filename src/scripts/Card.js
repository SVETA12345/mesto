export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._image = data.link;
    this._handleCardClick = handleCardClick;
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
  _toggleLike(evt) {
    evt.target.classList.toggle("place__like_active");
  }
  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
    this._element
      .querySelector(".place__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt)
      });
    this._element
      .querySelector(".place__close")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  }
}
