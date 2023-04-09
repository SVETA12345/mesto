

export class Card{
  constructor(data,apiLikeAdd,apiLikeDlete,handleCardClick) {
    this._apiLikeDlete=apiLikeDlete
    this._apiLikeAdd=apiLikeAdd
    this._data=data
    this._name = data.name;
    this._image = data.link;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    if (this._data.owner._id=='f497e1c825cc1aeec8db23f3'){
      this._templateSelector='.template_my_card'
    }
    else { this._templateSelector='.template_user'}
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
    this._element.querySelector(".place__subtitle").textContent=this._data.likes.length
    this.renderLike(this._element)
    return this._element;
  }
  _isMyLike(data){
    let isMyLike=false
    console.log(data.likes)
    for (let i=0; i<data.likes.length;i++){
      console.log(isMyLike)
      if (data.likes[i]._id=='f497e1c825cc1aeec8db23f3'){
        isMyLike=true
        break
      }
    }
    return isMyLike
  }
  renderLike(cardElement){
    let isMyLike=this._isMyLike(this._data)
    this._element=cardElement
    if (isMyLike){
      this._element.querySelector('.place__like').classList.add("place__like_active");}
    else{
      this._element.querySelector('.place__like').classList.remove("place__like_active");
      
    }
    
  }
  toggleLike() {
    let isMyLike=this._isMyLike(this._data)
    if (isMyLike){
    return this._apiLikeDlete(this._data._id)
    }
    else{return this._apiLikeAdd(this._data._id)}
  }
  clickLike(item,evt,cardElement,countLikes){
    this._countLikes=countLikes
    evt.target.classList.toggle("place__like_active")
    if (evt.target.className.split(' ').length==2){
      cardElement.querySelector('.place__subtitle').textContent=this._countLikes+1
      this._countLikes=this._countLikes+1
    }
    else{cardElement.querySelector('.place__subtitle').textContent=this._countLikes-1
    this._countLikes-=1
  }
  return this._countLikes
  }
 
  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
    
    
  }
}
