import { makeObservable, observable, action } from 'mobx';

class UserStore {
    currentUser = {
        id: '',
        name: '',
        email: '',
        // Add other fields as needed
    };

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            setCurrentUser: action
        });
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }
}

const userStore = new UserStore();
export default userStore;