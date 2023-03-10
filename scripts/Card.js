export class Card {
    constructor (data, templateSelector){
      this._templateSelector = templateSelector;
      this._name=data.name
      this._image=data.link
      this._popupPhoto=document.querySelector(".popup__photo")
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
        this._popupPhoto.src = this._image;
        this._popupPhoto.alt = this._name;
        document.querySelector(".popup__subtitle").textContent =this._name;
        document.querySelector(".popup_type_image").classList.add("popup_opened");
    }
    _handleClosePopup(){
        document.querySelector(".popup_type_image").classList.remove("popup_opened");
    }
    _setEventListeners() {
      this._element.querySelector(".place__photo").addEventListener('click', () => {
        this._handleOpenPopup();
      });
      document.querySelector(".popup__close_card_photo").addEventListener("click", () => {
        this._handleClosePopup();
      });
      this._element.querySelector(".place__like").addEventListener("click",  (evt)=> {
        evt.target.classList.toggle("place__like_active");
      });
      this._element.querySelector(".place__close").addEventListener("click", () => {
        this._element.remove();
      });
      document.removeEventListener('keydown', (evt)=>{
        if (evt.key === 'Escape') {       
            this._popup = document.querySelector('.popup_opened');
            this._popup.classList.remove("popup_opened");
          }
        });
    }
  }