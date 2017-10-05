import { dataBase } from 'database';

class CommentModel {
    constructor(database) {
        this.dataBase = database;
    }

    create(data) {
        this.dataBase.createComment(data);
    }

    getCurrentUser() {
        return this.dataBase.getCurrentUser();
    }

    getComments(query) {
        return this.dataBase.getComments(query);
    }
}

const commentModel = new CommentModel(dataBase);

export { commentModel };