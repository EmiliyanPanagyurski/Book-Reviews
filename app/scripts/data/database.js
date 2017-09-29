import { firebaseModule } from 'firebase-config';

class DataBase {

    constructor(config) {
        this.database = config.database;
        this.auth = config.auth;
    }

    createUser(data) {
        return this.auth.createUserWithEmailAndPassword(data.email, data.password);
    }

    signInWithEmail(data) {
        return this.auth.signInWithEmailAndPassword(data.email, data.password);
    }

    signOut() {
        return this.auth.signOut();
    }

    getCurrentUser() {
        return this.auth.currentUser;
    }

    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(function (user) {
            callback(user);
        });
    }

    updateUserProfile(data) {
        const user = this.getCurrentUser();
        return user.updateProfile(data);
    }
}

const dataBase = new DataBase(firebaseModule);

export { dataBase };