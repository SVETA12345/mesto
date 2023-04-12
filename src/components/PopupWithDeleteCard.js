import { Popup } from "./Popup.js";
import { Api } from "./Api.js";
export class PopupWithDeleteCard extends Popup {
  constructor({btnYes,popupSelector,apiDeleteMyCard}) {
    super(popupSelector);
    this._btnYes = document.querySelector(btnYes);

  }
 
  setSubmit(action) {
    this._handleSubmitCallback = action;
  }
  setEventListeners(){
    console.log(' PopupWithDeleteCard.setEventListeners')
    this._btnYes.addEventListener('click',(evt)=>{
      console.log(2)
      evt.preventDefault();
      this._handleSubmitCallback()
    })
    super.setEventListeners()
  }
}
