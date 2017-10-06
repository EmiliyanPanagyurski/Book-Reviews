import { dataBase } from 'database';
class UserModel {
    constructor(database) {
        this.dataBase = database;
    }

    signUp(formData) {
        return this.dataBase.createUser(formData);
    }

    signIn(formData) {
        return this.dataBase.signInWithEmail(formData);
    }

    signOut() {
        return this.dataBase.signOut();
    }
    
    getCurrentUser() {
        return this.dataBase.getCurrentUser();
    }
    isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            this.dataBase.onAuthStateChanged((user) => resolve(!!user));
        });
    }

    updateProfile(data) {
        return this.dataBase.updateUserProfile(data);
    }

    resetPassword(email) {
        return this.dataBase.resetPassword(email);
    }
}

const userModel = new UserModel(dataBase);

export { userModel };