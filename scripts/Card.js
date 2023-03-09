export class Card {
    constructor (data, templateSelector){
      this._templateSelector = templateSelector;
      this._name=data.name
      this._image=data.link
    }
    _getTemplate(){
      const cardElement=document.querySelector(this._templateSelector).content.querySelector(".place").cloneNode(true);
      return cardElement
    }
    generateCard(){
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector(".place__photo").src=this._image;
      this._element.querySelector(".place__photo").alt=this._name;
      this._element.querySelector(".place__title").textContent=this._name;
      return this._element;
    }
    _handleOpenPopup(){
      popupPhoto.src = this._image;
      popupPhoto.alt = this._name;
      popupPhotoSubtitle.textContent =this._name;
      openPopup(popupCardPhoto)
    }
    _setEventListeners() {
      this._element.querySelector(".place__photo").addEventListener('click', () => {
        this._handleOpenPopup();
      });
      document.querySelector(".popup__close_card_photo").addEventListener("click", () => {
        closePopup(popupCardPhoto);
      });
      this._element.querySelector(".place__like").addEventListener("click",  (evt)=> {
        evt.target.classList.toggle("place__like_active");
      });
      this._element.querySelector(".place__close").addEventListener("click", () => {
        this._element.remove();
      });
    }
  }