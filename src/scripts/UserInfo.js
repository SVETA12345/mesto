
export class UserInfo{
    constructor({name,info}){
        this._name=document.querySelector(name);
        this._info=document.querySelector(info);
        this._nameProfile=document.querySelector('.profile__name')
        this._jobProfile=document.querySelector('.profile__second-name')
    }
    getUserInfo(){
        return{name:this._nameProfile.textContent,job:this._jobProfile.textContent}
    }
    setUserInfo(){
        this._element={nameProf:this._name, jobProf:this._info}
        console.log(this._element)
        
        this._nameProfile.textContent = this._element.nameProf.value;
        this._jobProfile.textContent = this._element.jobProf.value;
    }
}