
export class UserInfo {
    constructor({selectorName,selectorJob}){
        this._nameProfile=document.querySelector(selectorName)
        this._jobProfile=document.querySelector(selectorJob)
        this._buttonAvatar=document.querySelector('.profile__open-avatar')
    }

    getUserInfo(){
        return{name:this._nameProfile.textContent,job:this._jobProfile.textContent,_id: this._id,}
    }
    setUserInfo(item){
        this._item=item   
        this._nameProfile.textContent = item.name;
        this._jobProfile.textContent = item.about;
        this._myId=item._id
    }
    addAvatarUserInfo(res){
            this._buttonAvatar.style.backgroundImage = `url(${res.avatar})`;
            this._buttonAvatar.style.backgroundRepeat = "no-repeat"
    }
}