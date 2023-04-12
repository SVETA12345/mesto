export class Section {
    constructor({data,renderer},containerSelector){
        this._renderedItems=data;
        this._renderer=renderer;
        this._container=document.querySelector(containerSelector)
    }
    renderItems(cards,myId){
        cards.forEach((item)=>{
            const cardElement=this._renderer(item,myId);
            this.addItems(cardElement)
        })
    }
    setItem(element){
        this._container.prepend(element)
    }
    addItems(items) {
        this._container.append(items);
    
    } 
}