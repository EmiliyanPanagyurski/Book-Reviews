import { userModel } from 'user-model';

class UserControl {
    constructor(userModel) {
        this.userModel = userModel;
    }

    toggleUserControlElement() {
        this.userModel.isUserLoggedIn()
            .then((isLoged) => {
                if(isLoged) {
                    $('.nav-item-user-control').addClass('hidden');
                    $('.nav-item-profile').removeClass('hidden');
                    $('.nav-item-user-logout').removeClass('hidden');
                } else {
                    $('.nav-item-user-control').removeClass('hidden');
                    $('.nav-item-profile').addClass('hidden');
                    $('.nav-item-user-logout').addClass('hidden');
                }
            }).catch((err) => {
                console.log(err.msg);
            });
    }
}

const userControl = new UserControl(userModel);

export { userControl };