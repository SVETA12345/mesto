export class Popup{
  constructor(popupSelector){
    this._popupSelector=document.querySelector(popupSelector)
  }
  openPopup(){
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener('keydown',(evt)=> {this._handleEscClose(evt)});
  }
  closePopup(){
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener('keydown', (evt)=>{this._handleEscClose(evt)});
  }
  _handleEscClose(evt){
    if (evt.key === 'Escape') {  
      this.closePopup()
  }
  }

  setEventListeners(){
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup()
      }
  })
  }
}
