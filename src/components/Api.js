export class Api{
    constructor(config){
        this._url=config.url;
        this._headers=config.headers
    }
    _getResponseData(res) {
        if (!res.ok) {
            return console.log(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
    getInitialCards(){
        return fetch(`${this._url}cards`, {
            method:"GET",
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    getUserData(){
        return fetch(`${this._url}users/me`, {
            method:"GET",
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })       
    }
    sendDataProfile(name,job){
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: job
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    createMestoCard(name,link){
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
          
    }
    deleteCard(cardId){
        return fetch(`${this._url}cards/${cardId}`, {
            method:"DELETE",
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })}
    changeLikeCardStatus(cardId,isMyLike){
        if (isMyLike){
            return this._likeDelete(cardId)
        }
        else {
            return this._likeAdd(cardId)
        }
    }
    _likeAdd(cardId){
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method:"PUT",
            headers:this._headers,

        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    _likeDelete(cardId){
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method:"DELETE",
            headers:this._headers
        }).then((res)=>{
            return this._getResponseData(res)
        })
    }
    avatarProfile(link){

        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar:link
            })
          }).then((res)=>{
            return this._getResponseData(res)
        })
    }
}