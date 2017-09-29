import { userModel } from 'user-model';

class UserControl {
    constructor(userModel) {
        this.userModel = userModel;
    }

    toggleUserControlElement() {
        this.userModel.isUserLoggedIn()
            .then((user) => {
                if(user) {
                    $('.nav-link-user-control').addClass('hidden');
                    $('.nav-link-profile').removeClass('hidden');
                    $('#logout').removeClass('hidden');
                } else {
                    $('.nav-link-user-control').removeClass('hidden');
                    $('.nav-link-profile').addClass('hidden');
                    $('#logout').addClass('hidden');
                }
            }).catch((err) => {
                console.log(err.msg);
            });
    }
}

const userControl = new UserControl(userModel);

export { userControl };