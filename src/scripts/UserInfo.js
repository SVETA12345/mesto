import { Api } from "./Api";
export class UserInfo{
    constructor({selectorName,selectorJob}){

        this._nameProfile=document.querySelector(selectorName)
        this._jobProfile=document.querySelector(selectorJob)
    }
    getUserInfo(){
        return{name:this._nameProfile.textContent,job:this._jobProfile.textContent}
    }
    setUserInfo(item,api){
        console.log(api.sendDataProfile(item.name,item.job))
        api.sendDataProfile(item.name,item.job)
        this._nameProfile.textContent = item.name;
        this._jobProfile.textContent = item.job;
    }
}