import { Popup } from "./Popup.js";
import { Api } from "./Api.js";
export class PopupWithDeleteCard extends Popup {
  constructor({btnYes,popupSelector,apiDeleteMyCard}) {
    super(popupSelector);
    this._btnYes = document.querySelector(btnYes);
    this._apiDeleteMyCard=apiDeleteMyCard
    
  }
  _deleteCard(){
    this._cardElement.remove()
    this._apiDeleteMyCard(this._cardId)
    
    console.log('cardId',this._cardId)
    
  }
  
  
  _setEventListeners() {
      super.setEventListeners()
      this._btnYes.addEventListener("click", (evt) => {
        evt.preventDefault();
        this._deleteCard()
        super.closePopup()
      })
  }
  open(item,cardElement){
    super.openPopup()
    this._cardId=item._id
    this._cardElement=cardElement
    this._setEventListeners()
  }
}
