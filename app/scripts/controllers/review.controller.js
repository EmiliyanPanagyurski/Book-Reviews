import { reviewModel } from 'review-model';
import { commentModel } from 'comment-model';
import { validator } from 'validator';
import { uploadImg } from 'img-upload';
import { htmlHandler } from 'html-handler';
import { templateHandler } from 'template-handler';
import { userControl } from 'user-controls';

class ReviewController {
    constructor(reviewModel, commentModel, validator, uploadImg, htmlHandler) {
        this.reviewModel = reviewModel;
        this.commentModel = commentModel;
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
                    category: $('#category').val(),
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
        reviewModel.getReviews({prop: 'category', value: sammy.params.category})
            .then((reviews) => {
                templateHandler.setTemplate('category.template', '#content', {reviews: reviews});
            }).catch((err) => {
                console.log(err);
            });
    }

    loadReview(sammy) {
        let review;
        let isLoged;

        reviewModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                isLoged = true;
            } else {
                isLoged = false;
            }

            return isLoged;
        });

        reviewModel.getReview(sammy.params.id)
            .then((foundReview) => {
                review = foundReview;
                return review;
            })
            .then(() => {
                return commentModel.getComments({prop: 'review', value: review.authorUid + review.title});
            })
            .then((comments) => {       
                templateHandler.setTemplate('review.template', '#content', { review: review, comments: comments, isLoged: isLoged});
            }).catch((err) => {
                console.log(err);
            });
    }

    createComment(sammy) {
        let user = reviewModel.getCurrentUser();

        const comment = {
            author: user.displayName,
            image: user.photoURL,
            content: sammy.params.comment,
            review: sammy.params.id,
        };

        commentModel.create(comment);
        sammy.redirect('#/home/review/' + sammy.params.id);
    }
}

const reviewController = new ReviewController(reviewModel, commentModel, validator, uploadImg);

export { reviewController };