import { reviewModel } from 'review-model';
import { validator } from 'validator';
import { uploadImg } from 'img-upload';
import { htmlHandler } from 'html-handler';
import { templateHandler } from 'template-handler';

class ReviewController {
    constructor(reviewModel, validator, uploadImg, htmlHandler) {
        this.reviewModel = reviewModel;
        this.validator = validator;
        this.uploadImg = uploadImg;
    }

    loadCreateReviewPage(sammy) {
        reviewModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                htmlHandler.setHtml('create-review', '#content')
                    .then(() => {
                        validator.validateReview();
                    });

            } else {
                sammy.redirect('#/');
            }
        });
    }

    createReview(sammy) {
        const user = reviewModel.getCurrentUser();

        uploadImg.uploadToApi($('#image')[0].files[0])
            .then((response) => {

                const formData = {
                    author: user.displayName,
                    authorUid: user.uid,
                    image: response.data.link,
                    title: sammy.params.title,
                    content: sammy.params.content,
                };

                reviewModel.create(formData);
                sammy.redirect('#/home');
            });
    }

    loadHomePage(sammy) { 
        reviewModel.getAllReviews()
            .then((reviews) => {
                templateHandler.setTemplate('home.template', '#content', {reviews: reviews});
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        // prop is hardcoded for testing TODO: implement
        reviewModel.getReviews({prop: 'author', value: sammy.params.username})
            .then((reviews) => {
                templateHandler.setTemplate('category.template', '#content', {reviews: reviews});
            }).catch((err) => {
                console.log(err);
            });
    }

    loadReview(sammy) {
        reviewModel.getReview(sammy.params.id)
            .then((review) => {
                templateHandler.setTemplate('review.template', '#content', review);
            }).catch((err) => {
                console.log(err);
            });
    }
}

const reviewController = new ReviewController(reviewModel, validator, uploadImg);

export { reviewController };