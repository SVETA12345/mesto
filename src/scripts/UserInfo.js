
export class UserInfo{
    constructor({name,info}){
        this._name=document.querySelector(name);
        this._info=document.querySelector(info);
    }
    getUserInfo(){
        return{name:this._name.value, info: this._info.value}
    }
    setUserInfo(name,job){
        this._element=this.getUserInfo()
        const nameProfile=document.querySelector(name)
        const jobProfile=document.querySelector(job)
        nameProfile.textContent = this._element.name;
        jobProfile.textContent = this._element.info;
    }
}