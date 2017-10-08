import { userModel } from 'user-model';
import { uploadImg } from 'img-upload';
import { htmlHandler } from 'html-handler';
import { templateHandler } from 'template-handler';
import { userControl } from 'user-controls';
import { validator } from 'validator';

class UserController {
    constructor(userModel, uploadImg, htmlHandler, userControl) {
        this.utils = uploadImg;
        this.userModel = userModel;
        this.htmlHandler = htmlHandler;
        this.userControl = userControl;
    }

    loadSignUpPage(sammy) {
        // to prevent unauthorized entry check for loged in user if not redirect 
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                htmlHandler.setHtml('sign-up', '#content')
                    .then(() => {
                        validator.validateSignUp();
                    });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    loadSignInPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                htmlHandler.setHtml('sign-in', '#content')
                    .then(()=> {
                        validator.validateSignIn();
                    });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    loadProfilePicture(sammy) {
        let user = userModel.getCurrentUser();

        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                templateHandler.setTemplate('profile.avatar.template', '#content', { image: user.photoURL })
                    .then(()=> {
                        // TODO VALIDATIONS
                    });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    loadProfilePassword(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                htmlHandler.setHtml('profile-password', '#content')
                    .then(()=> {
                        $('#password-reset').click(function() {
                            let user = userModel.getCurrentUser();
                            userModel.resetPassword(user.email);
                        });
                    });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    signUp(sammy) {
        const formData = {
            email: sammy.params.email,
            password: sammy.params.password,
        };
        let imgUrl = '';

        userModel
            .signUp(formData)
            .then(() => {
                console.log('user created');
                userControl.toggleUserControlElement();

                uploadImg.uploadToApi($('#avatar')[0].files[0])
                    .then((response) => {
                        imgUrl = response.data.link;

                        userModel.updateProfile({
                            displayName: sammy.params.username,
                            photoURL: imgUrl,
                        }).then(() =>{
                            sammy.redirect('#/home');
                        }).catch((err) => {
                            console.log(err.msg);
                        });
                    });
            })
            .catch(error => {
                console.log(error.message);
                $('.label.label-danger').text(error.message);
            });
    }

    signIn(sammy) {
        const formData = {
            email: sammy.params.email,
            password: sammy.params.password,
        };

        userModel
            .signIn(formData)
            .then(() => {
                console.log('user signed in');
                userControl.toggleUserControlElement();
                sammy.redirect('#/home');
            })
            .catch(error => {
                console.log(error.message);
                const msg = 'Invalid username or password!';
                $('.label.label-danger').text('Invalid username or password!');
            });
    }

    signOut(sammy) {
        userModel
            .signOut()
            .then(() => {
                console.log('you are now loged off');
                userControl.toggleUserControlElement();
                sammy.redirect('#/home');
            }).catch((err) => {
                console.log(err);
            });
    }

    changeAvatar(sammy) {
        let user = userModel.getCurrentUser();
        let imgUrl;

        uploadImg.uploadToApi($('#avatar')[0].files[0])
        .then((response) => {
            imgUrl = response.data.link;
            userModel.updateProfile({
                displayName: user.displayName,
                photoURL: imgUrl,
            }).then(() =>{
                sammy.redirect('#/home/profile/change-avatar');
            }).catch((err) => {
                console.log(err.message);
            });
        });
    }

    resetPassword(email) {
        userModel.resetPassword(email)
            .then(() => {
                console.log('password reset');
            }).catch((err) => {
                console.log(err.message);
            });
    }
}

const userController = new UserController(userModel, uploadImg, htmlHandler, userControl);

export { userController };