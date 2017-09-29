import { userController } from 'user-controller';
import { userControl } from 'user-controls';

class Router {
    start() {
        let sammy = Sammy(function () {
            this.get('#/', (sammy) => {
                sammy.redirect('#/home');
            });
            this.get('#/home', () => {
                $('#content').html('HOME');
            });

            // User routes
            this.get('#/sign-up', userController.loadSignUpPage);
            this.post('#/sign-up', userController.signUp);
            this.get('#/sign-in', userController.loadSignInPage);
            this.post('#/sign-in', userController.signIn);
            this.get('#/sign-out', userController.signOut);

            userControl.toggleUserControlElement();
        });

        $(function () {
            sammy.run('#/');
        });
    }
}

const router = new Router();

export { router };