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

    resetPassword(email) {
        return this.auth.sendPasswordResetEmail(email);
    }

    createReview(data) {
        this.database.ref('reviews/' + data.authorUid + data.title).set(data).catch((err) => {
            console.log(err.message);
        });
    }

    getAllReviews() {
        return new Promise((resolve, reject) => {
            let reviews = this.database.ref('reviews/');
            reviews.once('value', data => {
                resolve(data.val());
            });
        });
    }

    getReviews(query) {
        return new Promise((resolve, reject) => {
            let reviews = this.database.ref('reviews/').orderByChild(query.prop).equalTo(query.value.toUpperCase());
            reviews.once('value', data => {
                resolve(data.val());
            });
        });
    }

    getReview(query) {
        return new Promise((resolve, reject) => {
            let reviews = this.database.ref('reviews/').child(query);
            reviews.once('value', data => {
                resolve(data.val());
            });
        });
    }

    createComment(data) {
        this.database.ref('comments/').push(data).catch((err) => {
            console.log(err.message);
        });
    }

    getComments(query) {
        return new Promise((resolve, reject) => {
            let comments = this.database.ref('comments/').orderByChild(query.prop).equalTo(query.value);
            comments.once('value', data => {
                resolve(data.val());
            });
        });
    }
}

const dataBase = new DataBase(firebaseModule);

export { dataBase };