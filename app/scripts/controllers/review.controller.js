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
        const date = new Date();
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        uploadImg.uploadToApi($('#image')[0].files[0])
            .then((response) => {
                const formData = {
                    author: user.displayName,
                    authorUid: user.uid,
                    image: response.data.link,
                    category: $('#category').val(),
                    title: sammy.params.title,
                    content: sammy.params.content,
                    month: months[date.getMonth()],
                    day: date.getDate(),
                };

                reviewModel.create(formData);
                sammy.redirect('#/home');
            });
    }

    loadHomePage(sammy) { 
        const pageSize = 5;
        const page = 1;
        
        reviewModel.getAllReviews()
            .then((reviews) => {
                // will be moved to utils folder
                // let filteredReviews = [];
                // for(let i = (page - 1)*pageSize; i < page*pageSize; i++) {
                //  filteredReviews.push(reviews[Object.keys(reviews)[i]]);
                // }
                templateHandler.setTemplate('home.template', '#content', {reviews: reviews});
            }).catch((err) => {
                console.log(err);
            });
    }

    loadCategory(sammy) {
        reviewModel.getReviews({prop: 'category', value: sammy.params.category})
            .then((reviews) => {
                templateHandler.setTemplate('category.template', '#content', {reviews: reviews, category: sammy.params.category });
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
                review.author = review.author.toUpperCase();
                return review;
            })
            .then(() => {
                return commentModel.getComments({prop: 'review', value: review.authorUid + review.title});
            })
            .then((comments) => { 
                let commentsCount = 0;
                
                if(comments) {
                    commentsCount = Object.keys(comments).length;
                }

                templateHandler.setTemplate('review.template', '#content', { 
                    review: review,
                    comments: comments,
                    commentsCount: commentsCount,
                    isLoged: isLoged,
                    category: review.category.toLowerCase(),
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    createComment(sammy) {
        let user = reviewModel.getCurrentUser();
        const date = new Date();
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        const comment = {
            author: user.displayName,
            image: user.photoURL,
            content: $('#comment-box').val(),
            review: sammy.params.id,
            month: months[date.getMonth()],
            day: date.getDate(),
        };

        commentModel.create(comment);
        sammy.redirect('#/home/review/' + sammy.params.id);
    }
}

const reviewController = new ReviewController(reviewModel, commentModel, validator, uploadImg);

export { reviewController };