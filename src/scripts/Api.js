export class Api{
    constructor(config){
        this._url=config.url;
        this._headers=config.headers
    }
    getAllTasks(){
        return fetch(this._url, {
            method:"GET",
            headers:this._headers
        }).then((res)=>{
            if (res.ok){
                return res.json();
            }
        })
    }
    
    sendDataProfile(name,job){
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              about: job
            })
          }).then(res => res.json()); 
    }
    createMestoCard(name,link){
        return fetch(this._url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name: name,
              link: link
            })
          }).then(res => res.json())
          
    }
    deleteCard(){
        return fetch(this._url, {
            method:"DELETE",
            headers:this._headers
        }).then((res)=>{
            if (res.ok){
                return res.json();
            }
        })
    }
    likeAdd(){
        return fetch(this._url, {
            method:"PUT",
            headers:this._headers,

        }).then((res)=>{
            if (res.ok){
                return res.json();
            }
        })
    }
    likeDelete(){
        return fetch(this._url, {
            method:"DELETE",
            headers:this._headers
        }).then((res)=>{
            if (res.ok){
                return res.json();
            }
        })
    }
    avatarProfile(link){
        return fetch(this._url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar:link
            })
          }).then(res => res.json()); 
    }
}