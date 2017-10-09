import { dataBase } from 'database';

class ReviewModel {
    constructor(database) {
        this.dataBase = database;
    }

    create(data) {
        this.dataBase.createReview(data);
    }

    isUserLoggedIn() {
        return new Promise((resolve, reject) => {
            this.dataBase.onAuthStateChanged((user) => resolve(!!user));
        });
    }

    getCurrentUser() {
        return this.dataBase.getCurrentUser();
    }

    getAllReviews() {
        return this.dataBase.getAllReviews();
    }

    getReviews(query) {
        return this.dataBase.getReviews(query);
    }

    getReview(query) {
        return this.dataBase.getReview(query);
    }
}

const reviewModel = new ReviewModel(dataBase);

export { reviewModel };