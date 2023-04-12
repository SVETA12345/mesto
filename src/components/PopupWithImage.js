import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector)
        this._popupPhoto= document.querySelector(".popup__photo");
        this._popupPhotoSubtitle= document.querySelector(".popup__subtitle");
      }
      openPopup(name,link){
        this._popupPhoto.src = link;
        this._popupPhoto.alt = name;
        this._popupPhotoSubtitle.textContent = name;
        super.openPopup()
      }
    
}