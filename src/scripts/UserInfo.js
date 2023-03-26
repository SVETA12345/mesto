
export class UserInfo{
    constructor({selectorName,selectorJob}){

        this._nameProfile=document.querySelector(selectorName)
        this._jobProfile=document.querySelector(selectorJob)
    }
    getUserInfo(){
        return{name:this._nameProfile.textContent,job:this._jobProfile.textContent}
    }
    setUserInfo(item){
        
        this._nameProfile.textContent = item.name;
        this._jobProfile.textContent = item.job;
    }
}