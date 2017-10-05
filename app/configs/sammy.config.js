import { userController } from 'user-controller';
import { userControl } from 'user-controls';
import { reviewController } from 'review-controller';

class Router {
    start() {
        let sammy = Sammy(function () {
            this.get('#/', (sammy) => {
                sammy.redirect('#/home');
            });
            this.get('#/home', reviewController.loadHomePage);

            // Category routes
            this.get('#/home/category/?', reviewController.loadCategory);
            this.get('#/home/review/:id', reviewController.loadReview);

            // User routes
            this.get('#/sign-up', userController.loadSignUpPage);
            this.post('#/sign-up', userController.signUp);
            this.get('#/sign-in', userController.loadSignInPage);
            this.post('#/sign-in', userController.signIn);
            this.get('#/sign-out', userController.signOut);

            // Reviews routes
            this.get('#/create-review', reviewController.loadCreateReviewPage);
            this.post('#/create-review', reviewController.createReview);
            this.post('#/review/:id/create-comment', reviewController.createComment);

            userControl.toggleUserControlElement();
        });

        $(function () {
            sammy.run('#/');
        });
    }
}

const router = new Router();

export { router };