import { reviewController } from 'review-controller';
import { userControl } from 'user-controls';
import { userController } from 'user-controller';

class Router {
    start() {
        let sammy = Sammy(function () {
            this.get('#/home', (sammy) => {
                sammy.redirect('#/home/?page=1&pageSize=5');
            });
            this.get('#/home/?', reviewController.loadHomePage);

            // Category routes
            this.get('#/home/category/?', reviewController.loadCategory);
            this.get('#/home/review/:id', reviewController.loadReview);

            // User routes
            this.get('#/sign-up', userController.loadSignUpPage);
            this.post('#/sign-up', userController.signUp);
            this.get('#/sign-in', userController.loadSignInPage);
            this.post('#/sign-in', userController.signIn);
            this.get('#/sign-out', userController.signOut);
            this.get('#/home/profile/change-avatar', userController.loadProfilePicture);
            this.post('#/home/profile/change-avatar', userController.changeAvatar);
            this.get('#/home/profile/password-reset', userController.loadProfilePassword);

            // Reviews routes
            this.get('#/create-review', reviewController.loadCreateReviewPage);
            this.post('#/create-review', reviewController.createReview);
            this.post('#/home/review/:id/create-comment', reviewController.createComment);

            userControl.toggleUserControlElement();
        });

        $(function () {
            sammy.run('#/home');
        });
    }
}

const router = new Router();

export { router };