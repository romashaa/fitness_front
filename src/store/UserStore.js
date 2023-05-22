import {makeAutoObservable} from 'mobx';

class UserStore {
    constructor() {
        this._isAuth=false;
        this._currentUser = null;
        makeAutoObservable(this);
    }
    setCurrentUser(user) {
        this._currentUser = user;
    }
    setIsAuth(bool){
        this._isAuth = bool;
    }
    get currentUser(){
        return this._currentUser;
    }
    get isAuth(){
        return this._isAuth;
    }
}
export default UserStore;