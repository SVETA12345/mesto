import { Popup } from "./Popup.js";
const popupPhoto = document.querySelector(".popup__photo");
const popupPhotoSubtitle = document.querySelector(".popup__subtitle");
export class PopupWithImage extends Popup {
    constructor(popupSelector,name,link){
        super(popupSelector)
        this._name = name;
        this._image = link;
      }
      openPopup(){
        popupPhoto.src = this._image;
        popupPhoto.alt = this._name;
        popupPhotoSubtitle.textContent = this._name;
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener('keydown',(evt)=> {this._handleEscClose(evt)});
      }
    
}